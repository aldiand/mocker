import { useCallback } from 'react';
import { ZoomIn, ZoomOut, Maximize2, Smartphone, Tablet, Monitor, Square, ChevronLeft, Copy } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Tooltip } from '@/components/ui/Tooltip';
import { cn } from '@/lib/utils';

export type FrameKind = 'mobile' | 'tablet' | 'desktop' | 'browser';

interface ViewerToolbarProps {
  zoomIn: () => void;
  zoomOut: () => void;
  resetTransform: () => void;
  center: () => void;
  zoomLevel: number;
  frame: FrameKind;
  setFrame: (f: FrameKind) => void;
  background: 'dots' | 'solid' | 'transparent';
  setBackground: (b: 'dots' | 'solid' | 'transparent') => void;
  onBack: () => void;
  title: string;
  path: string;
}

export function ViewerToolbar({
  zoomIn,
  zoomOut,
  resetTransform,
  center,
  zoomLevel,
  frame,
  setFrame,
  background,
  setBackground,
  onBack,
  title,
  path,
}: ViewerToolbarProps) {
  const handleCopy = useCallback(() => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(path).catch(() => {});
    }
  }, [path]);

  return (
    <>
      <div className="pointer-events-none absolute inset-x-0 top-0 z-30 flex items-start justify-between gap-4 p-4">
        <div className="pointer-events-auto flex items-center gap-2 rounded-xl border border-border/60 bg-background/90 p-1.5 shadow-soft backdrop-blur-md">
          <Button variant="ghost" size="icon-sm" onClick={onBack} aria-label="Back to gallery">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="hidden h-5 w-px bg-border md:block" />
          <div className="hidden flex-col px-2 leading-tight md:flex">
            <span className="text-display text-[13px] font-semibold tracking-tight">{title}</span>
            <span className="font-mono text-[10px] text-muted-foreground">{path}</span>
          </div>
          <Tooltip label="Copy source path">
            <Button variant="ghost" size="icon-sm" onClick={handleCopy} aria-label="Copy path">
              <Copy className="h-3.5 w-3.5" />
            </Button>
          </Tooltip>
        </div>

        <div className="pointer-events-auto flex items-center gap-2 rounded-xl border border-border/60 bg-background/90 p-1.5 shadow-soft backdrop-blur-md">
          <div className="hidden items-center gap-0.5 px-1 md:flex">
            <FrameButton current={frame} target="mobile" setFrame={setFrame} icon={Smartphone} label="Mobile" />
            <FrameButton current={frame} target="tablet" setFrame={setFrame} icon={Tablet} label="Tablet" />
            <FrameButton current={frame} target="desktop" setFrame={setFrame} icon={Monitor} label="Desktop" />
            <FrameButton current={frame} target="browser" setFrame={setFrame} icon={Square} label="Browser" />
          </div>
          <div className="hidden h-5 w-px bg-border md:block" />
          <BackgroundMenu value={background} onChange={setBackground} />
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 flex justify-center p-4">
        <div className="pointer-events-auto flex items-center gap-1 rounded-xl border border-border/60 bg-background/90 p-1.5 shadow-soft backdrop-blur-md">
          <Tooltip label="Zoom out">
            <Button variant="ghost" size="icon-sm" onClick={zoomOut} aria-label="Zoom out">
              <ZoomOut className="h-4 w-4" />
            </Button>
          </Tooltip>
          <Tooltip label="Fit / Center">
            <Button variant="ghost" size="icon-sm" onClick={center} aria-label="Fit to view">
              <Maximize2 className="h-4 w-4" />
            </Button>
          </Tooltip>
          <Tooltip label="Reset (100%)">
            <Button variant="ghost" size="icon-sm" onClick={resetTransform} aria-label="Reset zoom">
              <span className="font-mono text-[11px] font-semibold">100%</span>
            </Button>
          </Tooltip>
          <Tooltip label="Zoom in">
            <Button variant="ghost" size="icon-sm" onClick={zoomIn} aria-label="Zoom in">
              <ZoomIn className="h-4 w-4" />
            </Button>
          </Tooltip>
          <div className="ml-1 hidden h-6 w-12 items-center justify-center rounded-md border border-border/60 bg-background font-mono text-[11px] text-muted-foreground sm:flex">
            {Math.round(zoomLevel * 100)}%
          </div>
        </div>
      </div>
    </>
  );
}

function FrameButton({
  current,
  target,
  setFrame,
  icon: Icon,
  label,
}: {
  current: FrameKind;
  target: FrameKind;
  setFrame: (f: FrameKind) => void;
  icon: typeof Smartphone;
  label: string;
}) {
  return (
    <Tooltip label={label}>
      <button
        type="button"
        onClick={() => setFrame(target)}
        aria-label={label}
        className={cn(
          'grid h-7 w-7 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground',
          current === target && 'bg-foreground text-background hover:bg-foreground hover:text-background'
        )}
      >
        <Icon className="h-3.5 w-3.5" />
      </button>
    </Tooltip>
  );
}

function BackgroundMenu({
  value,
  onChange,
}: {
  value: 'dots' | 'solid' | 'transparent';
  onChange: (v: 'dots' | 'solid' | 'transparent') => void;
}) {
  const options: Array<{ id: 'dots' | 'solid' | 'transparent'; label: string }> = [
    { id: 'dots', label: 'Dotted' },
    { id: 'solid', label: 'Solid' },
    { id: 'transparent', label: 'Transparent' },
  ];
  return (
    <div className="flex items-center gap-0.5 rounded-md border border-border/60 bg-background p-0.5">
      {options.map((opt) => (
        <button
          key={opt.id}
          type="button"
          onClick={() => onChange(opt.id)}
          aria-label={`${opt.label} background`}
          className={cn(
            'h-6 rounded-[5px] px-2 text-[10.5px] font-medium tracking-tight text-muted-foreground transition',
            value === opt.id && 'bg-foreground text-background'
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
