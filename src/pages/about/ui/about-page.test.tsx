import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { AboutPage } from './about-page';

describe('AboutPage', () => {
  it('should render page content and links correctly', () => {
    const pageTitle = 'About Omni Search Dashboard';
    const authorName = 'Dastan Hairushev';
    const githubLinkText = 'GitHub Profile →';
    const rsSchoolLinkText = 'RS School React Course';

    render(
      <MemoryRouter>
        <AboutPage />
      </MemoryRouter>
    );

    expect(screen.getByText(pageTitle)).toBeInTheDocument();
    expect(screen.getByText(authorName)).toBeInTheDocument();

    const githubLink = screen.getByRole('link', { name: githubLinkText });
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute('href', 'https://github.com/FierceSloth');

    const rsSchoolLink = screen.getByRole('link', { name: rsSchoolLinkText });
    expect(rsSchoolLink).toBeInTheDocument();
    expect(rsSchoolLink).toHaveAttribute('href', 'https://rs.school/courses/reactjs');
  });

  it('should render all technology tags', () => {
    const techTags = ['React v19', 'TypeScript', 'FSD Architecture', 'RAWG API', 'SCSS Modules'];

    render(
      <MemoryRouter>
        <AboutPage />
      </MemoryRouter>
    );

    techTags.forEach((tagText) => {
      expect(screen.getByText(tagText)).toBeInTheDocument();
    });
  });
});
