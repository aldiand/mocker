import { useState } from 'react';
import { Badge } from '@/components/ui/Badge';
import { Tooltip } from '@/components/ui/Tooltip';
import { Copy, Check } from 'lucide-react';
import type { PrototypeMeta } from '@/types';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface MetaPanelProps {
  prototype: PrototypeMeta;
}

export function MetaPanel({ prototype }: MetaPanelProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      await navigator.clipboard.writeText(prototype.component).catch(() => {});
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <div className="flex flex-col gap-4 border-l border-border bg-sidebar/40 p-5">
      <div>
        <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          {prototype.device}
        </div>
        <h2 className="text-display mt-1 text-[20px] font-semibold tracking-tight">
          {prototype.title}
        </h2>
        <p className="mt-1 text-xs text-muted-foreground">{prototype.category}</p>
      </div>

      {prototype.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {prototype.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="font-mono text-[10px]">
              #{tag}
            </Badge>
          ))}
        </div>
      )}

      <div className="space-y-2">
        <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Source
        </div>
        <div className="flex items-center gap-1 rounded-md border border-border bg-background/60 p-1.5">
          <code className="flex-1 truncate px-1 font-mono text-[11px] text-foreground/80">
            {prototype.component}
          </code>
          <Tooltip label={copied ? 'Copied' : 'Copy path'}>
            <Button variant="ghost" size="icon-sm" onClick={handleCopy} aria-label="Copy source path">
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            </Button>
          </Tooltip>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <Stat label="Device" value={prototype.device} />
        <Stat label="Order" value={`#${prototype.order || 0}`} />
        <Stat label="Path" value={prototype.path} mono />
        <Stat label="ID" value={prototype.id} mono />
      </div>
    </div>
  );
}

function Stat({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="rounded-md border border-border/60 bg-background/60 p-2">
      <div className="text-[9.5px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
        {label}
      </div>
      <div
        className={cn(
          'mt-0.5 truncate text-[12px] font-medium text-foreground/90',
          mono && 'font-mono text-[11px]'
        )}
      >
        {value}
      </div>
    </div>
  );
}
