import { ROUTE_PATHS } from '@/shared/constants/routes';
import { Header } from '@/shared/ui/header';
import { Tag } from '@/shared/ui/tag';
import type { ReactNode } from 'react';
import styles from './about-page.module.scss';

export function AboutPage(): ReactNode {
  return (
    <div className={styles.pageContainer}>
      <Header
        title="About Omni Search Dashboard"
        subtitle="PROJECT DOCUMENTATION & VISION"
        linkTo={ROUTE_PATHS.HOME}
        linkText="← BACK TO LIBRARY"
      />

      <div className={styles.contentCard}>
        <section className={styles.section}>
          <p className={styles.sectionLabel}>The Application</p>
          <h2 className={styles.sectionTitle}>A Single Page Experience for Gaming Enthusiasts</h2>
          <p className={styles.text}>
            Omni Search Dashboard is a sophisticated SPA meticulously crafted for searching and exploring video games.
            By leveraging the powerful RAWG API, it provides real-time access to a vast database of titles, genres, and
            publishers within a high-performance, ethereal interface.
          </p>
          <div className={styles.tagsContainer}>
            <Tag>React v19</Tag>
            <Tag>TypeScript</Tag>
            <Tag>FSD Architecture</Tag>
            <Tag>RAWG API</Tag>
            <Tag>SCSS Modules</Tag>
          </div>
        </section>

        <section className={styles.section}>
          <p className={styles.sectionLabel}>The Architecture</p>
          <h2 className={styles.sectionTitle}>Feature-Sliced Design</h2>
          <p className={styles.text}>
            The codebase is organized following the Feature-Sliced Design (FSD) methodology. This architectural pattern
            ensures scalability and maintainability by decomposing the application into distinct, loosely coupled
            layers, slices, and segments.
          </p>
        </section>

        <section className={styles.section}>
          <p className={styles.sectionLabel}>The Creator</p>
          <h2 className={styles.sectionTitle}>Dastan Hairushev</h2>

          <div className={styles.linksContainer}>
            <a href="https://github.com/FierceSloth" target="_blank" rel="noreferrer" className={styles.githubLink}>
              GitHub Profile →
            </a>

            <p className={styles.text}>
              Built as part of the{' '}
              <a
                href="https://rs.school/courses/reactjs"
                target="_blank"
                rel="noreferrer"
                className={styles.projectLink}
              >
                RS School React Course
              </a>
              .
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
