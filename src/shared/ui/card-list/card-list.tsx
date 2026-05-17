import { Card } from '@/shared/ui/card/card';
import type { ReactNode } from 'react';
import styles from './card-list.module.scss';

interface IProps {
  className?: string;
  title: string;
  imageUrl?: string;
  description?: string;
  badge?: string;
  info?: string;
}

export function CardList({ className, imageUrl, title, description, badge, info }: IProps): ReactNode {
  return (
    <Card className={className} imageUrl={imageUrl}>
      <div className={styles.meta}>
        {badge && (
          <div className={styles.badge} data-testid="badge-container">
            {badge}
          </div>
        )}
        {info && (
          <div className={styles.info} data-testid="info-container">
            {info}
          </div>
        )}
      </div>
      <div className={styles.title}>{title}</div>

      {description && (
        <p className={styles.description} data-testid="description-container">
          {description}
        </p>
      )}
    </Card>
  );
}
