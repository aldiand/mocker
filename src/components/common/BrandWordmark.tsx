import { cn } from '@/lib/utils';

export function BrandWordmark({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className="grid h-8 w-8 place-items-center rounded-lg bg-foreground text-background shadow-soft">
        <svg width="18" height="18" viewBox="0 0 32 32" fill="none" aria-hidden>
          <rect x="3" y="3" width="11" height="11" rx="3" fill="currentColor" />
          <rect x="18" y="3" width="11" height="11" rx="3" fill="currentColor" opacity="0.45" />
          <rect x="3" y="18" width="11" height="11" rx="3" fill="currentColor" opacity="0.3" />
          <rect x="18" y="18" width="11" height="11" rx="3" fill="#7C5CFF" />
        </svg>
      </div>
      <div className="flex flex-col leading-none">
        <span className="text-display text-[15px] font-semibold tracking-tight">Frame</span>
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
          Prototype Gallery
        </span>
      </div>
    </div>
  );
}
