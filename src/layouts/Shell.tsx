import { Outlet, Link, useLocation } from 'react-router-dom';
import { Menu, Github } from 'lucide-react';
import { Sidebar } from '@/components/sidebar/Sidebar';
import { SearchBar } from '@/components/common/SearchBar';
import { ThemeToggle } from '@/components/common/ThemeToggle';
import { BrandWordmark } from '@/components/common/BrandWordmark';
import { Button } from '@/components/ui/Button';
import { prototypes } from '@/registry';
import { useUIStore } from '@/theme/useThemeStore';

export function Shell() {
  const location = useLocation();
  const isViewer = location.pathname.startsWith('/prototype/');
  const collapsed = useUIStore((s) => s.sidebarCollapsed);
  const setSidebar = useUIStore((s) => s.setSidebar);

  return (
    <div className="flex h-screen w-full bg-background">
      {!isViewer && (
        <Sidebar prototypes={prototypes} />
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex h-14 shrink-0 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur-md sm:px-6">
          <div className="flex items-center gap-2">
            {!isViewer && (
              <Button
                variant="ghost"
                size="icon-sm"
                className={collapsed ? 'inline-flex' : 'lg:hidden'}
                aria-label="Open navigation"
                onClick={() => setSidebar(false)}
              >
                <Menu className="h-4 w-4" />
              </Button>
            )}
            <Link to="/" className="flex items-center">
              <BrandWordmark />
            </Link>
          </div>
          {!isViewer ? (
            <div className="ml-auto hidden w-full max-w-md md:block">
              <SearchBar />
            </div>
          ) : (
            <div className="mx-auto font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              Prototype Viewer
            </div>
          )}
          <div className="ml-auto flex items-center gap-1 md:ml-2">
            <ThemeToggle />
            <a
              href="https://github.com/aldiand/mocker"
              target="_blank"
              rel="noreferrer"
              aria-label="View repository"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-transparent font-medium text-foreground transition-colors hover:bg-secondary/70"
            >
              <Github className="h-4 w-4" />
            </a>
          </div>
        </header>

        {!isViewer && (
          <div className="md:hidden">
            <div className="border-b border-border bg-background px-4 py-3">
              <SearchBar />
            </div>
          </div>
        )}

        <main className="min-h-0 flex-1 overflow-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
