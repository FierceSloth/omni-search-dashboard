import classNames from 'classnames';
import { Component, type ReactNode, type SyntheticEvent } from 'react';

import { formatDate } from '@/shared/utils/format-date.util';
import styles from './game-card.module.scss';

const FALLBACK_IMAGE = 'https://placehold.co/600x400/1a1a1a/aaaaaa?text=No+Image';

interface IProps {
  className?: string;
  title: string;
  imageUrl: string;
  genre: string;
  rating?: number;
  released?: string;
}

export class GameCard extends Component<IProps> {
  private handleImageError = (event: SyntheticEvent<HTMLImageElement>): void => {
    if (event.currentTarget.src !== FALLBACK_IMAGE || !event.currentTarget.src) {
      event.currentTarget.src = FALLBACK_IMAGE;
    }
  };

  public render(): ReactNode {
    const { className, title, released, genre, imageUrl, rating } = this.props;

    return (
      <div className={classNames(styles.gameCard, className)}>
        <div className={styles.imageWrapper}>
          <img className={styles.image} src={imageUrl ?? FALLBACK_IMAGE} alt={title} onError={this.handleImageError} />
        </div>

        <div className={styles.content}>
          <div className={styles.meta}>
            <div className={styles.genre}>{genre}</div>
            {typeof rating === 'number' && <div className={styles.rating}>{rating} ★</div>}
          </div>
          <div className={styles.title}>{title}</div>

          <p className={styles.date}>{formatDate(released) ?? 'TBA'}</p>
        </div>
      </div>
    );
  }
}
