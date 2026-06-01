import * as themeContext from '@/shared/lib/context/theme';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ThemeSwitcher } from './theme-switcher';
import type { JSX } from 'react';

vi.mock('@shared/assets/svg/moon-icon.svg?react', () => ({
  default: (): JSX.Element => <svg data-testid="moon-icon" />,
}));
vi.mock('@shared/assets/svg/sun-icon.svg?react', () => ({
  default: (): JSX.Element => <svg data-testid="sun-icon" />,
}));

describe('ThemeSwitcher', () => {
  const toggleThemeMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render sun icon when theme is light', () => {
    vi.spyOn(themeContext, 'useTheme').mockReturnValue({ theme: 'light', toggleTheme: toggleThemeMock });
    render(<ThemeSwitcher />);

    expect(screen.getByTestId('sun-icon')).toBeInTheDocument();
  });

  it('should render moon icon and call toggle function on click when theme is dark', async () => {
    vi.spyOn(themeContext, 'useTheme').mockReturnValue({ theme: 'dark', toggleTheme: toggleThemeMock });
    const user = userEvent.setup();

    render(<ThemeSwitcher />);

    const button = screen.getByRole('button', { name: /toggle theme/i });
    expect(screen.getByTestId('moon-icon')).toBeInTheDocument();

    await user.click(button);
    expect(toggleThemeMock).toHaveBeenCalledOnce();
  });
});
