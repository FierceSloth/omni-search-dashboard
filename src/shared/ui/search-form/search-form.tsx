import classNames from 'classnames';
import { type InputHTMLAttributes, type ReactNode, useState } from 'react';

import searchIcon from '@shared/assets/svg/search-icon.svg?raw';
import styles from './search-form.module.scss';

interface IProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onSubmit' | 'onChange' | 'value'> {
  className?: string;
  withIcon?: boolean;
  icon?: string;
  defaultValue?: string;
  onSearch: (query: string) => void;
}

export function SearchForm({
  className,
  withIcon = true,
  icon = searchIcon,
  defaultValue = '',
  onSearch,
  ...rest
}: IProps): ReactNode {
  const [localValue, setLocalValue] = useState(defaultValue);

  const handleInternalSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    onSearch(localValue.trim());
  };

  return (
    <form className={classNames(styles.form, className)} onSubmit={handleInternalSubmit}>
      {withIcon && (
        <button
          type="submit"
          className={styles.button}
          dangerouslySetInnerHTML={{ __html: icon }}
          aria-label="Submit search"
        />
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
