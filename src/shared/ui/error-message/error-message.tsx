import { Button } from '@/shared/ui/button';
import retryIcon from '@shared/assets/svg/retry-icon.svg?raw';
import warningIcon from '@shared/assets/svg/warning-icon.svg?raw';
import classNames from 'classnames';
import { type ReactNode } from 'react';
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
      <div className={styles.icon} dangerouslySetInnerHTML={{ __html: warningIcon }} />
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>{description}</p>

      <Button onClick={onRetry ?? defaultOnRetry} className={styles.retryButton}>
        <span className={styles.buttonIcon} dangerouslySetInnerHTML={{ __html: retryIcon }} />
        Retry Connection
      </Button>
    </div>
  );
}
