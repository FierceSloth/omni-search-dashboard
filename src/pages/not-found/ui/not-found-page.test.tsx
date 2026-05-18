import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import { ROUTE_PATHS } from '@/shared/constants/routes';
import { NotFoundPage } from './not-found-page';

describe('NotFoundPage', () => {
  it('should render 404 title and description', () => {
    const titleText = '404';
    const subtitleText = 'Page Not Found';

    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { level: 1, name: titleText })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: subtitleText })).toBeInTheDocument();
  });

  it('should render a link to the home page', () => {
    const returnButtonRegex = /Return to Home/i;

    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    );

    const homeLink = screen.getByRole('link', { name: returnButtonRegex });

    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', ROUTE_PATHS.HOME);
  });
});
