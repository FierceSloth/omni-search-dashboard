import type { IconType } from '@/shared/types/icon';
import classNames from 'classnames';
import { type ButtonHTMLAttributes, type ReactNode } from 'react';
import styles from './icon-button.module.scss';

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  icon: IconType;
  iconContainerClassName?: string;
}

export function IconButton({ icon: Icon, iconContainerClassName, className, ...rest }: IProps): ReactNode {
  return (
    <button className={classNames(styles.iconButton, className)} {...rest}>
      <div className={styles.iconWrapper}>
        <span className={iconContainerClassName}>
          <Icon />
        </span>
      </div>
    </button>
  );
}
