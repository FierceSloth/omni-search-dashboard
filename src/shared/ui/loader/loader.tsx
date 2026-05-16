import classNames from 'classnames';
import { type ReactNode } from 'react';

import styles from './loader.module.scss';

interface IProps {
  className?: string;
  text?: string;
  dataTestId?: string;
}

export function Loader({ className, text, dataTestId }: IProps): ReactNode {
  return (
    <div className={classNames(styles.loaderContainer, className)} data-testid={dataTestId}>
      <div className={styles.spinner} />
      {text && <div className={styles.text}>{text}</div>}
    </div>
  );
}
