import classNames from 'classnames';
import { type InputHTMLAttributes, type ReactNode, type SubmitEventHandler } from 'react';

import searchIcon from '@shared/assets/svg/search-icon.svg?raw';
import styles from './search-form.module.scss';

interface IProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onSubmit'> {
  className?: string;
  withIcon?: boolean;
  icon?: string;
  onSubmit?: SubmitEventHandler<HTMLFormElement>;
}

export function SearchForm({ className, withIcon = true, icon = searchIcon, onSubmit, ...rest }: IProps): ReactNode {
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
      <input className={styles.input} {...rest} />
    </form>
  );
}
