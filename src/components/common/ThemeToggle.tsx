import { Moon, Sun } from 'lucide-react';
import { useThemeStore } from '@/theme/useThemeStore';
import { Button } from '@/components/ui/Button';
import { Tooltip } from '@/components/ui/Tooltip';

export function ThemeToggle() {
  const theme = useThemeStore((s) => s.theme);
  const toggle = useThemeStore((s) => s.toggle);
  return (
    <Tooltip label={theme === 'dark' ? 'Light mode' : 'Dark mode'}>
      <Button variant="ghost" size="icon" aria-label="Toggle theme" onClick={toggle}>
        {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </Button>
    </Tooltip>
  );
}
