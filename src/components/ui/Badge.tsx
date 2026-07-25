import * as React from 'react';
import { cn } from '@/lib/utils';

type Variant = 'default' | 'outline' | 'muted' | 'accent' | 'dark';

const variants: Record<Variant, string> = {
  default: 'bg-primary/10 text-primary border border-primary/15',
  outline: 'border border-border/70 text-foreground/80 bg-background/40',
  muted: 'bg-muted text-muted-foreground border border-transparent',
  accent: 'bg-accent text-accent-foreground border border-transparent',
  dark: 'bg-foreground text-background border border-transparent',
};

export function Badge({
  className,
  variant = 'muted',
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { variant?: Variant }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10.5px] font-medium tracking-tight',
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
