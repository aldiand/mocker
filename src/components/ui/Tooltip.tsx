import * as React from 'react';
import { cn } from '@/lib/utils';

interface TooltipProps {
  label: React.ReactNode;
  side?: 'top' | 'bottom';
  children: React.ReactNode;
  className?: string;
}

export function Tooltip({ label, side = 'bottom', children, className }: TooltipProps) {
  return (
    <span className={cn('group relative inline-flex', className)}>
      {children}
      <span
        role="tooltip"
        className={cn(
          'pointer-events-none absolute left-1/2 z-50 -translate-x-1/2 whitespace-nowrap rounded-md bg-foreground/95 px-2 py-1 text-[11px] font-medium text-background opacity-0 shadow-soft transition group-hover:opacity-100',
          side === 'bottom' ? 'top-[calc(100%+6px)]' : 'bottom-[calc(100%+6px)]'
        )}
      >
        {label}
      </span>
    </span>
  );
}
