import classNames from 'classnames';
import { Component, type ReactNode, type SyntheticEvent } from 'react';

import styles from './card.module.scss';

const FALLBACK_IMAGE = 'https://placehold.co/600x400/1a1a1a/aaaaaa?text=No+Image';

interface IProps {
  className?: string;
  title: string;
  imageUrl?: string;
  description?: string;
  badge?: string;
  info?: string;
}

export class Card extends Component<IProps> {
  private handleImageError = (event: SyntheticEvent<HTMLImageElement>): void => {
    if (event.currentTarget.src !== FALLBACK_IMAGE || !event.currentTarget.src) {
      event.currentTarget.src = FALLBACK_IMAGE;
    }
  };

  public render(): ReactNode {
    const { className, title, description, badge, imageUrl, info } = this.props;

    return (
      <div className={classNames(styles.gameCard, className)}>
        <div className={styles.imageWrapper}>
          <img className={styles.image} src={imageUrl ?? FALLBACK_IMAGE} alt={title} onError={this.handleImageError} />
        </div>

        <div className={styles.content}>
          <div className={styles.meta}>
            {badge && <div className={styles.badge}>{badge}</div>}
            {info && <div className={styles.info}>{info}</div>}
          </div>
          <div className={styles.title}>{title}</div>

          {description && <p className={styles.description}>{description}</p>}
        </div>
      </div>
    );
  }
}
