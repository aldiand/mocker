/**
 * title: Mobile Dashboard
 * tags: mobile, dashboard, home
 * category: Dashboard
 * device: mobile
 * order: 7
 */

import { Bell, Search, Home as HomeIcon, Wallet, User as UserIcon, ArrowUpRight } from 'lucide-react';

export default function Home() {
  const cards = [
    { title: 'Total Savings', amount: '$12,450.00', change: '+12.5%' },
    { title: 'Monthly Expenses', amount: '$3,120.50', change: '-2.4%' },
  ];

  return (
    <div className="flex h-full w-full flex-col justify-between bg-background text-foreground">
      <div className="p-5">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-full bg-primary text-primary-foreground font-bold text-sm">
              AM
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Good morning,</div>
              <div className="font-bold text-sm">Alex Morgan</div>
            </div>
          </div>
          <div className="flex gap-2">
            <button type="button" className="p-2 rounded-full border border-border bg-card text-muted-foreground">
              <Bell className="h-4 w-4" />
            </button>
          </div>
        </header>

        <div className="mt-5 relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search transactions..."
            className="w-full rounded-xl border border-border bg-card py-2 pl-9 pr-3 text-xs focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        <div className="mt-5 space-y-3">
          {cards.map((c) => (
            <div key={c.title} className="rounded-2xl border border-border bg-card p-4 shadow-soft">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{c.title}</span>
                <span className="flex items-center gap-0.5 text-emerald-500 font-medium">{c.change} <ArrowUpRight className="h-3 w-3" /></span>
              </div>
              <div className="mt-2 text-xl font-bold tracking-tight">{c.amount}</div>
            </div>
          ))}
        </div>
      </div>

      <nav className="flex items-center justify-around border-t border-border bg-card py-3 text-muted-foreground">
        <button type="button" className="flex flex-col items-center gap-1 text-primary">
          <HomeIcon className="h-5 w-5" />
          <span className="text-[10px] font-medium">Home</span>
        </button>
        <button type="button" className="flex flex-col items-center gap-1">
          <Wallet className="h-5 w-5" />
          <span className="text-[10px] font-medium">Wallet</span>
        </button>
        <button type="button" className="flex flex-col items-center gap-1">
          <UserIcon className="h-5 w-5" />
          <span className="text-[10px] font-medium">Profile</span>
        </button>
      </nav>
    </div>
  );
}
