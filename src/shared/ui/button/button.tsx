import classNames from 'classnames';
import { Component, type ButtonHTMLAttributes, type ReactNode } from 'react';

import styles from './button.module.scss';

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export class Button extends Component<IProps> {
  public render(): ReactNode {
    const { children, className, ...rest } = this.props;

    return (
      <button className={classNames(className, styles.button)} {...rest}>
        {children}
      </button>
    );
  }
}
