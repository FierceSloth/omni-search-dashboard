import { render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, it, vi, type Mock } from 'vitest';

import { ErrorTrigger } from '../error-trigger';
import { ErrorBoundary } from './error-boundary';

describe('ErrorBoundary Component', () => {
  let consoleSpy: Mock;

  beforeEach(() => {
    consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it('should render children when there is no error', () => {
    render(
      <ErrorBoundary>
        <div>Everything is fine</div>
        <ErrorTrigger shouldThrow={false} />
      </ErrorBoundary>
    );

    expect(screen.getByText('Everything is fine')).toBeInTheDocument();
  });

  it('should catch error and render default ErrorMessage', () => {
    render(
      <ErrorBoundary>
        <ErrorTrigger shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(consoleSpy).toHaveBeenCalled();
  });

  it('should catch error and render custom fallback', () => {
    const customFallback = <div data-testid="custom-fallback">Custom Error Screen</div>;

    render(
      <ErrorBoundary fallback={customFallback}>
        <ErrorTrigger shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByTestId('custom-fallback')).toBeInTheDocument();
    expect(screen.queryByText('Something went wrong')).not.toBeInTheDocument();
  });
});
