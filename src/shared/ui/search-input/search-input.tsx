import { Component, type InputHTMLAttributes, type ReactNode } from 'react';

import searchIcon from '@shared/assets/svg/search-icon.svg?raw';
import styles from './search-input.module.scss';

export class SearchInput extends Component<InputHTMLAttributes<HTMLInputElement>> {
  public render(): ReactNode {
    return (
      <div className={styles.inputWrapper}>
        <span className={styles.icon} dangerouslySetInnerHTML={{ __html: searchIcon }} />
        <input className={styles.input} {...this.props} />
      </div>
    );
  }
}
