import type { IThemeContext, Theme } from '@/shared/lib/context/theme';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ThemeButton } from './theme-button';

vi.mock('@shared/assets/svg/moon-icon.svg?raw', () => ({ default: 'moon-svg-content' }));
vi.mock('@shared/assets/svg/sun-icon.svg?raw', () => ({ default: 'sun-svg-content' }));

const mockToggleTheme = vi.fn();
let mockCurrentTheme: Theme = 'light';

vi.mock('@/shared/lib/context/theme', () => ({
  useTheme: (): IThemeContext => ({
    theme: mockCurrentTheme,
    toggleTheme: mockToggleTheme,
  }),
}));

describe('ThemeButton Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockCurrentTheme = 'light';
  });

  it('should render button with sun icon when theme is light', () => {
    render(<ThemeButton />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();

    expect(button).toHaveTextContent('sun-svg-content');
  });

  it('should render button with moon icon when theme is dark', () => {
    mockCurrentTheme = 'dark';

    render(<ThemeButton />);

    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('moon-svg-content');
  });

  it('should call toggleTheme handler when button is clicked', async () => {
    const user = userEvent.setup();
    render(<ThemeButton />);

    const button = screen.getByRole('button');
    await user.click(button);

    expect(mockToggleTheme).toHaveBeenCalledOnce();
  });
});
