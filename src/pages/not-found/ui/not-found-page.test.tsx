import { render, screen } from '@testing-library/react';

import { describe, expect, it } from 'vitest';

import { ROUTE_PATHS } from '@/shared/constants/routes';
import { NotFoundPage } from './not-found-page';

describe('NotFoundPage', () => {
  it('should render 404 title and description', () => {
    const titleText = '404';
    const subtitleText = 'Page Not Found';

    render(<NotFoundPage />);

    expect(screen.getByRole('heading', { level: 1, name: titleText })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: subtitleText })).toBeInTheDocument();
  });

  it('should render a link to the home page', () => {
    const returnButtonRegex = /Return to Home/i;

    render(<NotFoundPage />);

    const homeLink = screen.getByRole('link', { name: returnButtonRegex });

    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', ROUTE_PATHS.HOME);
  });
});
