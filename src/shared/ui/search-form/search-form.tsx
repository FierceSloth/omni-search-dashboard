'use client';

import classNames from 'classnames';
import { useLocale } from 'next-intl';
import { type InputHTMLAttributes, type ReactNode, useState } from 'react';

import type { IconType } from '@/shared/types/icon';
import { submitSearch } from '@/shared/ui/search-form/action';
import SearchIcon from '@shared/assets/svg/search-icon.svg?react';

import styles from './search-form.module.scss';

interface IProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onSubmit' | 'onChange' | 'value'> {
  className?: string;
  withIcon?: boolean;
  icon?: IconType;
  defaultValue?: string;
}

export function SearchForm({
  className,
  withIcon = true,
  icon: Icon = SearchIcon,
  defaultValue = '',
  ...rest
}: IProps): ReactNode {
  const locale = useLocale();
  const [previousDefault, setPreviousDefault] = useState(defaultValue);
  const [localValue, setLocalValue] = useState(defaultValue);

  if (defaultValue !== previousDefault) {
    setPreviousDefault(defaultValue);
    setLocalValue(defaultValue);
  }

  return (
    <form className={classNames(styles.form, className)} action={submitSearch}>
      {withIcon && (
        <button type="submit" className={styles.button} aria-label="Submit search">
          <Icon className={styles.icon} />
        </button>
      )}
      <input type="hidden" name="locale" value={locale} />
      <input
        name="query"
        className={styles.input}
        onChange={(event) => setLocalValue(event.target.value)}
        value={localValue}
        {...rest}
      />
    </form>
  );
}
