import type { ReactNode } from 'react';

import styles from './pagination.module.scss';

interface IPaginationProps {
  currentPage: number;
  totalPage: number;
  onPageChange: (page: number) => void;
}

interface IPaginationItemProps {
  children: ReactNode;
  isDisabled: boolean;
  onClick: () => void;
}

const formatCounter = (current: number, total: number): string => {
  const padLength = String(total).length;
  const paddedCurrent = String(current).padStart(padLength, '0');

  return `${paddedCurrent} / ${total}`;
};

export function PaginationItem({ isDisabled, onClick, children }: IPaginationItemProps): ReactNode {
  return (
    <li>
      <button className={styles.button} disabled={isDisabled} onClick={onClick}>
        {children}
      </button>
    </li>
  );
}

export function Pagination({ currentPage, totalPage, onPageChange }: IPaginationProps): ReactNode {
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
