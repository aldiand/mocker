/**
 * title: Tablet Sign In
 * tags: tablet, auth, login
 * category: Auth
 * device: tablet
 * order: 9
 */

import { Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';

export default function SignIn() {
  return (
    <div className="flex h-full w-full bg-background text-foreground">
      <div className="hidden w-1/2 flex-col justify-between bg-primary p-8 text-primary-foreground lg:flex">
        <div className="flex items-center gap-2 font-bold text-lg">
          <ShieldCheck className="h-6 w-6" /> Mocker Workspace
        </div>
        <div>
          <h2 className="text-2xl font-bold">Manage prototypes seamlessly across tablet viewports.</h2>
          <p className="mt-2 text-xs text-primary-foreground/80">Interactive canvas and responsive mockups built for modern design workflows.</p>
        </div>
        <div className="text-xs text-primary-foreground/60">© 2026 Mocker Inc.</div>
      </div>

      <div className="flex flex-1 flex-col justify-center p-8">
        <div className="mx-auto w-full max-w-sm">
          <h1 className="text-2xl font-bold tracking-tight">Tablet Workspace Sign In</h1>
          <p className="mt-1 text-xs text-muted-foreground">Enter your credentials to manage tablet prototypes</p>

          <form className="mt-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Email</label>
              <div className="mt-1 relative">
                <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <input
                  type="email"
                  placeholder="name@company.com"
                  className="w-full rounded-xl border border-border bg-card py-2.5 pl-9 pr-3 text-xs focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-muted-foreground">Password</label>
              <div className="mt-1 relative">
                <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-border bg-card py-2.5 pl-9 pr-3 text-xs focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-2.5 text-xs font-semibold text-primary-foreground shadow-soft hover:bg-primary/90 transition"
            >
              Sign In <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
