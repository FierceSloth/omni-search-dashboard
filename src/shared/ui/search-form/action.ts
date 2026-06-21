/* eslint-disable @typescript-eslint/require-await */
'use server';

import { redirect } from '@shared/config/i18n/navigation';

export async function submitSearch(formData: FormData): Promise<void> {
  const rawQuery = formData.get('query');
  const query = typeof rawQuery === 'string' ? rawQuery.trim() : '';

  const locale = (formData.get('locale') as string) || 'en';

  redirect({
    href: `/?query=${encodeURIComponent(query)}&page=1`,
    locale: locale,
  });
}
