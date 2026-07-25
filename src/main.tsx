import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from '@/theme/ThemeProvider';
import { useUIStore } from '@/theme/useThemeStore';
import './styles/globals.css';

if (typeof window !== 'undefined') {
  try {
    const initial = useUIStore.getState();
    void initial;
  } catch {
    // Ignore store initialization error if localStorage is disabled
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
