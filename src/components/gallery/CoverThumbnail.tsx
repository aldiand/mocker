/* eslint-disable react-hooks/static-components */
import {
  Component,
  type ErrorInfo,
  type ReactNode,
  Suspense,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { getComponent } from '@/registry';
import type { PrototypeMeta } from '@/types';

interface CoverThumbnailProps {
  prototype: PrototypeMeta;
}

const NATURAL_SIZE: Record<PrototypeMeta['device'], { width: number; height: number }> = {
  mobile: { width: 390, height: 844 },
  tablet: { width: 834, height: 1194 },
  desktop: { width: 1440, height: 900 },
};

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export function CoverThumbnail({ prototype }: CoverThumbnailProps) {
  const PrototypeComponent = useMemo(() => getComponent(prototype), [prototype]);
  const { width, height } = NATURAL_SIZE[prototype.device];
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(0.01);
  const [mounted, setMounted] = useState(false);

  useIsomorphicLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const compute = () => {
      const rect = el.getBoundingClientRect();
      const padding = 24;
      const w = Math.max(rect.width - padding * 2, 1);
      const h = Math.max(rect.height - padding * 2, 1);
      const next = Math.min(w / width, h / height);
      setScale(next > 0 ? next : 0.01);
    };

    compute();
    setMounted(true);

    const ro = new ResizeObserver(compute);
    ro.observe(el);
    return () => ro.disconnect();
  }, [width, height]);

  return (
    <div ref={containerRef} className="relative h-full w-full overflow-hidden">
      <div className="canvas-dotted absolute inset-0" />
      <div className="absolute inset-0 grid place-items-center p-6">
        <div
          className="rounded-md bg-card shadow-soft ring-1 ring-border/60"
          style={{
            width: width * scale,
            height: height * scale,
            opacity: mounted ? 1 : 0,
            transition: 'opacity 240ms ease-out',
            overflow: 'hidden',
            contain: 'layout paint',
          }}
        >
          <div
            className="origin-top-left"
            style={{
              width: `${width}px`,
              height: `${height}px`,
              transform: `scale(${scale})`,
            }}
          >
            <PreviewErrorBoundary prototypeId={prototype.id}>
              <Suspense
                fallback={
                  <div
                    className="h-full w-full animate-pulse bg-muted/40"
                    aria-hidden
                  />
                }
              >
                <PrototypeComponent />
              </Suspense>
            </PreviewErrorBoundary>
          </div>
        </div>
      </div>
    </div>
  );
}

interface PreviewErrorBoundaryProps {
  prototypeId: string;
  children: ReactNode;
}

interface PreviewErrorBoundaryState {
  hasError: boolean;
}

class PreviewErrorBoundary extends Component<
  PreviewErrorBoundaryProps,
  PreviewErrorBoundaryState
> {
  state: PreviewErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): PreviewErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    if (typeof console !== 'undefined') {
      console.warn(
        `[gallery] failed to render preview for ${this.props.prototypeId}:`,
        error,
        info.componentStack
      );
    }
  }

  componentDidUpdate(prevProps: PreviewErrorBoundaryProps): void {
    if (prevProps.prototypeId !== this.props.prototypeId && this.state.hasError) {
      this.setState({ hasError: false });
    }
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="flex h-full w-full items-center justify-center bg-muted/40 text-[11px] font-medium text-muted-foreground">
          Preview unavailable
        </div>
      );
    }
    return this.props.children;
  }
}
