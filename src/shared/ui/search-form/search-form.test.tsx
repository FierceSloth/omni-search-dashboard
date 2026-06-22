import { screen } from '@testing-library/react';
import { renderWithProviders as render } from '@/shared/lib/test-utils/render-with-providers';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { SearchForm } from './search-form';

describe('SearchForm Component', () => {
  it('should render input and default icon button', () => {
    render(<SearchForm />);

    const inputElement = screen.getByRole('textbox');
    const buttonElement = screen.getByRole('button', { name: /submit search/i });

    expect(inputElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
  });

  it('should not render submit button when withIcon is false', () => {
    render(<SearchForm withIcon={false} />);

    const buttonElement = screen.queryByRole('button', { name: /submit search/i });
    expect(buttonElement).not.toBeInTheDocument();
  });

  it('should initialize with defaultValue and pass native attributes', () => {
    render(<SearchForm defaultValue="Elden Ring" readOnly />);

    const inputElement = screen.getByRole('textbox');

    expect(inputElement).toHaveValue('Elden Ring');
    expect(inputElement).toHaveAttribute('readonly');
  });

  it('should update local value when user types in the input', async () => {
    const user = userEvent.setup();
    render(<SearchForm />);

    const inputElement = screen.getByRole('textbox');
    await user.type(inputElement, 'GTA V');

    expect(inputElement).toHaveValue('GTA V');
  });
});
