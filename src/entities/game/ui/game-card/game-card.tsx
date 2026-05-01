import { Component, type ReactNode, type SyntheticEvent } from 'react';

import styles from './game-card.module.scss';

const FALLBACK_IMAGE = 'https://placehold.co/600x400/1a1a1a/aaaaaa?text=No+Image';

interface IProps {
  title: string;
  imageUrl: string;
  genre: string;
  rating?: number;
  released?: string;
}

export class GameCard extends Component<IProps> {
  private handleImageError = (event: SyntheticEvent<HTMLImageElement>): void => {
    if (event.currentTarget.src !== FALLBACK_IMAGE) {
      event.currentTarget.src = FALLBACK_IMAGE;
    }
  };

  public render(): ReactNode {
    const { title, released, genre, imageUrl, rating } = this.props;

    let date = 'TBA';

    if (released) {
      date = new Date(released).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    }

    return (
      <div className={styles.gameCard} title={title}>
        <div className={styles.imageWrapper}>
          <img className={styles.image} src={imageUrl} alt={title} onError={this.handleImageError} />
        </div>

        <div className={styles.content}>
          <div className={styles.meta}>
            <div className={styles.genre}>{genre}</div>
            {rating && <div className={styles.rating}>{rating} ★</div>}
          </div>
          <div className={styles.title}>{title}</div>

          <p className={styles.date}>{date}</p>
        </div>
      </div>
    );
  }
}
