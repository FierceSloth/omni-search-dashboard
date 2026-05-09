import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, vi } from 'vitest';
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

  it('should pass native input attributes correctly', () => {
    render(<SearchForm value="Elden Ring" readOnly />);

    const inputElement = screen.getByRole('textbox');

    expect(inputElement).toHaveValue('Elden Ring');
    expect(inputElement).toHaveAttribute('readonly');
  });

  it('should call onSubmit handler when form is submitted', async () => {
    const onSubmitMock = vi.fn();
    const user = userEvent.setup();

    render(<SearchForm onSubmit={onSubmitMock} />);
    const buttonElement = screen.getByRole('button', { name: /submit search/i });

    await user.click(buttonElement);

    expect(onSubmitMock).toHaveBeenCalledOnce();
  });
});
