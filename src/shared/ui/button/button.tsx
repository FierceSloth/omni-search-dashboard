import classNames from 'classnames';
import { type ButtonHTMLAttributes, type ReactNode } from 'react';

import styles from './button.module.scss';

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export function Button({ children, className, ...rest }: IProps): ReactNode {
  return (
    <button className={classNames(styles.button, className)} {...rest}>
      {children}
    </button>
  );
}
