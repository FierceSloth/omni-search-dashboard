'use client';

import { PaginationItem } from '@/shared/ui/pagination/pagination-item/pagination-item';
import { formatCounter } from '@/shared/utils/format-counter.util';
import { useSearchParams } from 'next/navigation';
import type { ReactNode } from 'react';

import { usePathname } from '@/shared/config/i18n/navigation';
import styles from './pagination.module.scss';

interface IProps {
  currentPage: number;
  totalPage: number;
}

export function Pagination({ currentPage, totalPage }: IProps): ReactNode {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createPageURL = (pageNumber: number): string => {
    const params = new URLSearchParams(searchParams?.toString());
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPage;

  return (
    <nav className={styles.container}>
      <ul className={styles.list}>
        <PaginationItem isDisabled={isFirstPage} href={createPageURL(1)}>
          {'<<'}
        </PaginationItem>

        <PaginationItem isDisabled={isFirstPage} href={createPageURL(currentPage - 1)}>
          {'<'}
        </PaginationItem>

        <li>
          <p className={styles.counter}>{formatCounter(currentPage, totalPage)}</p>
        </li>

        <PaginationItem isDisabled={isLastPage} href={createPageURL(currentPage + 1)}>
          {'>'}
        </PaginationItem>

        <PaginationItem isDisabled={isLastPage} href={createPageURL(totalPage)}>
          {'>>'}
        </PaginationItem>
      </ul>
    </nav>
  );
}
