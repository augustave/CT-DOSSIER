import React, { Component, ReactNode } from 'react';
import { AlertCircleIcon, RefreshCwIcon } from './icons';

interface Props {
  children: ReactNode;
  fallbackMessage?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 border border-red-500/30 bg-red-50/50">
          <div className="flex items-center gap-2 text-red-600 mb-3">
            <AlertCircleIcon className="w-5 h-5" />
            <span className="font-mono text-sm uppercase tracking-widest font-bold">
              {this.props.fallbackMessage || 'Component failed to load'}
            </span>
          </div>
          <p className="font-sans text-sm text-red-700/80 mb-4">
            {this.state.error?.message || 'An unexpected error occurred.'}
          </p>
          <button
            onClick={this.handleRetry}
            className="flex items-center gap-2 px-4 py-2 border border-red-500/50 text-red-600 font-mono text-xs uppercase tracking-widest hover:bg-red-100 transition-colors"
          >
            <RefreshCwIcon className="w-4 h-4" />
            Retry
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
