import { Component, type ErrorInfo, type ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('[ErrorBoundary] Prototype rendering failed:', error, errorInfo);
  }

  public render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex h-full min-h-[300px] w-full flex-col items-center justify-center rounded-xl border border-destructive/30 bg-destructive/5 p-6 text-center shadow-soft">
          <div className="grid h-10 w-10 place-items-center rounded-full bg-destructive/10 text-destructive">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <h3 className="mt-3 text-base font-semibold text-foreground">Prototype Render Error</h3>
          <p className="mt-1 max-w-sm font-mono text-xs text-muted-foreground">
            {this.state.error?.message || 'An unexpected error occurred while loading this prototype component.'}
          </p>
          <button
            type="button"
            onClick={() => this.setState({ hasError: false, error: null })}
            className="mt-4 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium transition hover:bg-secondary"
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
