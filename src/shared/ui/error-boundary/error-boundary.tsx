import { ErrorMessage } from '@/shared/ui/error-message';
import { Component, type ErrorInfo, type ReactNode } from 'react';

interface IProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface IState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<IProps, IState> {
  public state: IState = {
    hasError: false,
  };

  public static getDerivedStateFromError(): IState {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Caught an error in ErrorBoundary:', error, errorInfo);
  }

  public render(): ReactNode {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <ErrorMessage
            title="Something went wrong"
            description="The application encountered a critical error in this section. Please refresh the page to continue."
          />
        )
      );
    }

    return this.props.children;
  }
}
