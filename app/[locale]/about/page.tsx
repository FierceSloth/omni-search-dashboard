import { locales } from '@/shared/config/i18n/request';

export function generateStaticParams(): { locale: string }[] {
  return locales.map((locale) => ({ locale }));
}

export { AboutPage as default } from '@pages/about';
