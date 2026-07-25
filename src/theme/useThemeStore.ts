import { create } from 'zustand';

export type Theme = 'light' | 'dark';

interface ThemeState {
  theme: Theme;
  setTheme: (t: Theme) => void;
  toggle: () => void;
}

const STORAGE_KEY = 'frame.theme';

function readInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'light';
  const stored = window.localStorage.getItem(STORAGE_KEY) as Theme | null;
  if (stored === 'light' || stored === 'dark') return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export const useThemeStore = create<ThemeState>((set, get) => ({
  theme: readInitialTheme(),
  setTheme: (t) => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, t);
      document.documentElement.classList.toggle('dark', t === 'dark');
    }
    set({ theme: t });
  },
  toggle: () => {
    const next: Theme = get().theme === 'dark' ? 'light' : 'dark';
    get().setTheme(next);
  },
}));

interface UIState {
  sidebarCollapsed: boolean;
  setSidebar: (v: boolean) => void;
  toggleSidebar: () => void;
  query: string;
  setQuery: (q: string) => void;
  deviceFilter: 'mobile' | 'desktop' | 'tablet';
  setDeviceFilter: (d: 'mobile' | 'desktop' | 'tablet') => void;
}

export const useUIStore = create<UIState>((set, get) => ({
  sidebarCollapsed: false,
  setSidebar: (v) => set({ sidebarCollapsed: v }),
  toggleSidebar: () => set({ sidebarCollapsed: !get().sidebarCollapsed }),
  query: '',
  setQuery: (q) => set({ query: q }),
  deviceFilter: 'mobile',
  setDeviceFilter: (d) => set({ deviceFilter: d }),
}));
