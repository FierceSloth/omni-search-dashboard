import classNames from 'classnames';
import type { ReactNode } from 'react';

import {
  clearAllSelected,
  selectSelectedCards,
  selectSelectedCardsCount,
  useAppDispatch,
  useAppSelector,
} from '@/app/store';
import { buildDetailsPath } from '@/shared/constants/routes';
import { downloadCsv, escapeCsv } from '@/shared/utils/download-csv.util';

import { Button } from '@/shared/ui/button';

import styles from './selected-flyout.module.scss';

interface IProps {
  className?: string;
}

const HEADERS = ['ID', 'Title', 'Description', 'Badge', 'Info', 'URL'];

export function SelectedFlyout({ className }: IProps): ReactNode {
  const dispatch = useAppDispatch();

  const selectedCards = useAppSelector(selectSelectedCards);
  const selectedCount = useAppSelector(selectSelectedCardsCount);

  if (selectedCount <= 0) return null;

  const handleClearClick = (): void => {
    dispatch(clearAllSelected());
  };

  const handleDownloadClick = (): void => {
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

    const csvContent = [HEADERS.join(','), ...rows].join('\n');
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

        <div className={styles.actions}>
          <Button variant="ghost" type="button" onClick={handleClearClick} aria-label="Clear selection">
            Clear
          </Button>

          <Button variant="primary" type="button" onClick={handleDownloadClick} aria-label="Download selection">
            Download
          </Button>
        </div>
      </div>
    </div>
  );
}
