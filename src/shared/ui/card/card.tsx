import classNames from 'classnames';
import { type ReactNode, type SyntheticEvent } from 'react';

import styles from './card.module.scss';
import { FALLBACK_IMAGE } from '@/shared/constants/constants';

interface IProps {
  className?: string;
  imageUrl?: string;
  children: ReactNode;
}

const handleImageError = (event: SyntheticEvent<HTMLImageElement>): void => {
  if (event.currentTarget.src !== FALLBACK_IMAGE) {
    event.currentTarget.src = FALLBACK_IMAGE;
  }
};

export function Card({ className, imageUrl, children }: IProps): ReactNode {
  return (
    <div className={classNames(styles.gameCard, className)}>
      <div className={styles.imageWrapper}>
        <img className={styles.image} src={imageUrl || FALLBACK_IMAGE} onError={handleImageError} />
      </div>

      <div className={styles.content}>{children}</div>
    </div>
  );
}
