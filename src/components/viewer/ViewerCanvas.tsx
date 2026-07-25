import { useMemo, useRef, useState, Suspense } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import type { ReactZoomPanPinchRef } from 'react-zoom-pan-pinch';
import { ViewerToolbar, type FrameKind } from './ViewerToolbar';
import { DeviceFrame } from './DeviceFrame';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import { getComponent } from '@/registry';
import { cn } from '@/lib/utils';
import type { PrototypeMeta } from '@/types';

interface ViewerCanvasProps {
  prototype: PrototypeMeta;
  onBack: () => void;
}

export function ViewerCanvas({ prototype, onBack }: ViewerCanvasProps) {
  const Component = useMemo(() => getComponent(prototype), [prototype]);
  const transformRef = useRef<ReactZoomPanPinchRef | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [frame, setFrame] = useState<FrameKind>(() =>
    prototype.device === 'tablet' ? 'tablet' : prototype.device === 'desktop' ? 'desktop' : 'mobile'
  );
  const [background, setBackground] = useState<'dots' | 'solid' | 'transparent'>('dots');

  const [prevProtoId, setPrevProtoId] = useState(prototype.id);
  if (prototype.id !== prevProtoId) {
    setPrevProtoId(prototype.id);
    setFrame(prototype.device === 'tablet' ? 'tablet' : prototype.device === 'desktop' ? 'desktop' : 'mobile');
  }

  const backgroundClass = useMemo(() => {
    if (background === 'dots') return 'canvas-dotted';
    if (background === 'solid') return 'bg-muted';
    return 'bg-background';
  }, [background]);

  const center = () => {
    transformRef.current?.centerView();
  };

  return (
    <div className={cn('relative h-full w-full overflow-hidden', backgroundClass)}>
      <TransformWrapper
        ref={transformRef}
        initialScale={1}
        minScale={0.2}
        maxScale={3}
        centerOnInit
        wheel={{ step: 0.08 }}
        doubleClick={{ mode: 'reset' }}
        panning={{ velocityDisabled: false }}
        onTransformed={(ref) => setZoomLevel(ref.state.scale)}
      >
        {({ zoomIn, zoomOut, resetTransform }) => (
          <>
            <TransformComponent
              wrapperClass="!w-full !h-full"
              contentClass="!w-full !h-full flex items-center justify-center"
            >
              <div className="px-12 py-12">
                <ErrorBoundary key={prototype.id}>
                  <Suspense fallback={<div className="h-[400px] w-[400px] animate-pulse rounded-xl bg-muted" />}>
                    <DeviceFrame device={frame === 'browser' ? 'desktop' : (frame as 'mobile' | 'desktop' | 'tablet')}>
                      <Component />
                    </DeviceFrame>
                  </Suspense>
                </ErrorBoundary>
              </div>
            </TransformComponent>
            <ViewerToolbar
              zoomIn={() => zoomIn()}
              zoomOut={() => zoomOut()}
              resetTransform={() => resetTransform()}
              center={center}
              zoomLevel={zoomLevel}
              frame={frame}
              setFrame={setFrame}
              background={background}
              setBackground={setBackground}
              onBack={onBack}
              title={prototype.title}
              path={prototype.component}
            />
          </>
        )}
      </TransformWrapper>
    </div>
  );
}
