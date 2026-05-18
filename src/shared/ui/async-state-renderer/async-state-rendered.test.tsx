import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { AsyncStateRenderer } from './async-state-renderer';

describe('AsyncStateRenderer Component', () => {
  const childTestId = 'content-child';
  const childText = 'Main Content Loaded';
  const mockChildren = <div data-testid={childTestId}>{childText}</div>;

  it('should render Loader when isLoading is true', () => {
    const customLoadingText = 'Fetching games...';

    render(
      <AsyncStateRenderer isLoading={true} error={null} loadingText={customLoadingText}>
        {mockChildren}
      </AsyncStateRenderer>
    );

    const loader = screen.getByTestId('loader');
    expect(loader).toBeInTheDocument();

    expect(screen.getByText(customLoadingText)).toBeInTheDocument();

    expect(screen.queryByTestId(childTestId)).not.toBeInTheDocument();
  });

  it('should render ErrorMessage when error prop is provided', () => {
    const mockErrorMessage = 'Failed to fetch data from RAWG API';
    const errorTitle = 'Connection Lost';

    render(
      <AsyncStateRenderer isLoading={false} error={mockErrorMessage}>
        {mockChildren}
      </AsyncStateRenderer>
    );

    expect(screen.getByText(errorTitle)).toBeInTheDocument();
    expect(screen.getByText(mockErrorMessage)).toBeInTheDocument();
    expect(screen.queryByTestId(childTestId)).not.toBeInTheDocument();
  });

  it('should render emptyNode when isEmpty is true and emptyNode is provided', () => {
    const emptyTestId = 'empty-state';
    const emptyMessage = 'No games found for this query';
    const mockEmptyNode = <div data-testid={emptyTestId}>{emptyMessage}</div>;

    render(
      <AsyncStateRenderer isLoading={false} error={null} isEmpty={true} emptyNode={mockEmptyNode}>
        {mockChildren}
      </AsyncStateRenderer>
    );

    expect(screen.getByTestId(emptyTestId)).toBeInTheDocument();
    expect(screen.getByText(emptyMessage)).toBeInTheDocument();
    expect(screen.queryByTestId(childTestId)).not.toBeInTheDocument();
  });

  it('should fall back to children if isEmpty is true but emptyNode is not provided', () => {
    render(
      <AsyncStateRenderer isLoading={false} error={null} isEmpty={true} emptyNode={null}>
        {mockChildren}
      </AsyncStateRenderer>
    );

    expect(screen.getByTestId(childTestId)).toBeInTheDocument();
    expect(screen.getByText(childText)).toBeInTheDocument();
  });

  it('should render children when isLoading is false, error is null, and not empty', () => {
    render(
      <AsyncStateRenderer isLoading={false} error={null}>
        {mockChildren}
      </AsyncStateRenderer>
    );

    expect(screen.getByTestId(childTestId)).toBeInTheDocument();
    expect(screen.getByText(childText)).toBeInTheDocument();
  });
});
