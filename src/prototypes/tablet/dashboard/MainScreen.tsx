/**
 * title: Tablet Dashboard
 * tags: tablet, dashboard, overview
 * category: Dashboard
 * device: tablet
 * order: 10
 */

import { LayoutGrid, BarChart2, Users, Bell, Search, Plus } from 'lucide-react';

export default function MainScreen() {
  const cards = [
    { title: 'Active Sessions', val: '1,420', change: '+8.2%' },
    { title: 'Monthly Revenue', val: '$28,400', change: '+14.5%' },
    { title: 'New Signups', val: '312', change: '+5.1%' },
  ];

  return (
    <div className="flex h-full w-full bg-background text-foreground">
      <aside className="w-48 border-r border-border bg-card p-4 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 font-bold text-base text-primary">
            <LayoutGrid className="h-5 w-5" /> Tablet App
          </div>
          <nav className="mt-6 space-y-1 text-xs font-medium">
            <a href="#overview" className="flex items-center gap-2 rounded-lg bg-primary/10 px-3 py-2 text-primary">
              <BarChart2 className="h-4 w-4" /> Overview
            </a>
            <a href="#users" className="flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground hover:bg-muted">
              <Users className="h-4 w-4" /> Users
            </a>
          </nav>
        </div>
      </aside>

      <main className="flex-1 flex flex-col p-6">
        <header className="flex items-center justify-between border-b border-border pb-4">
          <h1 className="text-lg font-bold">Tablet Dashboard</h1>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2 h-3.5 w-3.5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search..."
                className="w-40 rounded-lg border border-border bg-background py-1.5 pl-8 pr-2 text-xs focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <button type="button" className="p-1.5 rounded-lg border border-border text-muted-foreground">
              <Bell className="h-4 w-4" />
            </button>
            <button type="button" className="flex items-center gap-1 rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground">
              <Plus className="h-3.5 w-3.5" /> Add
            </button>
          </div>
        </header>

        <div className="mt-6 grid grid-cols-3 gap-3">
          {cards.map((c) => (
            <div key={c.title} className="rounded-xl border border-border bg-card p-4 shadow-soft">
              <div className="text-xs text-muted-foreground font-medium">{c.title}</div>
              <div className="mt-2 text-xl font-bold">{c.val}</div>
              <div className="mt-1 text-xs text-emerald-500 font-medium">{c.change}</div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
