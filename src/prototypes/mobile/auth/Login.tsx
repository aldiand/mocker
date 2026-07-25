/**
 * title: Mobile Login
 * tags: mobile, auth, login
 * category: Auth
 * device: mobile
 * order: 5
 */

import { Lock, Mail, ArrowRight, Fingerprint } from 'lucide-react';

export default function Login() {
  return (
    <div className="flex h-full w-full flex-col justify-between bg-background p-6 text-foreground">
      <div className="pt-8">
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary text-primary-foreground font-bold text-xl">
          M
        </div>
        <h1 className="mt-6 text-2xl font-bold tracking-tight">Welcome back</h1>
        <p className="mt-1 text-xs text-muted-foreground">Sign in to continue to your workspace</p>

        <form className="mt-8 space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="text-xs font-medium text-muted-foreground">Email</label>
            <div className="mt-1 relative">
              <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="email"
                placeholder="name@example.com"
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
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-xs font-semibold text-primary-foreground shadow-soft hover:bg-primary/90 transition"
          >
            Sign In <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        <div className="mt-6 flex items-center justify-center gap-2">
          <button type="button" className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2 text-xs font-medium text-muted-foreground">
            <Fingerprint className="h-4 w-4 text-primary" /> Face ID
          </button>
        </div>
      </div>

      <div className="pb-4 text-center text-xs text-muted-foreground">
        Don't have an account? <a href="#register" className="font-semibold text-primary">Sign Up</a>
      </div>
    </div>
  );
}
