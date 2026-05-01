import classNames from 'classnames';
import { Component, type InputHTMLAttributes, type ReactNode } from 'react';

import searchIcon from '@shared/assets/svg/search-icon.svg?raw';
import styles from './search-input.module.scss';

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  wrapperClassName?: string;
}

export class SearchInput extends Component<IProps> {
  public render(): ReactNode {
    const { wrapperClassName, ...rest } = this.props;

    return (
      <div className={classNames(styles.wrapper, wrapperClassName)}>
        <span className={styles.icon} dangerouslySetInnerHTML={{ __html: searchIcon }} />
        <input className={styles.input} {...rest} />
      </div>
    );
  }
}
