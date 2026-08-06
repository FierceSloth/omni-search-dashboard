import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { IconButton } from './icon-button';
import type { JSX } from 'react';

const MockIcon = (): JSX.Element => <svg data-testid="mock-icon" />;

describe('IconButton', () => {
  it('should render button with icon', () => {
    render(<IconButton icon={MockIcon} aria-label="Test Button" />);

    expect(screen.getByRole('button', { name: 'Test Button' })).toBeInTheDocument();
    expect(screen.getByTestId('mock-icon')).toBeInTheDocument();
  });

  it('should call onClick when clicked', async () => {
    const onClickMock = vi.fn();
    const user = userEvent.setup();

    render(<IconButton icon={MockIcon} onClick={onClickMock} aria-label="Click Me" />);

    const button = screen.getByRole('button', { name: 'Click Me' });
    await user.click(button);

    expect(onClickMock).toHaveBeenCalledOnce();
  });
});
