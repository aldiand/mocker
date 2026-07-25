export type DeviceKind = 'mobile' | 'desktop' | 'tablet';

export interface PrototypeMeta {
  id: string;
  title: string;
  category: string;
  device: DeviceKind;
  path: string;
  component: string;
  tags: string[];
  order: number;
}
