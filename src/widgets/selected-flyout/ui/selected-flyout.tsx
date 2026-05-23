import { useAppDispatch, useAppSelector } from '@/app/store';
import { clearAllSelected, selectSelectedCards } from '@/features/card-selection';
import classNames from 'classnames';
import type { ReactNode } from 'react';
import { selectSelectedCardsCount } from '../model/selectors';

import { buildDetailsPath } from '@/shared/constants/routes';
import { downloadCsv } from '@/shared/utils/download-csv.util';
import styles from './selected-flyout.module.scss';

interface IProps {
  className?: string;
}

const escapeCsv = (text?: string): string => (text ? `"${text.replaceAll('"', '""')}"` : '""');

export function SelectedFlyout({ className }: IProps): ReactNode {
  const dispatch = useAppDispatch();

  const selectedCards = useAppSelector(selectSelectedCards);
  const selectedCount = useAppSelector(selectSelectedCardsCount);

  if (selectedCount <= 0) return null;

  const handleClearClick = (): void => {
    dispatch(clearAllSelected());
  };

  const handleDownloadClick = (): void => {
    const headers = ['ID', 'Title', 'Description', 'Badge', 'Info', 'URL'];

    const rows = selectedCards.map((card) => {
      const detailsUrl = `${globalThis.location.origin}${buildDetailsPath(card.id)}`;

      return [
        card.id,
        escapeCsv(card.title),
        escapeCsv(card.description),
        escapeCsv(card.badge),
        escapeCsv(card.info),
        escapeCsv(detailsUrl),
      ].join(',');
    });

    const csvContent = [headers.join(','), ...rows].join('\n');
    const fileName = `${selectedCount}_items.csv`;

    downloadCsv(fileName, csvContent);
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

          <button
            className={classNames(styles.actionButton, styles.primaryButton)}
            type="button"
            onClick={handleDownloadClick}
            aria-label="Download selection"
          >
            Download
          </button>
        </div>
      </div>
    </div>
  );
}
