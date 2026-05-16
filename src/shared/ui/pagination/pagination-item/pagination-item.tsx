import type { ReactNode } from 'react';

import styles from './pagination-item.module.scss';

interface IProps {
  children: ReactNode;
  isDisabled: boolean;
  onClick: () => void;
}

export function PaginationItem({ isDisabled, onClick, children }: IProps): ReactNode {
  return (
    <li>
      <button className={styles.button} disabled={isDisabled} onClick={onClick}>
        {children}
      </button>
    </li>
  );
}
