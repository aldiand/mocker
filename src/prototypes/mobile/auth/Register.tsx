/**
 * title: Mobile Register
 * tags: mobile, auth, register
 * category: Auth
 * device: mobile
 * order: 6
 */

import { User, Mail, Lock, CheckCircle2 } from 'lucide-react';

export default function Register() {
  return (
    <div className="flex h-full w-full flex-col justify-between bg-background p-6 text-foreground">
      <div className="pt-6">
        <h1 className="text-2xl font-bold tracking-tight">Create Account</h1>
        <p className="mt-1 text-xs text-muted-foreground">Start your 14-day free workspace trial</p>

        <form className="mt-6 space-y-3.5" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="text-xs font-medium text-muted-foreground">Full Name</label>
            <div className="mt-1 relative">
              <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Alex Morgan"
                className="w-full rounded-xl border border-border bg-card py-2.5 pl-9 pr-3 text-xs focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-muted-foreground">Work Email</label>
            <div className="mt-1 relative">
              <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="email"
                placeholder="alex@company.com"
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
                placeholder="At least 8 characters"
                className="w-full rounded-xl border border-border bg-card py-2.5 pl-9 pr-3 text-xs focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1 text-xs text-muted-foreground">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
            <span>I agree to the Terms of Service & Privacy Policy</span>
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-primary py-3 text-xs font-semibold text-primary-foreground shadow-soft hover:bg-primary/90 transition"
          >
            Create Free Account
          </button>
        </form>
      </div>

      <div className="pb-4 text-center text-xs text-muted-foreground">
        Already have an account? <a href="#login" className="font-semibold text-primary">Log In</a>
      </div>
    </div>
  );
}
