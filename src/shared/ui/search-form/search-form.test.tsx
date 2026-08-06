import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { SearchForm } from './search-form';

describe('SearchForm Component', () => {
  const mockOnSearch = vi.fn();

  it('should render input and default icon button', () => {
    render(<SearchForm onSearch={mockOnSearch} />);

    const inputElement = screen.getByRole('textbox');
    const buttonElement = screen.getByRole('button', { name: /submit search/i });

    expect(inputElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
  });

  it('should not render submit button when withIcon is false', () => {
    render(<SearchForm onSearch={mockOnSearch} withIcon={false} />);

    const buttonElement = screen.queryByRole('button', { name: /submit search/i });
    expect(buttonElement).not.toBeInTheDocument();
  });

  it('should initialize with defaultValue and pass native attributes', () => {
    render(<SearchForm onSearch={mockOnSearch} defaultValue="Elden Ring" readOnly />);

    const inputElement = screen.getByRole('textbox');

    expect(inputElement).toHaveValue('Elden Ring');
    expect(inputElement).toHaveAttribute('readonly');
  });

  it('should call onSearch handler with trimmed value when form is submitted', async () => {
    const user = userEvent.setup();
    render(<SearchForm onSearch={mockOnSearch} />);

    const inputElement = screen.getByRole('textbox');
    const buttonElement = screen.getByRole('button', { name: /submit search/i });

    await user.type(inputElement, '   GTA V   ');

    await user.click(buttonElement);

    expect(mockOnSearch).toHaveBeenCalledOnce();
    expect(mockOnSearch).toHaveBeenCalledWith('GTA V');
  });
});
