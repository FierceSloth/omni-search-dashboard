import classNames from 'classnames';
import { type ChangeEventHandler, type InputHTMLAttributes, type ReactNode, type SubmitEventHandler } from 'react';

import searchIcon from '@shared/assets/svg/search-icon.svg?raw';
import styles from './search-form.module.scss';

interface IProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onSubmit'> {
  className?: string;
  withIcon?: boolean;
  icon?: string;
  value?: string | number | readonly string[] | undefined;
  onSubmit: SubmitEventHandler<HTMLFormElement>;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

export function SearchForm({
  className,
  withIcon = true,
  icon = searchIcon,
  value,
  onSubmit,
  onChange,
  ...rest
}: IProps): ReactNode {
  return (
    <form className={classNames(styles.form, className)} onSubmit={onSubmit}>
      {withIcon && (
        <button
          type="submit"
          className={styles.button}
          dangerouslySetInnerHTML={{ __html: icon }}
          aria-label="Submit search"
        />
      )}
      <input className={styles.input} onChange={onChange} value={value} {...rest} />
    </form>
  );
}
