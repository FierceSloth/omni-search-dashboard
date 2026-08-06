import classNames from 'classnames';
import type { ReactNode } from 'react';

import styles from './tag.module.scss';

interface IProps {
  className?: string;
  children: ReactNode;
}

export function Tag({ className, children }: IProps): ReactNode {
  return <span className={classNames(className, styles.tag)}>{children}</span>;
}
