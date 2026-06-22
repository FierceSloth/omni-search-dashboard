import { screen } from '@testing-library/react';
import { renderWithProviders as render } from '@/shared/lib/test-utils/render-with-providers';
import { describe, expect, it } from 'vitest';
import { CardDetail } from './card-detail';

describe('CardDetail Component', () => {
  const defaultProps = {
    title: 'Grand Theft Auto V',
    closeHref: '/dashboard',
  };

  it('should render the required title and close link', () => {
    render(<CardDetail {...defaultProps} />);

    expect(screen.getByRole('heading', { level: 2, name: defaultProps.title })).toBeInTheDocument();

    const closeLink = screen.getByRole('link', { name: /close details/i });
    expect(closeLink).toBeInTheDocument();
    expect(closeLink).toHaveAttribute('href', `/en${defaultProps.closeHref}`);
  });

  it('should render subtitle and description if provided', () => {
    const subtitleText = 'by Rockstar Games';
    const descriptionText = 'An exciting action game.';

    render(<CardDetail {...defaultProps} subtitle={subtitleText} description={descriptionText} />);

    expect(screen.getByText(subtitleText)).toBeInTheDocument();
    expect(screen.getByText(descriptionText)).toBeInTheDocument();
  });

  it('should render metadata and tags correctly', () => {
    const mockMetadata = ['4.5 ★', 'Sep 17, 2013'];
    const mockTags = ['Action', 'RPG'];

    render(<CardDetail {...defaultProps} metadata={mockMetadata} tags={mockTags} />);

    mockMetadata.forEach((metaItem) => {
      expect(screen.getByText(metaItem)).toBeInTheDocument();
    });

    mockTags.forEach((tag) => {
      expect(screen.getByText(tag)).toBeInTheDocument();
    });
  });

  it('should not render metadata or tags containers if arrays are empty', () => {
    const { container } = render(<CardDetail {...defaultProps} metadata={[]} tags={[]} />);

    expect(container.querySelector('.meta')).not.toBeInTheDocument();
    expect(container.querySelector('.tags')).not.toBeInTheDocument();
  });

  it('should render action link with custom label if actionUrl is provided', () => {
    const actionUrl = 'https://example.com';
    const actionLabel = 'Play Now';

    render(<CardDetail {...defaultProps} actionUrl={actionUrl} actionLabel={actionLabel} />);

    const linkElement = screen.getByRole('link', { name: actionLabel });

    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', actionUrl);
    expect(linkElement).toHaveAttribute('target', '_blank');
  });

  it('should use default actionLabel if only actionUrl is provided', () => {
    const actionUrl = 'https://example.com';
    const defaultExpectedLabel = 'Official Website';

    render(<CardDetail {...defaultProps} actionUrl={actionUrl} />);

    expect(screen.getByRole('link', { name: defaultExpectedLabel })).toBeInTheDocument();
  });
});
