import classNames from 'classnames';
import { type InputHTMLAttributes, type ReactNode, useState } from 'react';

import type { IconType } from '@/shared/types/icon';
import SearchIcon from '@shared/assets/svg/search-icon.svg?react';

import styles from './search-form.module.scss';

interface IProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onSubmit' | 'onChange' | 'value'> {
  className?: string;
  withIcon?: boolean;
  icon?: IconType;
  defaultValue?: string;
  onSearch: (query: string) => void;
}

export function SearchForm({
  className,
  withIcon = true,
  icon: Icon = SearchIcon,
  defaultValue = '',
  onSearch,
  ...rest
}: IProps): ReactNode {
  const [previousDefault, setPreviousDefault] = useState(defaultValue);
  const [localValue, setLocalValue] = useState(defaultValue);

  if (defaultValue !== previousDefault) {
    setPreviousDefault(defaultValue);
    setLocalValue(defaultValue);
  }

  const handleInternalSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    onSearch(localValue.trim());
  };

  return (
    <form className={classNames(styles.form, className)} onSubmit={handleInternalSubmit}>
      {withIcon && (
        <button type="submit" className={styles.button} aria-label="Submit search">
          <Icon className={styles.icon} />
        </button>
      )}
      <input
        className={styles.input}
        onChange={(event) => setLocalValue(event.target.value)}
        value={localValue}
        {...rest}
      />
    </form>
  );
}
