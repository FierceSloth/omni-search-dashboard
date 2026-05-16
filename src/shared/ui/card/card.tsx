import classNames from 'classnames';
import { type ReactNode, type SyntheticEvent } from 'react';

import styles from './card.module.scss';

interface IProps {
  className?: string;
  title: string;
  imageUrl?: string;
  description?: string;
  badge?: string;
  info?: string;
}

const FALLBACK_IMAGE = 'https://placehold.co/600x400/1a1a1a/aaaaaa?text=No+Image';

const handleImageError = (event: SyntheticEvent<HTMLImageElement>): void => {
  if (event.currentTarget.src !== FALLBACK_IMAGE) {
    event.currentTarget.src = FALLBACK_IMAGE;
  }
};

export function Card({ className, title, imageUrl, description, badge, info }: IProps): ReactNode {
  return (
    <div className={classNames(styles.gameCard, className)}>
      <div className={styles.imageWrapper}>
        <img className={styles.image} src={imageUrl || FALLBACK_IMAGE} alt={title} onError={handleImageError} />
      </div>

      <div className={styles.content}>
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
      </div>
    </div>
  );
}
