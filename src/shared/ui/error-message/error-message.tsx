import classNames from 'classnames';
import { type ReactNode } from 'react';

import { Button } from '@/shared/ui/button';
import RetryIcon from '@shared/assets/svg/retry-icon.svg?react';
import WarningIcon from '@shared/assets/svg/warning-icon.svg?react';

import styles from './error-message.module.scss';

interface IProps {
  title: string;
  description: string;
  className?: string;
  onRetry?: () => void;
}

const defaultOnRetry = (): void => {
  globalThis.location.reload();
};

export function ErrorMessage({ title, description, className, onRetry }: IProps): ReactNode {
  return (
    <div className={classNames(styles.container, className)}>
      <WarningIcon className={styles.icon} />
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>{description}</p>

      <Button onClick={onRetry ?? defaultOnRetry} className={styles.retryButton}>
        <RetryIcon className={styles.buttonIcon} />
        Retry Connection
      </Button>
    </div>
  );
}
