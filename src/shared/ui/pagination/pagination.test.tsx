import { screen } from '@testing-library/react';
import { renderWithProviders as render } from '@/shared/lib/test-utils/render-with-providers';
import { describe, expect, it } from 'vitest';

import { formatCounter } from '@/shared/utils/format-counter.util';
import { Pagination } from './pagination';

describe('Pagination Component', () => {
  const defaultTotalPages = 10;

  it('should render the correct page counter using formatCounter utility', () => {
    const currentPage = 5;
    const expectedText = formatCounter(currentPage, defaultTotalPages);

    render(<Pagination currentPage={currentPage} totalPage={defaultTotalPages} />);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

  it('should disable "first" and "previous" buttons on the first page', () => {
    const currentPage = 1;

    render(<Pagination currentPage={currentPage} totalPage={defaultTotalPages} />);

    const firstPageButton = screen.getByRole('button', { name: '<<' });
    const previousPageButton = screen.getByRole('button', { name: '<' });
    const nextPageLink = screen.getByRole('link', { name: '>' });
    const lastPageLink = screen.getByRole('link', { name: '>>' });

    expect(firstPageButton).toBeDisabled();
    expect(previousPageButton).toBeDisabled();
    expect(nextPageLink).toHaveAttribute('href', '?page=2');
    expect(lastPageLink).toHaveAttribute('href', '?page=10');
  });

  it('should disable "next" and "last" buttons on the last page', () => {
    const currentPage = defaultTotalPages;

    render(<Pagination currentPage={currentPage} totalPage={defaultTotalPages} />);

    const nextPageButton = screen.getByRole('button', { name: '>' });
    const lastPageButton = screen.getByRole('button', { name: '>>' });
    const firstPageLink = screen.getByRole('link', { name: '<<' });
    const previousPageLink = screen.getByRole('link', { name: '<' });

    expect(nextPageButton).toBeDisabled();
    expect(lastPageButton).toBeDisabled();
    expect(firstPageLink).toHaveAttribute('href', '?page=1');
    expect(previousPageLink).toHaveAttribute('href', '?page=9');
  });

  it('should render links with correct href for intermediate pages', () => {
    const currentPage = 5;

    render(<Pagination currentPage={currentPage} totalPage={defaultTotalPages} />);

    const firstPageLink = screen.getByRole('link', { name: '<<' });
    const previousPageLink = screen.getByRole('link', { name: '<' });
    const nextPageLink = screen.getByRole('link', { name: '>' });
    const lastPageLink = screen.getByRole('link', { name: '>>' });

    expect(firstPageLink).toHaveAttribute('href', '?page=1');
    expect(previousPageLink).toHaveAttribute('href', '?page=4');
    expect(nextPageLink).toHaveAttribute('href', '?page=6');
    expect(lastPageLink).toHaveAttribute('href', '?page=10');
  });
});
