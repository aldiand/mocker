/**
 * title: Analytics Overview
 * tags: analytics, dashboard, metrics
 * category: Analytics
 * device: desktop
 * order: 1
 */

import { TrendingUp, Users, DollarSign, Activity, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function Overview() {
  const metrics = [
    { label: 'Total Revenue', value: '$45,231.89', change: '+20.1%', icon: DollarSign, isUp: true },
    { label: 'Active Users', value: '+2,350', change: '+180.1%', icon: Users, isUp: true },
    { label: 'Sales Count', value: '+12,234', change: '+19%', icon: TrendingUp, isUp: true },
    { label: 'Conversion Rate', value: '3.2%', change: '-4.1%', icon: Activity, isUp: false },
  ];

  return (
    <div className="flex h-full w-full flex-col bg-background p-8 text-foreground">
      <header className="mb-8 flex items-center justify-between border-b border-border pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Analytics Overview</h1>
          <p className="mt-1 text-sm text-muted-foreground">Monitor performance metrics and revenue growth.</p>
        </div>
        <button type="button" className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-soft">
          Download Report
        </button>
      </header>

      <div className="grid grid-cols-4 gap-4">
        {metrics.map((m) => {
          const Icon = m.icon;
          return (
            <div key={m.label} className="rounded-xl border border-border bg-card p-5 shadow-soft">
              <div className="flex items-center justify-between text-muted-foreground">
                <span className="text-xs font-medium uppercase tracking-wider">{m.label}</span>
                <Icon className="h-4 w-4" />
              </div>
              <div className="mt-3 text-2xl font-bold tracking-tight">{m.value}</div>
              <div className={`mt-2 inline-flex items-center gap-1 text-xs font-medium ${m.isUp ? 'text-emerald-500' : 'text-rose-500'}`}>
                {m.isUp ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
                {m.change} from last month
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex-1 rounded-xl border border-border bg-card p-6 shadow-soft">
        <h2 className="text-base font-semibold">Revenue Trajectory</h2>
        <p className="text-xs text-muted-foreground">Monthly breakdown of gross revenue</p>
        <div className="mt-8 flex h-48 items-end gap-3 px-4">
          {[40, 65, 50, 85, 70, 95, 80, 100].map((val, idx) => (
            <div key={idx} className="flex flex-1 flex-col items-center gap-2">
              <div className="w-full rounded-t bg-primary/80 transition-all hover:bg-primary" style={{ height: `${val}%` }} />
              <span className="text-[10px] text-muted-foreground">M{idx + 1}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
