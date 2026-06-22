'use client';

import classNames from 'classnames';
import { type ReactNode } from 'react';

import {
  clearAllSelected,
  selectSelectedCards,
  selectSelectedCardsCount,
  useAppDispatch,
  useAppSelector,
} from '@/app/store';
import { downloadCsv } from '@/shared/utils/download-csv.util';
import { generateCsvAction } from '@/widgets/selected-flyout/actions';
import { useTranslations } from 'next-intl';

import { Button } from '@/shared/ui/button';

import styles from './selected-flyout.module.scss';

interface IProps {
  className?: string;
}

export function SelectedFlyout({ className }: IProps): ReactNode {
  const t = useTranslations('SelectedFlyout');
  const dispatch = useAppDispatch();

  const selectedCards = useAppSelector(selectSelectedCards);
  const selectedCount = useAppSelector(selectSelectedCardsCount);

  if (selectedCount <= 0) return null;

  const handleClearClick = (): void => {
    dispatch(clearAllSelected());
  };

  const handleDownloadClick = async (): Promise<void> => {
    const csvContent = await generateCsvAction(selectedCards, globalThis.location.origin);

    const fileName = `${selectedCount}_items.csv`;
    downloadCsv(fileName, csvContent);
  };

  return (
    <div className={classNames(styles.flyoutWrapper, className)}>
      <div className={styles.flyout}>
        <div className={styles.info}>
          <div className={styles.badge}>{selectedCount}</div>
          <span className={styles.text}>{t('itemSelected', { count: selectedCount })}</span>
        </div>

        <div className={styles.actions}>
          <Button variant="ghost" type="button" onClick={handleClearClick} aria-label="Clear selection">
            {t('clear')}
          </Button>

          <Button
            variant="primary"
            type="button"
            onClick={() => void handleDownloadClick()}
            aria-label="Download selection"
          >
            {t('download')}
          </Button>
        </div>
      </div>
    </div>
  );
}
