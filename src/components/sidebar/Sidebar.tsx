import { X } from 'lucide-react';
import { SidebarTree } from './SidebarTree';
import { Button } from '@/components/ui/Button';
import { useUIStore } from '@/theme/useThemeStore';
import type { PrototypeMeta } from '@/types';
import { cn } from '@/lib/utils';

interface SidebarProps {
  prototypes: PrototypeMeta[];
}

export function Sidebar({ prototypes }: SidebarProps) {
  const collapsed = useUIStore((s) => s.sidebarCollapsed);
  const setSidebar = useUIStore((s) => s.setSidebar);
  const query = useUIStore((s) => s.query);
  return (
    <>
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 flex w-[280px] shrink-0 flex-col border-r border-border bg-sidebar text-sidebar-foreground transition-transform lg:static lg:translate-x-0',
          collapsed ? '-translate-x-full lg:hidden' : 'translate-x-0'
        )}
      >
        <div className="flex h-14 items-center justify-between border-b border-border/70 px-4">
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            Navigation
          </div>
          <Button
            variant="ghost"
            size="icon-sm"
            className="lg:hidden"
            onClick={() => setSidebar(true)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex-1 overflow-y-auto px-2 pb-6">
          <SidebarTree prototypes={prototypes} query={query} />
        </div>
      </aside>
      {!collapsed && (
        <div
          className="fixed inset-0 z-30 bg-foreground/30 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebar(true)}
        />
      )}
    </>
  );
}
