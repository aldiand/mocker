import { useMemo } from 'react';
import { Filter } from 'lucide-react';
import { useUIStore } from '@/theme/useThemeStore';
import { PrototypeCard } from '@/components/gallery/PrototypeCard';
import { prototypes } from '@/registry';
import { cn } from '@/lib/utils';
import type { PrototypeMeta, DeviceKind } from '@/types';

const DEVICE_FILTERS: Array<{ id: DeviceKind; label: string }> = [
  { id: 'mobile', label: 'Mobile' },
  { id: 'tablet', label: 'Tablet' },
  { id: 'desktop', label: 'Desktop' },
];

export function GalleryPage() {
  const query = useUIStore((s) => s.query);
  const setQuery = useUIStore((s) => s.setQuery);
  const filter = useUIStore((s) => s.deviceFilter);
  const setDeviceFilter = useUIStore((s) => s.setDeviceFilter);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return prototypes
      .filter((p: PrototypeMeta) => p.device === filter)
      .filter((p: PrototypeMeta) => {
        if (!q) return true;
        return (
          p.title.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
        );
      })
      .slice()
      .sort((a, b) => (a.order || 0) - (b.order || 0) || a.title.localeCompare(b.title));
  }, [query, filter]);

  return (
    <div className="h-full overflow-y-auto">
      <div className="mx-auto max-w-[1400px] px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="animate-fade-in">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
              <Filter className="h-3 w-3" /> {prototypes.length} prototypes
            </div>
            <h1 className="text-display mt-4 text-[36px] font-semibold leading-[1.05] tracking-tight md:text-[44px]">
              A static library of
              <br className="hidden sm:block" />{' '}
              <span className="bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
                complete UI screens.
              </span>
            </h1>
            <p className="mt-3 max-w-xl text-sm text-muted-foreground md:text-[15px]">
              Browse designs like a Figma Community board. Every prototype is a single, static
              React component — no logic, no APIs. Just pixels.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 rounded-xl border border-border bg-card p-1.5 shadow-soft animate-fade-in">
            {DEVICE_FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setDeviceFilter(f.id)}
                className={cn(
                  'h-8 rounded-lg px-3 text-xs font-medium transition-all',
                  filter === f.id
                    ? 'bg-foreground text-background shadow-soft'
                    : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                )}
              >
                {f.label}
                <span
                  className={cn(
                    'ml-1.5 inline-flex h-4 min-w-4 items-center justify-center rounded-full px-1 font-mono text-[9.5px]',
                    filter === f.id ? 'bg-background/15 text-background' : 'bg-secondary text-muted-foreground'
                  )}
                >
                  {prototypes.filter((p) => p.device === f.id).length}
                </span>
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <EmptyState query={query} clear={() => setQuery('')} />
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {filtered.map((p, i) => (
              <PrototypeCard key={p.id} prototype={p} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function EmptyState({ query, clear }: { query: string; clear: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card/40 py-20 text-center">
      <div className="grid h-12 w-12 place-items-center rounded-2xl border border-border bg-background text-muted-foreground shadow-soft">
        <Filter className="h-5 w-5" />
      </div>
      <h3 className="text-display mt-4 text-[18px] font-semibold tracking-tight">
        Nothing matches your search
      </h3>
      <p className="mt-1 max-w-xs text-sm text-muted-foreground">
        {query
          ? `No prototypes contain "${query}". Try another keyword or clear the filter.`
          : 'No prototypes match this device filter.'}
      </p>
      {query && (
        <button
          type="button"
          onClick={clear}
          className="mt-5 rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium transition hover:bg-secondary"
        >
          Clear search
        </button>
      )}
    </div>
  );
}
