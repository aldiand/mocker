import { promises as fs } from 'node:fs';
import path from 'node:path';
import readline from 'node:readline';
import { fileURLToPath } from 'node:url';
import { regenerate } from './watcher';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const PROTOTYPES_DIR = path.join(ROOT, 'src', 'prototypes');

type DeviceKind = 'mobile' | 'desktop' | 'tablet';

function ask(rl: readline.Interface, question: string, defaultValue: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(`${question} (default: "${defaultValue}"): `, (answer) => {
      resolve(answer.trim() || defaultValue);
    });
  });
}

function parseArgs(): Record<string, string> {
  const args: Record<string, string> = {};
  for (const arg of process.argv.slice(2)) {
    if (arg.startsWith('--')) {
      const idx = arg.indexOf('=');
      if (idx > 0) {
        const key = arg.slice(2, idx);
        const val = arg.slice(idx + 1);
        args[key] = val;
      }
    }
  }
  return args;
}

function camelCaseName(str: string): string {
  return str
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
    .replace(/^[a-z]/, (c) => c.toUpperCase())
    .replace(/[^a-zA-Z0-9]/g, '');
}

function sanitizeFolder(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9/_-]+/g, '-')
    .replace(/\/+/g, '/');
}

async function createPrototype() {
  const cliArgs = parseArgs();

  let title = cliArgs.title || cliArgs.name;
  let device = (cliArgs.device as DeviceKind) || 'desktop';
  let category = cliArgs.category || 'general';
  let tags = cliArgs.tags || 'prototype, ui';
  let orderStr = cliArgs.order || '1';

  if (!title) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    console.log('\n🎨 Mocker — New Prototype Scaffold Utility\n');
    title = await ask(rl, 'Prototype Title', 'New Application Screen');
    device = (await ask(rl, 'Device Frame (mobile, tablet, desktop)', 'desktop')).toLowerCase() as DeviceKind;
    category = await ask(rl, 'Category (e.g. Auth, Dashboard, CRM/Leads)', 'General');
    tags = await ask(rl, 'Tags (comma-separated)', 'ui, prototype');
    orderStr = await ask(rl, 'Display Order Number', '1');
    rl.close();
  }

  if (!['mobile', 'tablet', 'desktop'].includes(device)) {
    device = 'desktop';
  }

  const componentName = camelCaseName(title) || 'CustomScreen';
  const categoryFolder = sanitizeFolder(category);
  const targetDir = path.join(PROTOTYPES_DIR, device, categoryFolder);
  const targetFile = path.join(targetDir, `${componentName}.tsx`);

  const fileContent = `/**
 * title: ${title}
 * category: ${category}
 * device: ${device}
 * tags: ${tags}
 * order: ${orderStr}
 */

export default function ${componentName}() {
  return (
    <div className="flex h-full w-full flex-col bg-background p-6 text-foreground">
      <header className="mb-6 flex items-center justify-between border-b border-border pb-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight">${title}</h1>
          <p className="text-sm text-muted-foreground">Scaffolded prototype component</p>
        </div>
        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
          ${device}
        </span>
      </header>

      <main className="flex-1 rounded-xl border border-dashed border-border p-8 text-center grid place-items-center">
        <div className="max-w-md">
          <p className="text-sm text-muted-foreground">
            Edit <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground">${path.relative(ROOT, targetFile)}</code> to customize this design.
          </p>
        </div>
      </main>
    </div>
  );
}
`;

  await fs.mkdir(targetDir, { recursive: true });
  await fs.writeFile(targetFile, fileContent, 'utf-8');

  console.log(`\n✅ Prototype created successfully at: ${path.relative(ROOT, targetFile)}`);
  console.log('🔄 Regenerating prototypes registry...');
  await regenerate();
  console.log('✨ Done!\n');
}

createPrototype().catch((err) => {
  console.error('❌ Failed to create prototype:', err);
  process.exit(1);
});
