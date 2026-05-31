import classNames from 'classnames';
import { useState, type ReactNode } from 'react';
import { useDispatch } from 'react-redux';

import { GAME_API_TAGS } from '@/entities/game';
import { gameApi } from '@/entities/game/api/game-api';
import { IconButton } from '@/shared/ui/icon-button';

import refreshIcon from '@shared/assets/svg/refresh-icon.svg?raw';
import styles from './refresh-button.module.scss';

interface IProps {
  className?: string;
}

export function RefreshButton({ className }: IProps): ReactNode {
  const dispatch = useDispatch();
  const [isAnimating, setIsAnimating] = useState(false);

  const handleRefresh = (): void => {
    if (isAnimating) return;

    setIsAnimating(true);
    dispatch(gameApi.util.invalidateTags([GAME_API_TAGS.GAMES, GAME_API_TAGS.GAME_DETAILS]));
  };

  return (
    <IconButton
      className={classNames(styles.refreshButton, className, {
        [styles.isRefreshing]: isAnimating,
      })}
      onClick={handleRefresh}
      onAnimationEnd={() => setIsAnimating(false)}
      aria-label="Refresh data"
    >
      <span className={styles.iconContainer} dangerouslySetInnerHTML={{ __html: refreshIcon }} />
    </IconButton>
  );
}
