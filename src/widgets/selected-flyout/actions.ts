/* eslint-disable @typescript-eslint/require-await */
'use server';

import type { IGameCardEntity } from '@/entities/game';
import { buildDetailsPath } from '@/shared/constants/routes';
import { escapeCsv } from '@/shared/utils/download-csv.util';

const HEADERS = ['ID', 'Title', 'Description', 'Badge', 'Info', 'URL'];

export async function generateCsvAction(cards: IGameCardEntity[], origin: string): Promise<string> {
  const rows = cards.map((card) => {
    const detailsUrl = `${origin}${buildDetailsPath(card.id)}`;

    return [
      card.id,
      escapeCsv(card.title),
      escapeCsv(card.description),
      escapeCsv(card.badge),
      escapeCsv(card.info),
      escapeCsv(detailsUrl),
    ].join(',');
  });

  return [HEADERS.join(','), ...rows].join('\n');
}
