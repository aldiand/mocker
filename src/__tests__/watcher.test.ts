import { describe, it, expect } from 'vitest';
import {
  parseFrontMatter,
  inferDeviceFromFolder,
  resolveDevice,
  buildIdFromPath,
  titleFromFilename,
  categoryFromFolders,
} from '../../scripts/watcher';

describe('watcher utility functions', () => {
  describe('parseFrontMatter', () => {
    it('should parse valid front-matter JSDoc comments', () => {
      const source = `
/**
 * title: Custom User Dashboard
 * tags: analytics, crm, overview
 * device: desktop
 * order: 5
 * category: Analytics / Core
 */
export default function Dashboard() { return null; }
`;
      const fm = parseFrontMatter(source);
      expect(fm.title).toBe('Custom User Dashboard');
      expect(fm.tags).toEqual(['analytics', 'crm', 'overview']);
      expect(fm.device).toBe('desktop');
      expect(fm.order).toBe(5);
      expect(fm.category).toBe('Analytics / Core');
    });

    it('should return empty object when no front-matter comment is present', () => {
      const source = `export default function Simple() { return null; }`;
      const fm = parseFrontMatter(source);
      expect(fm).toEqual({});
    });
  });

  describe('inferDeviceFromFolder', () => {
    it('should infer mobile device for mobile/phone/iphone/android folders', () => {
      expect(inferDeviceFromFolder('mobile')).toBe('mobile');
      expect(inferDeviceFromFolder('iphone-views')).toBe('mobile');
      expect(inferDeviceFromFolder('android')).toBe('mobile');
    });

    it('should infer tablet for tablet/ipad folders', () => {
      expect(inferDeviceFromFolder('tablet')).toBe('tablet');
      expect(inferDeviceFromFolder('ipad_screens')).toBe('tablet');
    });

    it('should default to desktop for other folder names', () => {
      expect(inferDeviceFromFolder('desktop')).toBe('desktop');
      expect(inferDeviceFromFolder('crm')).toBe('desktop');
    });
  });

  describe('resolveDevice', () => {
    it('should resolve device aliases correctly', () => {
      expect(resolveDevice('phone', 'desktop')).toBe('mobile');
      expect(resolveDevice('ipad', 'desktop')).toBe('tablet');
      expect(resolveDevice('web', 'mobile')).toBe('desktop');
    });

    it('should fallback when given an undefined or unknown device alias', () => {
      expect(resolveDevice(undefined, 'mobile')).toBe('mobile');
      expect(resolveDevice('unknown-device', 'tablet')).toBe('tablet');
    });
  });

  describe('buildIdFromPath', () => {
    it('should build slugified id from relative file path', () => {
      expect(buildIdFromPath('mobile/auth/Login.tsx')).toBe('mobile-auth-login');
      expect(buildIdFromPath('desktop/crm/UserDashboard.tsx')).toBe('desktop-crm-user-dashboard');
    });
  });

  describe('titleFromFilename', () => {
    it('should capitalize filename into title', () => {
      expect(titleFromFilename('user-profile.tsx')).toBe('User Profile');
      expect(titleFromFilename('MainScreen.tsx')).toBe('MainScreen');
    });
  });

  describe('categoryFromFolders', () => {
    it('should format folder path array into category string', () => {
      expect(categoryFromFolders(['mobile', 'auth'])).toBe('Mobile / Auth');
      expect(categoryFromFolders([])).toBe('Uncategorized');
    });
  });
});
