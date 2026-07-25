import { useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Search } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';
import type { PrototypeMeta } from '@/types';

interface SidebarTreeProps {
  prototypes: PrototypeMeta[];
  query: string;
}

interface TreeNode {
  label: string;
  children: Map<string, TreeNode>;
  items: PrototypeMeta[];
}

function buildTree(prototypes: PrototypeMeta[]): {
  devices: Map<string, TreeNode>;
} {
  const devices = new Map<string, TreeNode>();
  for (const proto of prototypes) {
    const deviceKey = proto.device;
    let device = devices.get(deviceKey);
    if (!device) {
      device = { label: deviceKey, children: new Map(), items: [] };
      devices.set(deviceKey, device);
    }
    device.items.push(proto);

    const segments = proto.category.split('/').map((s) => s.trim()).filter(Boolean);
    let current = device;
    const pathSegments: string[] = [];
    for (const seg of segments) {
      pathSegments.push(seg);
      let next = current.children.get(seg);
      if (!next) {
        next = { label: seg, children: new Map(), items: [] };
        current.children.set(seg, next);
      }
      next.items.push(proto);
      current = next;
    }
  }
  return { devices };
}

const DEVICE_LABEL: Record<string, string> = {
  mobile: 'Mobile',
  desktop: 'Desktop',
  tablet: 'Tablet',
};

const DEVICE_ICON: Record<string, React.ReactNode> = {
  mobile: (
    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden>
      <rect x="4.5" y="1.5" width="7" height="13" rx="1.4" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="8" cy="12.4" r="0.6" fill="currentColor" />
    </svg>
  ),
  desktop: (
    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden>
      <rect x="1.5" y="2.5" width="13" height="9" rx="1.2" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <path d="M6 13.5h4M8 11.4v2.1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  ),
  tablet: (
    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden>
      <rect x="2.5" y="1.5" width="11" height="13" rx="1.6" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="8" cy="12.8" r="0.6" fill="currentColor" />
    </svg>
  ),
};

interface NodeProps {
  node: TreeNode;
  depth: number;
  query: string;
  activeId?: string;
}

function TreeNodeView({ node, depth, query, activeId }: NodeProps) {
  const [open, setOpen] = useState(depth < 2);
  const hasChildren = node.children.size > 0;
  const filteredItems = useMemo(() => filterItems(node.items, query), [node.items, query]);
  const filteredChildren = useMemo(() => {
    if (!hasChildren) return [];
    return Array.from(node.children.values())
      .map((child) => ({
        child,
        items: filterItems(child.items, query),
      }))
      .filter((c) => c.items.length > 0);
  }, [node.children, query, hasChildren]);

  if (filteredItems.length === 0 && filteredChildren.length === 0) return null;

  return (
    <div className="space-y-0.5">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          'flex w-full items-center gap-1.5 rounded-md px-2 py-1.5 text-left text-[12.5px] font-medium tracking-tight text-foreground/85 transition hover:bg-sidebar-accent/60',
          depth === 0 && 'text-foreground'
        )}
        style={{ paddingLeft: `${8 + depth * 12}px` }}
      >
        <ChevronDown
          className={cn(
            'h-3 w-3 shrink-0 text-muted-foreground transition-transform',
            !open && '-rotate-90'
          )}
        />
        <span className="truncate">{node.label}</span>
        <Badge variant="muted" className="ml-auto font-mono">
          {filteredItems.length}
        </Badge>
      </button>
      {open && (
        <div className="space-y-0.5">
          {filteredChildren.map(({ child }) => (
            <TreeNodeView
              key={child.label}
              node={child}
              depth={depth + 1}
              query={query}
              activeId={activeId}
            />
          ))}
          {filteredItems
            .filter((p) => !hasChildren || !matchesCategoryPath(p, Array.from(node.children.keys())))
            .map((p) => (
              <Link
                key={p.id}
                to={`/prototype/${p.id}`}
                className={cn(
                  'flex items-center gap-2 rounded-md px-2 py-1.5 text-[12px] text-muted-foreground transition hover:bg-sidebar-accent/60 hover:text-foreground',
                  activeId === p.id && 'bg-sidebar-accent text-foreground'
                )}
                style={{ paddingLeft: `${24 + depth * 12}px` }}
              >
                <span className="truncate">{p.title}</span>
              </Link>
            ))}
        </div>
      )}
    </div>
  );
}

function matchesCategoryPath(proto: PrototypeMeta, childrenKeys: string[]): boolean {
  return proto.category
    .split('/')
    .map((s) => s.trim())
    .some((seg) => childrenKeys.includes(seg));
}

function filterItems(items: PrototypeMeta[], query: string): PrototypeMeta[] {
  if (!query) return items;
  const q = query.toLowerCase();
  return items.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q))
  );
}

export function SidebarTree({ prototypes, query }: SidebarTreeProps) {
  const { devices } = useMemo(() => buildTree(prototypes), [prototypes]);
  const location = useLocation();
  const activeId = location.pathname.startsWith('/prototype/')
    ? decodeURIComponent(location.pathname.replace('/prototype/', ''))
    : undefined;

  const deviceOrder = ['mobile', 'desktop', 'tablet'];

  if (prototypes.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 px-3 py-8 text-center text-xs text-muted-foreground">
        <Search className="h-4 w-4" />
        <p>No prototypes registered yet.</p>
        <p className="font-mono text-[10px]">src/prototypes/</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 py-2">
      {deviceOrder
        .filter((d) => devices.has(d))
        .map((key) => {
          const node = devices.get(key)!;
          const filteredItems = filterItems(node.items, query);
          if (filteredItems.length === 0) return null;
          return (
            <div key={key}>
              <div className="mb-1 flex items-center gap-2 px-2 text-[10.5px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                <span className="text-muted-foreground/70">{DEVICE_ICON[key]}</span>
                {DEVICE_LABEL[key] ?? key}
                <span className="ml-1 rounded-full bg-secondary px-1.5 py-0.5 text-[9.5px] font-mono">
                  {filteredItems.length}
                </span>
              </div>
              <div className="space-y-0.5">
                <TreeNodeView node={node} depth={1} query={query} activeId={activeId} />
              </div>
            </div>
          );
        })}
    </div>
  );
}
