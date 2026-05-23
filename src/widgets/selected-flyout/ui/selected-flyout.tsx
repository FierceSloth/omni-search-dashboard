import { useAppDispatch, useAppSelector } from '@/app/store';
import { clearAllSelected } from '@/features/card-selection';
import classNames from 'classnames';
import type { ReactNode } from 'react';
import { selectSelectedCardsCount } from '../model/selectors';

import styles from './selected-flyout.module.scss';

interface IProps {
  className?: string;
}

export function SelectedFlyout({ className }: IProps): ReactNode {
  const dispatch = useAppDispatch();
  const selectedCount = useAppSelector(selectSelectedCardsCount);

  if (selectedCount <= 0) return null;

  const handleClearClick = (): void => {
    dispatch(clearAllSelected());
  };

  return (
    <div className={classNames(styles.flyoutWrapper, className)}>
      <div className={styles.flyout}>
        <div className={styles.info}>
          <div className={styles.badge}>{selectedCount}</div>
          <span className={styles.text}>{selectedCount === 1 ? 'Item selected' : 'Items selected'}</span>
        </div>

        <div className={styles.divider} aria-hidden="true" />

        <div className={styles.actions}>
          <button
            className={classNames(styles.actionButton, styles.ghostButton)}
            type="button"
            onClick={handleClearClick}
            aria-label="Clear selection"
          >
            Clear
          </button>

          <button className={classNames(styles.actionButton, styles.primaryButton)} type="button" onClick={() => {}}>
            Download
          </button>
        </div>
      </div>
    </div>
  );
}
