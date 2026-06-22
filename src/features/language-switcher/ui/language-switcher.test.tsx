import { renderWithProviders } from '@/shared/lib/test-utils/render-with-providers';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { JSX } from 'react';
import type { Mock } from 'vitest';
import { describe, expect, it, vi } from 'vitest';
import { LanguageSwitcher } from './language-switcher';

vi.mock('@shared/assets/svg/language-icon.svg?react', () => ({
  default: (): JSX.Element => <svg data-testid="language-icon" />,
}));

const mockReplace = vi.fn();
vi.mock('@/shared/config/i18n/navigation', () => ({
  useRouter: (): {
    replace: Mock;
  } => ({ replace: mockReplace }),
  usePathname: (): string => '/mock-path',
}));

describe('LanguageSwitcher', () => {
  it('should render button with language icon', () => {
    renderWithProviders(<LanguageSwitcher />);

    expect(screen.getByRole('button', { name: /toggle language/i })).toBeInTheDocument();
    expect(screen.getByTestId('language-icon')).toBeInTheDocument();
  });

  it('should toggle language on click', async () => {
    const user = userEvent.setup();
    renderWithProviders(<LanguageSwitcher />);

    const button = screen.getByRole('button', { name: /toggle language/i });

    await user.click(button);
    expect(mockReplace).toHaveBeenCalled();
  });
});
