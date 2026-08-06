import classNames from 'classnames';
import { type ButtonHTMLAttributes, type ReactNode } from 'react';

import styles from './button.module.scss';

export type ButtonVariant = 'default' | 'primary' | 'ghost';

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
}

export function Button({ children, className, variant = 'default', ...rest }: IProps): ReactNode {
  return (
    <button className={classNames(styles.button, styles[variant], className)} {...rest}>
      {children}
    </button>
  );
}
