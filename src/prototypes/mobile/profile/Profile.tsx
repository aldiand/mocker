/**
 * title: User Profile
 * tags: mobile, profile, settings
 * category: Profile
 * device: mobile
 * order: 8
 */

import { User, Shield, Bell, Key, LogOut, ChevronRight } from 'lucide-react';

export default function Profile() {
  const menuItems = [
    { label: 'Personal Details', icon: User },
    { label: 'Security & Password', icon: Key },
    { label: 'Notifications', icon: Bell },
    { label: 'Privacy & Permissions', icon: Shield },
  ];

  return (
    <div className="flex h-full w-full flex-col justify-between bg-background p-5 text-foreground">
      <div>
        <header className="text-center pt-4 pb-6 border-b border-border">
          <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-primary text-primary-foreground font-bold text-2xl shadow-soft">
            AM
          </div>
          <h1 className="mt-3 text-lg font-bold">Alex Morgan</h1>
          <p className="text-xs text-muted-foreground">alex.morgan@company.com</p>
        </header>

        <div className="mt-6 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                type="button"
                className="flex w-full items-center justify-between rounded-xl border border-border bg-card p-3.5 text-xs font-medium transition hover:bg-muted"
              >
                <div className="flex items-center gap-3">
                  <Icon className="h-4 w-4 text-primary" />
                  <span>{item.label}</span>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </button>
            );
          })}
        </div>
      </div>

      <button
        type="button"
        className="flex w-full items-center justify-center gap-2 rounded-xl border border-destructive/30 bg-destructive/5 py-3 text-xs font-semibold text-destructive hover:bg-destructive/10 transition"
      >
        <LogOut className="h-4 w-4" /> Log Out
      </button>
    </div>
  );
}
