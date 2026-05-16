import { PaginationItem } from '@/shared/ui/pagination/pagination-item/pagination-item';
import { formatCounter } from '@/shared/utils/format-counter';
import type { ReactNode } from 'react';

import styles from './pagination.module.scss';

interface IProps {
  currentPage: number;
  totalPage: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPage, onPageChange }: IProps): ReactNode {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPage;

  const onFirstPage = (): void => {
    onPageChange(1);
  };
  const onPreviousPage = (): void => {
    onPageChange(currentPage - 1);
  };

  const onNextPage = (): void => {
    onPageChange(currentPage + 1);
  };
  const onLastPage = (): void => {
    onPageChange(totalPage);
  };

  return (
    <nav className={styles.container}>
      <ul className={styles.list}>
        <PaginationItem isDisabled={isFirstPage} onClick={onFirstPage}>
          {'<<'}
        </PaginationItem>

        <PaginationItem isDisabled={isFirstPage} onClick={onPreviousPage}>
          {'<'}
        </PaginationItem>

        <li>
          <p className={styles.counter}>{formatCounter(currentPage, totalPage)}</p>
        </li>

        <PaginationItem isDisabled={isLastPage} onClick={onNextPage}>
          {'>'}
        </PaginationItem>

        <PaginationItem isDisabled={isLastPage} onClick={onLastPage}>
          {'>>'}
        </PaginationItem>
      </ul>
    </nav>
  );
}
