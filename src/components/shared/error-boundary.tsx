"use client";

import { Component, type ReactNode } from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-red-200 bg-red-50 px-6 py-12 text-center">
            <AlertTriangle className="mb-3 h-10 w-10 text-red-500" aria-hidden />
            <h3 className="text-lg font-semibold text-slate-900">Something went wrong</h3>
            <p className="mt-2 text-sm text-slate-600">
              We hit an unexpected error. Please try again.
            </p>
            <Button
              className="mt-4"
              variant="outline"
              onClick={() => this.setState({ hasError: false })}
            >
              Try again
            </Button>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
