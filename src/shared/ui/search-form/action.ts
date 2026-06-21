/* eslint-disable @typescript-eslint/require-await */
'use server';

import { redirect } from 'next/navigation';

export async function submitSearch(formData: FormData): Promise<void> {
  const rawQuery = formData.get('query');
  const query = typeof rawQuery === 'string' ? rawQuery.trim() : '';
  const locale = formData.get('locale') || 'en';

  redirect(`/${locale as string}?query=${query}&page=1`);
}
