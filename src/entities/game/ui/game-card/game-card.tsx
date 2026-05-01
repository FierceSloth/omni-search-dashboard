import { Component, type ReactNode } from 'react';

import styles from './game-card.module.scss';

interface IProps {
  title: string;
  imageUrl: string;
  genre: string;
  rating?: number;
  released?: string;
}

export class GameCard extends Component<IProps> {
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
          <img className={styles.image} src={imageUrl} alt={title} />
        </div>

        <div className={styles.content}>
          <div className={styles.meta}>
            <div className={styles.genre}>{genre}</div>
            {rating && <div className={styles.rating}>{rating} ★</div>}
          </div>
          <h3 className={styles.title}>{title}</h3>

          <p className={styles.date}>{date}</p>
        </div>
      </div>
    );
  }
}
