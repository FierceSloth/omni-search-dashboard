import { Card } from '@/shared/ui/card/card';
import type { ReactNode } from 'react';

import { Tag } from '@/shared/ui/tag';
import classNames from 'classnames';
import { Link } from '@/shared/config/i18n/navigation';
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
  closeHref: string;
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
  closeHref,
}: IProps): ReactNode {
  return (
    <Card className={classNames(className, styles.card)} imageUrl={imageUrl}>
      <Link className={styles.closeButton} href={closeHref} scroll={false} aria-label="Close details">
        ✕
      </Link>

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
            <Tag key={tag}>{tag}</Tag>
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
