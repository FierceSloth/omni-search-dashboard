'use client';

import { usePathname, useRouter } from '@/shared/config/i18n/navigation';
import classNames from 'classnames';
import { useLocale } from 'next-intl';
import { type ReactNode, useTransition } from 'react';

import { IconButton } from '@/shared/ui/icon-button';
import LanguageIcon from '@shared/assets/svg/language-icon.svg?react';

import styles from './language-switcher.module.scss';

interface IProps {
  className?: string;
}

export function LanguageSwitcher({ className }: IProps): ReactNode {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const toggleLanguage = (): void => {
    if (isPending) return;
    const nextLocale = locale === 'en' ? 'ru' : 'en';

    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  };

  return (
    <IconButton
      className={classNames(styles.languageSwitcher, className, {
        [styles.isPending]: isPending,
      })}
      onClick={toggleLanguage}
      aria-label="Toggle language"
      icon={LanguageIcon}
      iconContainerClassName={styles.iconContainer}
    />
  );
}
