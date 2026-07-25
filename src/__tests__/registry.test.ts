import { describe, it, expect } from 'vitest';
import { findPrototypeById, prototypesByDevice, prototypes } from '../registry';

describe('registry utility functions', () => {
  it('should load prototypes array from generated prototypes.json', () => {
    expect(Array.isArray(prototypes)).toBe(true);
    expect(prototypes.length).toBeGreaterThan(0);
  });

  it('should find prototype by id', () => {
    const first = prototypes[0];
    expect(first).toBeDefined();
    const found = findPrototypeById(first.id);
    expect(found).toBeDefined();
    expect(found?.id).toBe(first.id);
  });

  it('should return undefined for nonexistent prototype id', () => {
    const found = findPrototypeById('non-existent-id-12345');
    expect(found).toBeUndefined();
  });

  it('should filter prototypes by device', () => {
    const mobileItems = prototypesByDevice('mobile');
    expect(Array.isArray(mobileItems)).toBe(true);
    mobileItems.forEach((item) => {
      expect(item.device).toBe('mobile');
    });

    const desktopItems = prototypesByDevice('desktop');
    desktopItems.forEach((item) => {
      expect(item.device).toBe('desktop');
    });
  });
});
