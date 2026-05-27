import classNames from 'classnames';
import { type ButtonHTMLAttributes, type ReactNode } from 'react';

import styles from './icon-button.module.scss';

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className: string;
  children: ReactNode;
}

export function IconButton({ children, className, ...rest }: IProps): ReactNode {
  return (
    <button className={classNames(styles.iconButton, className)} {...rest}>
      <div className={styles.iconWrapper}>{children}</div>
    </button>
  );
}
