import { ROUTE_PATHS } from '@/shared/constants/routes';
import { Header } from '@/shared/ui/header';
import { Tag } from '@/shared/ui/tag';
import { useTranslations } from 'next-intl';
import type { ReactNode } from 'react';
import styles from './about-page.module.scss';

export function AboutPage(): ReactNode {
  const t = useTranslations('AboutPage');

  return (
    <div className={styles.pageContainer}>
      <Header title={t('title')} subtitle={t('subtitle')} linkTo={ROUTE_PATHS.HOME} linkText={t('backLink')} />

      <div className={styles.contentCard}>
        <section className={styles.section}>
          <p className={styles.sectionLabel}>{t('section1Label')}</p>
          <h2 className={styles.sectionTitle}>{t('section1Title')}</h2>
          <p className={styles.text}>{t('section1Text')}</p>
          <div className={styles.tagsContainer}>
            <Tag>React v19</Tag>
            <Tag>TypeScript</Tag>
            <Tag>FSD Architecture</Tag>
            <Tag>RAWG API</Tag>
            <Tag>SCSS Modules</Tag>
          </div>
        </section>

        <section className={styles.section}>
          <p className={styles.sectionLabel}>{t('section2Label')}</p>
          <h2 className={styles.sectionTitle}>{t('section2Title')}</h2>
          <p className={styles.text}>{t('section2Text')}</p>
        </section>

        <section className={styles.section}>
          <p className={styles.sectionLabel}>{t('section3Label')}</p>
          <h2 className={styles.sectionTitle}>Dastan Hairushev</h2>

          <div className={styles.linksContainer}>
            <a href="https://github.com/FierceSloth" target="_blank" rel="noreferrer" className={styles.githubLink}>
              {t('githubLink')}
            </a>

            <p className={styles.text}>
              {t('builtWith')}
              <a
                href="https://rs.school/courses/reactjs"
                target="_blank"
                rel="noreferrer"
                className={styles.projectLink}
              >
                {t('courseLink')}
              </a>
              .
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
