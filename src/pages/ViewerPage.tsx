import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { findPrototypeById } from '@/registry';
import { ViewerCanvas } from '@/components/viewer/ViewerCanvas';
import { MetaPanel } from '@/components/viewer/MetaPanel';
import { ArrowLeft } from 'lucide-react';

export function ViewerPage() {
  const params = useParams<{ id: string }>();
  const navigate = useNavigate();
  const prototype = params.id ? findPrototypeById(params.id) : undefined;
  const [panelOpen, setPanelOpen] = useState(false);

  const [prevParamId, setPrevParamId] = useState(params.id);
  if (params.id !== prevParamId) {
    setPrevParamId(params.id);
    setPanelOpen(false);
  }

  if (!prototype) {
    return (
      <div className="grid h-full place-items-center">
        <div className="flex max-w-sm flex-col items-center gap-3 text-center">
          <div className="grid h-12 w-12 place-items-center rounded-2xl border border-border bg-card shadow-soft">
            <ArrowLeft className="h-5 w-5 text-muted-foreground" />
          </div>
          <h2 className="text-display text-[20px] font-semibold tracking-tight">
            Prototype not found
          </h2>
          <p className="text-sm text-muted-foreground">
            The prototype you're looking for has moved or been removed.
          </p>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="mt-2 rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background shadow-soft transition hover:bg-foreground/90"
          >
            Back to gallery
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full">
      <div className="relative min-w-0 flex-1">
        <ViewerCanvas prototype={prototype} onBack={() => navigate('/')} />
      </div>
      <button
        type="button"
        onClick={() => setPanelOpen((v) => !v)}
        className="absolute right-4 top-20 z-40 grid h-8 w-8 place-items-center rounded-md border border-border/60 bg-background/90 text-muted-foreground shadow-soft backdrop-blur md:hidden"
        aria-label="Toggle info panel"
      >
        i
      </button>
      <div
        className={`hidden w-[320px] shrink-0 overflow-y-auto md:block ${
          panelOpen ? '!block' : ''
        }`}
      >
        <MetaPanel prototype={prototype} />
      </div>
    </div>
  );
}
