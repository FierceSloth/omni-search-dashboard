import { render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import userEvent from '@testing-library/user-event';
import { ErrorMessage } from './error-message';

describe('ErrorMessage Component', () => {
  const defaultProps = {
    title: 'Test Error',
    description: 'Server is dead',
  };

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('should render title and description correctly', () => {
    render(<ErrorMessage {...defaultProps} />);

    const titleElement = screen.getByText(defaultProps.title);
    const descElement = screen.getByText(defaultProps.description);

    expect(titleElement).toBeInTheDocument();
    expect(descElement).toBeInTheDocument();
  });

  it('should call custom onRetry handler when button is clicked', async () => {
    const onRetryMock = vi.fn();
    const user = userEvent.setup();

    render(<ErrorMessage {...defaultProps} onRetry={onRetryMock} />);
    const buttonElement = screen.getByRole('button', { name: /retry connection/i });

    await user.click(buttonElement);

    expect(onRetryMock).toHaveBeenCalledOnce();
  });

  it('should call default onRetry handler when button is clicked', async () => {
    const reloadMock = vi.fn();
    vi.stubGlobal('location', { reload: reloadMock });

    const user = userEvent.setup();

    render(<ErrorMessage {...defaultProps} />);
    const buttonElement = screen.getByRole('button', { name: /retry connection/i });

    await user.click(buttonElement);

    expect(reloadMock).toHaveBeenCalledOnce();
  });
});
