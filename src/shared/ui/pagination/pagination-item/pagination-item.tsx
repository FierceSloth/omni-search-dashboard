import Link from 'next/link';
import type { ReactNode } from 'react';
import styles from './pagination-item.module.scss';

interface IProps {
  children: ReactNode;
  isDisabled?: boolean;
  href?: string;
}

export function PaginationItem({ isDisabled, href, children }: IProps): ReactNode {
  if (isDisabled || !href) {
    return (
      <li>
        <button className={styles.button} disabled>
          {children}
        </button>
      </li>
    );
  }

  return (
    <li>
      <Link href={href} scroll={false} className={styles.button}>
        {children}
      </Link>
    </li>
  );
}
