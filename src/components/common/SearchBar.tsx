import { Search, X } from 'lucide-react';
import { useUIStore } from '@/theme/useThemeStore';
import { cn } from '@/lib/utils';

export function SearchBar({ className }: { className?: string }) {
  const query = useUIStore((s) => s.query);
  const setQuery = useUIStore((s) => s.setQuery);
  return (
    <div
      className={cn(
        'group relative flex h-9 w-full items-center gap-2 rounded-lg border border-border bg-background/60 px-3 transition-colors focus-within:border-ring/40 focus-within:bg-background focus-within:shadow-glow',
        className
      )}
    >
      <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
      <input
        type="search"
        placeholder="Search by title, category, or tag…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="h-full w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
      />
      {query && (
        <button
          type="button"
          onClick={() => setQuery('')}
          aria-label="Clear search"
          className="grid h-5 w-5 place-items-center rounded-md text-muted-foreground transition hover:bg-secondary hover:text-foreground"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}
      <kbd className="hidden h-5 select-none items-center gap-0.5 rounded border border-border bg-secondary/60 px-1.5 font-mono text-[10px] font-medium text-muted-foreground md:inline-flex">
        ⌘K
      </kbd>
    </div>
  );
}
