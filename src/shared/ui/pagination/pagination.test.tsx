import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { formatCounter } from '@/shared/utils/format-counter.util';
import { Pagination } from './pagination';

describe('Pagination Component', () => {
  const defaultTotalPages = 10;

  it('should render the correct page counter using formatCounter utility', () => {
    const currentPage = 5;
    const expectedText = formatCounter(currentPage, defaultTotalPages);

    render(<Pagination currentPage={currentPage} totalPage={defaultTotalPages} onPageChange={vi.fn()} />);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

  it('should disable "first" and "previous" buttons on the first page', () => {
    const currentPage = 1;

    render(<Pagination currentPage={currentPage} totalPage={defaultTotalPages} onPageChange={vi.fn()} />);

    const firstPageButton = screen.getByRole('button', { name: '<<' });
    const previousPageButton = screen.getByRole('button', { name: '<' });
    const nextPageButton = screen.getByRole('button', { name: '>' });

    expect(firstPageButton).toBeDisabled();
    expect(previousPageButton).toBeDisabled();
    expect(nextPageButton).not.toBeDisabled();
  });

  it('should disable "next" and "last" buttons on the last page', () => {
    const currentPage = defaultTotalPages;

    render(<Pagination currentPage={currentPage} totalPage={defaultTotalPages} onPageChange={vi.fn()} />);

    const nextPageButton = screen.getByRole('button', { name: '>' });
    const lastPageButton = screen.getByRole('button', { name: '>>' });

    expect(nextPageButton).toBeDisabled();
    expect(lastPageButton).toBeDisabled();
  });

  it('should call onPageChange with correct values when buttons are clicked', async () => {
    const user = userEvent.setup();
    const mockOnPageChange = vi.fn();
    const currentPage = 5;

    render(<Pagination currentPage={currentPage} totalPage={defaultTotalPages} onPageChange={mockOnPageChange} />);

    const firstPageButton = screen.getByRole('button', { name: '<<' });
    const previousPageButton = screen.getByRole('button', { name: '<' });
    const nextPageButton = screen.getByRole('button', { name: '>' });
    const lastPageButton = screen.getByRole('button', { name: '>>' });

    await user.click(nextPageButton);
    expect(mockOnPageChange).toHaveBeenLastCalledWith(currentPage + 1);

    await user.click(previousPageButton);
    expect(mockOnPageChange).toHaveBeenLastCalledWith(currentPage - 1);

    await user.click(firstPageButton);
    expect(mockOnPageChange).toHaveBeenLastCalledWith(1);

    await user.click(lastPageButton);
    expect(mockOnPageChange).toHaveBeenLastCalledWith(defaultTotalPages);

    expect(mockOnPageChange).toHaveBeenCalledTimes(4);
  });
});
