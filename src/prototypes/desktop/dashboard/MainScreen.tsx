/**
 * title: Main Workspace
 * tags: dashboard, workspace, desktop
 * category: Dashboard
 * device: desktop
 * order: 4
 */

import { LayoutGrid, Layers, Settings, Bell, Search, Plus } from 'lucide-react';

export default function MainScreen() {
  const projects = [
    { title: 'Mobile App Redesign', status: 'In Progress', progress: 75, members: 4 },
    { title: 'Design System Migration', status: 'Review', progress: 90, members: 6 },
    { title: 'API Integration V2', status: 'Planning', progress: 30, members: 3 },
  ];

  return (
    <div className="flex h-full w-full bg-background text-foreground">
      <aside className="w-16 border-r border-border bg-card flex flex-col items-center py-4 justify-between">
        <div className="flex flex-col items-center gap-6">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary text-primary-foreground font-bold">
            M
          </div>
          <nav className="flex flex-col gap-4 text-muted-foreground">
            <button type="button" className="p-2 rounded-lg bg-primary/10 text-primary">
              <LayoutGrid className="h-5 w-5" />
            </button>
            <button type="button" className="p-2 hover:text-foreground">
              <Layers className="h-5 w-5" />
            </button>
          </nav>
        </div>
        <button type="button" className="p-2 text-muted-foreground hover:text-foreground">
          <Settings className="h-5 w-5" />
        </button>
      </aside>

      <main className="flex-1 flex flex-col p-6">
        <header className="flex items-center justify-between border-b border-border pb-4">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold">Projects Overview</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search projects..."
                className="w-64 rounded-lg border border-border bg-background py-1.5 pl-9 pr-3 text-xs focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <button type="button" className="p-2 rounded-lg border border-border hover:bg-muted text-muted-foreground">
              <Bell className="h-4 w-4" />
            </button>
            <button type="button" className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground">
              <Plus className="h-3.5 w-3.5" /> Project
            </button>
          </div>
        </header>

        <div className="mt-6 grid grid-cols-3 gap-4">
          {projects.map((p) => (
            <div key={p.title} className="rounded-xl border border-border bg-card p-5 shadow-soft">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">{p.status}</span>
                <span className="text-xs text-muted-foreground">{p.members} Members</span>
              </div>
              <h3 className="mt-2 font-bold text-base">{p.title}</h3>
              <div className="mt-4">
                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                  <span>Progress</span>
                  <span>{p.progress}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: `${p.progress}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
