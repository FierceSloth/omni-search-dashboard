import classNames from 'classnames';
import { useState, type ReactNode } from 'react';
import { useDispatch } from 'react-redux';

import { gameApi } from '@/entities/game/api/game-api';
import { IconButton } from '@/shared/ui/icon-button';

import refreshIcon from '@shared/assets/svg/refresh-icon.svg?raw';

import styles from './refresh-button.module.scss';

interface IProps {
  className?: string;
}

export function RefreshButton({ className }: IProps): ReactNode {
  const dispatch = useDispatch();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = (): void => {
    if (isRefreshing) return;

    setIsRefreshing(true);
    dispatch(gameApi.util.invalidateTags(['Games', 'GameDetails']));

    setTimeout(() => {
      setIsRefreshing(false);
    }, 500);
  };

  return (
    <IconButton
      className={classNames(styles.refreshButton, className, {
        [styles.isRefreshing]: isRefreshing,
      })}
      onClick={handleRefresh}
      aria-label="Refresh data"
    >
      <span className={styles.iconContainer} dangerouslySetInnerHTML={{ __html: refreshIcon }} />
    </IconButton>
  );
}
