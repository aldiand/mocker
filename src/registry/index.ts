import { lazy, type ComponentType, type LazyExoticComponent } from 'react';
import prototypesRaw from '@/generated/prototypes.json';
import type { PrototypeMeta } from '@/types';

export const prototypes: PrototypeMeta[] = prototypesRaw as PrototypeMeta[];

const lazyCache = new Map<string, LazyExoticComponent<ComponentType>>();

function buildComponentId(componentPath: string): string {
  return `/${componentPath}`;
}

export function getComponent(prototype: PrototypeMeta): LazyExoticComponent<ComponentType> {
  const key = prototype.component;
  const existing = lazyCache.get(key);
  if (existing) return existing;

  const id = buildComponentId(prototype.component);
  const created = lazy(() => {
    const modules = import.meta.glob('/src/prototypes/**/*.tsx');
    const loader = modules[id];
    if (!loader) {
      return Promise.reject(new Error(`Prototype module not found: ${id}`));
    }
    return loader() as Promise<{ default: ComponentType }>;
  });
  lazyCache.set(key, created);
  return created;
}

export function findPrototypeById(id: string): PrototypeMeta | undefined {
  return prototypes.find((p) => p.id === id);
}

export function prototypesByDevice(device: PrototypeMeta['device']): PrototypeMeta[] {
  return prototypes
    .filter((p) => p.device === device)
    .slice()
    .sort((a, b) => (a.order || 0) - (b.order || 0) || a.title.localeCompare(b.title));
}
