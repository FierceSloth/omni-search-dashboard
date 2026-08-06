import classNames from 'classnames';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import styles from './header.module.scss';

interface HeaderProps {
  className?: string;
  title: string;
  subtitle: string;
  linkTo: string;
  linkText: string;
}

export function Header({ className, title, subtitle, linkTo, linkText }: HeaderProps): ReactNode {
  return (
    <header className={classNames(styles.header, className)}>
      <Link to={linkTo} className={styles.link}>
        {linkText}
      </Link>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.subtitle}>{subtitle}</p>
    </header>
  );
}
