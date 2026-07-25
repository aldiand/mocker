import chokidar from 'chokidar';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const PROTOTYPES_DIR = path.join(ROOT, 'src', 'prototypes');
const OUTPUT_FILE = path.join(ROOT, 'src', 'generated', 'prototypes.json');

type DeviceKind = 'mobile' | 'desktop' | 'tablet';

interface PrototypeMeta {
  id: string;
  title: string;
  category: string;
  device: DeviceKind;
  path: string;
  component: string;
  tags: string[];
  order: number;
}

interface FrontMatter {
  title?: string;
  tags?: string[];
  device?: DeviceKind | string;
  order?: number;
  category?: string;
}

const DEVICE_ALIASES: Record<string, DeviceKind> = {
  mobile: 'mobile',
  phone: 'mobile',
  iphone: 'mobile',
  android: 'mobile',
  tablet: 'tablet',
  ipad: 'tablet',
  desktop: 'desktop',
  web: 'desktop',
  monitor: 'desktop',
};

function inferDeviceFromFolder(folder: string): DeviceKind {
  const f = folder.toLowerCase();
  if (f.includes('mobile') || f.includes('phone') || f.includes('iphone') || f.includes('android')) {
    return 'mobile';
  }
  if (f.includes('tablet') || f.includes('ipad')) return 'tablet';
  return 'desktop';
}

function titleFromFilename(filename: string): string {
  const base = filename.replace(/\.(tsx|ts)$/i, '');
  return base
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function capitalize(value: string): string {
  if (!value) return value;
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function categoryFromFolders(folders: string[]): string {
  if (folders.length === 0) return 'Uncategorized';
  return folders.map((f) => capitalize(f)).join(' / ');
}

function parseFrontMatter(source: string): FrontMatter {
  const result: FrontMatter = {};
  const blockRegex = /\/\*\*([\s\S]*?)\*\//m;
  const match = source.match(blockRegex);
  if (!match) return result;

  const body = match[1];
  const lines = body
    .split('\n')
    .map((l) => l.replace(/^\s*\*\s?/, '').trim())
    .filter((l) => l.length > 0 && l.includes(':'));

  for (const line of lines) {
    const idx = line.indexOf(':');
    if (idx < 0) continue;
    const key = line.slice(0, idx).trim().toLowerCase();
    const rawValue = line.slice(idx + 1).trim();
    if (!key || !rawValue) continue;

    if (key === 'tags') {
      result.tags = rawValue
        .split(',')
        .map((t) => t.trim().toLowerCase())
        .filter(Boolean);
      continue;
    }
    if (key === 'order') {
      const parsed = Number.parseInt(rawValue, 10);
      if (!Number.isNaN(parsed)) result.order = parsed;
      continue;
    }
    if (key === 'title') {
      result.title = rawValue;
      continue;
    }
    if (key === 'device') {
      result.device = rawValue.toLowerCase() as DeviceKind;
      continue;
    }
    if (key === 'category') {
      result.category = rawValue;
      continue;
    }
  }
  return result;
}

function resolveDevice(value: FrontMatter['device'] | undefined, fallback: DeviceKind): DeviceKind {
  if (!value) return fallback;
  const key = String(value).toLowerCase();
  return DEVICE_ALIASES[key] ?? fallback;
}

function buildIdFromPath(relativePath: string): string {
  return relativePath
    .replace(/\.(tsx|ts)$/i, '')
    .replace(/^\/+|\/+$/g, '')
    .split('/')
    .map((segment) => segment
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      .replace(/[\s_]+/g, '-')
      .toLowerCase())
    .join('-');
}

async function readPrototype(absFile: string): Promise<PrototypeMeta | null> {
  try {
    const source = await fs.readFile(absFile, 'utf-8');
    const fm = parseFrontMatter(source);
    const rel = path.relative(PROTOTYPES_DIR, absFile).replace(/\\/g, '/');
    const segments = rel.split('/');
    const filename = segments.pop()!;
    const folders = segments;
    const deviceFromFile = inferDeviceFromFolder(folders[0] ?? 'desktop');
    const device = resolveDevice(fm.device, deviceFromFile);
    const id = buildIdFromPath(rel);
    const finalCategory = fm.category ?? (folders.length ? categoryFromFolders(folders) : 'Uncategorized');
    return {
      id,
      title: fm.title ?? titleFromFilename(filename),
      category: finalCategory,
      device,
      path: '/' + rel.replace(/\.(tsx|ts)$/i, '').toLowerCase(),
      component: `src/prototypes/${rel}`,
      tags: fm.tags ?? [],
      order: typeof fm.order === 'number' ? fm.order : 0,
    };
  } catch (err) {
    console.error(`[watcher] failed to read ${absFile}:`, err);
    return null;
  }
}

async function walk(dir: string, found: string[] = []): Promise<string[]> {
  let entries;
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch {
    return found;
  }
  for (const entry of entries) {
    const abs = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(abs, found);
    } else if (/\.(tsx|ts)$/i.test(entry.name) && !entry.name.startsWith('_')) {
      found.push(abs);
    }
  }
  return found;
}

async function regenerate() {
  const files = await walk(PROTOTYPES_DIR);
  const items: PrototypeMeta[] = [];
  for (const file of files) {
    const meta = await readPrototype(file);
    if (meta) items.push(meta);
  }
  items.sort((a, b) => {
    const da = DEVICE_ORDER.indexOf(a.device);
    const db = DEVICE_ORDER.indexOf(b.device);
    if (da !== db) return da - db;
    if (a.order !== b.order) return a.order - b.order;
    return a.title.localeCompare(b.title);
  });
  await fs.mkdir(path.dirname(OUTPUT_FILE), { recursive: true });
  await fs.writeFile(OUTPUT_FILE, JSON.stringify(items, null, 2) + '\n', 'utf-8');
  console.log(`[watcher] regenerated ${items.length} prototype${items.length === 1 ? '' : 's'}`);
}

const DEVICE_ORDER: DeviceKind[] = ['mobile', 'tablet', 'desktop'];

export {
  parseFrontMatter,
  inferDeviceFromFolder,
  resolveDevice,
  buildIdFromPath,
  titleFromFilename,
  categoryFromFolders,
  regenerate,
};

async function run() {
  const isOnce = process.argv.includes('--once');
  console.log('[watcher] scanning src/prototypes/**/*.tsx');
  await regenerate();
  if (isOnce) {
    return;
  }
  const watcher = chokidar.watch(PROTOTYPES_DIR, {
    ignored: /(^|[\\])\../,
    persistent: true,
    ignoreInitial: true,
  });
  const trigger = debounce(() => {
    regenerate().catch((err) => console.error('[watcher] regenerate error', err));
  }, 120);
  watcher.on('add', trigger);
  watcher.on('change', trigger);
  watcher.on('unlink', trigger);
  watcher.on('addDir', trigger);
  watcher.on('unlinkDir', trigger);
  watcher.on('ready', () => console.log('[watcher] watching prototypes directory'));
}

function debounce<T extends (...args: unknown[]) => void>(fn: T, ms: number) {
  let t: ReturnType<typeof setTimeout> | null = null;
  return (...args: Parameters<T>) => {
    if (t) clearTimeout(t);
    t = setTimeout(() => fn(...args), ms);
  };
}

if (process.argv[1] && process.argv[1].endsWith('watcher.ts')) {
  run().catch((err) => {
    console.error('[watcher] fatal error:', err);
    process.exit(1);
  });
}

