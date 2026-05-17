import { Card } from '@/shared/ui/card/card';
import type { ReactNode } from 'react';

import styles from './card-detail.module.scss';

interface IProps {
  className?: string;
  title: string;
  imageUrl?: string;
  description?: string;
  subtitle?: string;
  metadata?: string[];
  tags?: string[];
  actionUrl?: string;
  actionLabel?: string;
  onClose: () => void;
}

export function CardDetail({
  className,
  imageUrl,
  title,
  description,
  subtitle,
  metadata,
  tags,
  actionUrl,
  actionLabel = 'Official Website',
  onClose,
}: IProps): ReactNode {
  return (
    <Card className={className} imageUrl={imageUrl}>
      <button className={styles.closeButton} onClick={onClose} type="button" aria-label="Close details">
        ✕
      </button>

      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
      </div>

      {metadata && metadata.length > 0 && (
        <div className={styles.meta}>
          {metadata.map((item) => (
            <span key={item} className={styles.metaItem}>
              {item}
            </span>
          ))}
        </div>
      )}

      {tags && tags.length > 0 && (
        <div className={styles.tags}>
          {tags.map((tag) => (
            <span key={tag} className={styles.tagBadge}>
              {tag}
            </span>
          ))}
        </div>
      )}

      {description && (
        <div className={styles.scrollableContent}>
          <p className={styles.description}>{description}</p>
        </div>
      )}

      {actionUrl && (
        <a href={actionUrl} target="_blank" rel="noreferrer" className={styles.actionLink}>
          {actionLabel}
        </a>
      )}
    </Card>
  );
}
