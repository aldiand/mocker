import { useNavigate } from 'react-router-dom';
import { ArrowUpRight, Smartphone, Monitor, Tablet } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { CoverThumbnail } from './CoverThumbnail';
import type { PrototypeMeta } from '@/types';
import { cn } from '@/lib/utils';

interface PrototypeCardProps {
  prototype: PrototypeMeta;
  index?: number;
}

const DEVICE_ICON = {
  mobile: Smartphone,
  desktop: Monitor,
  tablet: Tablet,
} as const;

export function PrototypeCard({ prototype, index = 0 }: PrototypeCardProps) {
  const Icon = DEVICE_ICON[prototype.device];
  const navigate = useNavigate();
  return (
    <article
      role="link"
      tabIndex={0}
      onClick={() => navigate(`/prototype/${prototype.id}`)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          navigate(`/prototype/${prototype.id}`);
        }
      }}
      className="group relative flex animate-fade-in cursor-pointer flex-col overflow-hidden rounded-xl border border-border/60 bg-card text-card-foreground shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-border hover:shadow-[0_1px_2px_rgba(15,17,21,0.04),0_24px_48px_-24px_rgba(15,17,21,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
      style={{ animationDelay: `${Math.min(index * 24, 320)}ms` }}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        <CoverThumbnail prototype={prototype} />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-card/80 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
        <div className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full border border-border/40 bg-background/80 px-2 py-1 text-[10.5px] font-medium backdrop-blur">
          <Icon className="h-3 w-3" />
          <span className="capitalize">{prototype.device}</span>
        </div>
      </div>
      <div className="flex flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate text-display text-[15px] font-semibold tracking-tight">
              {prototype.title}
            </h3>
            <p className="mt-0.5 truncate text-xs text-muted-foreground">{prototype.category}</p>
          </div>
          <div className="grid h-7 w-7 shrink-0 place-items-center rounded-md border border-border/60 bg-background text-muted-foreground transition-colors group-hover:border-foreground/30 group-hover:text-foreground">
            <ArrowUpRight className="h-3.5 w-3.5" />
          </div>
        </div>
        {prototype.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {prototype.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="font-mono text-[10px]">
                #{tag}
              </Badge>
            ))}
            {prototype.tags.length > 3 && (
              <Badge variant="muted" className="font-mono text-[10px]">
                +{prototype.tags.length - 3}
              </Badge>
            )}
          </div>
        )}
        <div className={cn('mt-1 h-0.5 w-8 rounded-full bg-foreground/0 transition-all duration-300 group-hover:w-12 group-hover:bg-primary/60')} />
      </div>
    </article>
  );
}
