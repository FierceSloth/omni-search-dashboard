import classNames from 'classnames';
import type { InputHTMLAttributes, ReactNode } from 'react';

import styles from './checkbox.module.scss';

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export function Checkbox({ className, ...rest }: IProps): ReactNode {
  return <input {...rest} className={classNames(styles.checkbox, className)} type="checkbox" />;
}
