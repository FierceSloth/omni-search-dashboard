import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import userEvent from '@testing-library/user-event';
import { ErrorMessage } from './error-message';

describe('ErrorMessage Component', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('should render title and description correctly', () => {
    render(<ErrorMessage title="Test Error" description="Server is dead" />);

    const titleElement = screen.getByRole('heading', { name: /test error/i });
    const descElement = screen.getByText('Server is dead');

    expect(titleElement).toBeInTheDocument();
    expect(descElement).toBeInTheDocument();
  });

  it('should call custom onRetry handler when button is clicked', async () => {
    const onRetryMock = vi.fn();
    const user = userEvent.setup();

    render(<ErrorMessage title="Error" description="Something went wrong" onRetry={onRetryMock} />);
    const buttonElement = screen.getByRole('button', { name: /retry connection/i });

    expect(buttonElement).toBeInTheDocument();

    await user.click(buttonElement);

    expect(onRetryMock).toHaveBeenCalledOnce();
  });

  it('should call default onRetry handler when button is clicked', async () => {
    const reloadMock = vi.fn();
    vi.stubGlobal('location', { reload: reloadMock });

    const user = userEvent.setup();

    render(<ErrorMessage title="Error" description="Something went wrong" />);
    const buttonElement = screen.getByRole('button', { name: /retry connection/i });

    await user.click(buttonElement);

    expect(reloadMock).toHaveBeenCalledOnce();
  });
});
