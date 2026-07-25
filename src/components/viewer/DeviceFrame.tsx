import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface DeviceFrameProps {
  device: 'mobile' | 'desktop' | 'tablet' | 'browser';
  children: ReactNode;
}

export function DeviceFrame({ device, children }: DeviceFrameProps) {
  if (device === 'mobile') return <PhoneFrame>{children}</PhoneFrame>;
  if (device === 'tablet') return <TabletFrame>{children}</TabletFrame>;
  if (device === 'browser') return <BrowserFrame>{children}</BrowserFrame>;
  return <DesktopFrame>{children}</DesktopFrame>;
}

function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative mx-auto" style={{ width: 390 }}>
      <div className="relative overflow-hidden rounded-[42px] bg-foreground p-[10px] shadow-[0_30px_60px_-20px_rgba(15,17,21,0.45),0_4px_12px_rgba(15,17,21,0.18)] ring-1 ring-foreground/40">
        <div className="absolute left-1/2 top-[14px] z-10 h-[26px] w-[120px] -translate-x-1/2 rounded-full bg-foreground" />
        <div className="absolute right-[18px] top-[22px] z-10 h-[10px] w-[10px] rounded-full bg-foreground ring-2 ring-foreground/60" />
        <div className="overflow-hidden rounded-[34px] bg-card">
          <div className="relative" style={{ height: 844 }}>
            {children}
          </div>
        </div>
      </div>
      <div className="mx-auto mt-2 h-1 w-24 rounded-full bg-foreground/30" />
    </div>
  );
}

function TabletFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative mx-auto" style={{ width: 834 }}>
      <div className="relative overflow-hidden rounded-[28px] bg-foreground p-[10px] shadow-[0_30px_60px_-20px_rgba(15,17,21,0.45),0_4px_12px_rgba(15,17,21,0.18)] ring-1 ring-foreground/40">
        <div className="absolute left-1/2 top-[14px] z-10 h-[6px] w-[80px] -translate-x-1/2 rounded-full bg-foreground/80" />
        <div className="overflow-hidden rounded-[20px] bg-card">
          <div className="relative" style={{ height: 1194 }}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

function DesktopFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative mx-auto" style={{ width: 'min(1280px, 96vw)' }}>
      <div className="overflow-hidden rounded-[18px] border border-foreground/15 bg-foreground shadow-[0_30px_60px_-20px_rgba(15,17,21,0.45),0_4px_12px_rgba(15,17,21,0.18)]">
        <div className="flex items-center gap-1.5 border-b border-foreground/30 bg-foreground/90 px-3 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]/90" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/90" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/90" />
          <div className="mx-auto flex h-6 w-1/2 max-w-md items-center gap-2 rounded-md bg-foreground/50 px-3 text-[10.5px] text-foreground/70 ring-1 ring-foreground/40">
            <svg viewBox="0 0 16 16" className="h-2.5 w-2.5" aria-hidden>
              <path
                d="M8 1.5a6.5 6.5 0 1 0 4.6 11.1l1.9 1.9 1.06-1.06-1.9-1.9A6.5 6.5 0 0 0 8 1.5Zm0 1.3a5.2 5.2 0 1 1 0 10.4 5.2 5.2 0 0 1 0-10.4Z"
                fill="currentColor"
              />
            </svg>
            <span>app.example.com</span>
          </div>
        </div>
        <div className="relative bg-card" style={{ height: 800 }}>
          {children}
        </div>
      </div>
    </div>
  );
}

function BrowserFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative mx-auto" style={{ width: 'min(1280px, 96vw)' }}>
      <div className="overflow-hidden rounded-[18px] border border-foreground/20 bg-foreground shadow-[0_30px_60px_-20px_rgba(15,17,21,0.45)]">
        <div className="flex h-9 items-center gap-1.5 border-b border-foreground/30 bg-foreground/90 px-3">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]/90" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febbc2e]/90" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/90" />
        </div>
        <div className="relative bg-card" style={{ height: 800 }}>
          {children}
        </div>
      </div>
      <div className={cn('mx-auto mt-2 h-1 w-24 rounded-full bg-foreground/30')} />
    </div>
  );
}
