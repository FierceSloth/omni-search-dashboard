import { renderWithProviders } from '@/shared/lib/test-utils/render-with-providers';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { JSX } from 'react';
import type { Mock } from 'vitest';
import { describe, expect, it, vi } from 'vitest';
import { RefreshButton } from './refresh-button';

vi.mock('@shared/assets/svg/refresh-icon.svg?react', () => ({
  default: (): JSX.Element => <svg data-testid="refresh-icon" />,
}));

vi.mock('next/navigation', () => ({
  useRouter: (): { refresh: Mock } => ({ refresh: vi.fn() }),
}));

describe('RefreshButton', () => {
  it('should render button with refresh icon', () => {
    renderWithProviders(<RefreshButton />);

    expect(screen.getByRole('button', { name: /refresh data/i })).toBeInTheDocument();
    expect(screen.getByTestId('refresh-icon')).toBeInTheDocument();
  });

  it('should not crash on click', async () => {
    const user = userEvent.setup();
    renderWithProviders(<RefreshButton />);

    const button = screen.getByRole('button', { name: /refresh data/i });

    await user.click(button);
    expect(button).toBeInTheDocument();
  });
});
