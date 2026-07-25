import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function titleFromFilename(filename: string): string {
  const base = filename.replace(/\.(tsx|ts)$/i, '');
  return base
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export function deviceFromFolder(folder: string): 'mobile' | 'desktop' | 'tablet' {
  const f = folder.toLowerCase();
  if (f.includes('mobile') || f.includes('phone')) return 'mobile';
  if (f.includes('tablet') || f.includes('ipad')) return 'tablet';
  return 'desktop';
}

export function capitalize(value: string): string {
  if (!value) return value;
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function formatCategoryFromPath(parts: string[]): string {
  if (parts.length === 0) return 'Uncategorized';
  const last = parts[parts.length - 1];
  const rest = parts.slice(0, -1);
  return [...rest, capitalize(last)].join(' / ');
}
