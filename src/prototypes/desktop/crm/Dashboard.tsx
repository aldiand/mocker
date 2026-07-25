/**
 * title: CRM Dashboard
 * tags: crm, deals, pipeline
 * category: CRM
 * device: desktop
 * order: 3
 */

import { Users, Filter, Plus, PhoneCall, CheckCircle2, Clock } from 'lucide-react';

export default function Dashboard() {
  const deals = [
    { company: 'Acme Corp', stage: 'Qualified', value: '$24,000', contact: 'Sarah Jenkins', time: '2 hours ago' },
    { company: 'Starlight Inc', stage: 'Proposal Sent', value: '$48,500', contact: 'David Kim', time: '4 hours ago' },
    { company: 'Nexus Logistics', stage: 'Negotiation', value: '$12,000', contact: 'Elena Rostova', time: '1 day ago' },
  ];

  return (
    <div className="flex h-full w-full bg-background text-foreground">
      <aside className="w-56 border-r border-border bg-card p-4">
        <div className="flex items-center gap-2 font-bold text-lg text-primary">
          <Users className="h-5 w-5" /> Mocker CRM
        </div>
        <nav className="mt-6 space-y-1 text-sm font-medium">
          <a href="#dashboard" className="flex items-center gap-2 rounded-lg bg-primary/10 px-3 py-2 text-primary">
            Dashboard
          </a>
          <a href="#contacts" className="flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground hover:bg-muted">
            Contacts
          </a>
          <a href="#deals" className="flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground hover:bg-muted">
            Deals Pipeline
          </a>
        </nav>
      </aside>

      <main className="flex-1 flex flex-col p-6">
        <header className="flex items-center justify-between border-b border-border pb-4">
          <div>
            <h1 className="text-xl font-bold">Deal Pipeline</h1>
            <p className="text-xs text-muted-foreground">Manage active sales contacts and deal progression</p>
          </div>
          <div className="flex gap-2">
            <button type="button" className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium hover:bg-muted">
              <Filter className="h-3.5 w-3.5" /> Filter
            </button>
            <button type="button" className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground">
              <Plus className="h-3.5 w-3.5" /> New Deal
            </button>
          </div>
        </header>

        <div className="mt-6 grid flex-1 grid-cols-1 gap-4">
          <div className="rounded-xl border border-border bg-card p-4 shadow-soft">
            <h2 className="text-sm font-semibold mb-3">Recent Pipeline Opportunities</h2>
            <div className="divide-y divide-border">
              {deals.map((deal) => (
                <div key={deal.company} className="flex items-center justify-between py-3">
                  <div>
                    <div className="font-semibold text-sm">{deal.company}</div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                      <PhoneCall className="h-3 w-3" /> {deal.contact}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-sm">{deal.value}</div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                      <Clock className="h-3 w-3" /> {deal.time}
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-500">
                    <CheckCircle2 className="h-3 w-3" /> {deal.stage}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
