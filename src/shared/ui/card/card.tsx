'use client';

import classNames from 'classnames';
import { useState, type ReactNode } from 'react';

import { FALLBACK_IMAGE } from '@/shared/constants/constants';
import Image from 'next/image';

import styles from './card.module.scss';

interface IProps {
  className?: string;
  imageUrl?: string;
  children: ReactNode;
}

export function Card({ className, imageUrl, children }: IProps): ReactNode {
  const [imgSource, setImgSource] = useState(imageUrl || FALLBACK_IMAGE);

  return (
    <div className={classNames(styles.gameCard, className)}>
      <div className={styles.imageWrapper}>
        <Image
          src={imgSource}
          alt="Game cover"
          fill
          sizes="(max-width: 768px) 100vw, 400px"
          className={styles.image}
          onError={() => setImgSource(FALLBACK_IMAGE)}
        />
      </div>

      <div className={styles.content}>{children}</div>
    </div>
  );
}
