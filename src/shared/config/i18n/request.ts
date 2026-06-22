import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

export const locales = ['en', 'ru'];

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale;

  if (!locale || !locales.includes(locale)) notFound();

  const userMessages = (await import(`../../../../messages/${locale}.json`)) as {
    default: Record<string, unknown>;
  };

  return {
    locale,
    messages: userMessages.default,
  };
});
