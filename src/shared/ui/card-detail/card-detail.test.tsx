import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { CardDetail } from './card-detail';

describe('CardDetail Component', () => {
  const defaultProps = {
    title: 'Grand Theft Auto V',
    onClose: vi.fn(),
  };

  it('should render the required title and close button', () => {
    render(<CardDetail {...defaultProps} />);

    expect(screen.getByRole('heading', { level: 2, name: defaultProps.title })).toBeInTheDocument();

    const closeButton = screen.getByRole('button', { name: /close details/i });
    expect(closeButton).toBeInTheDocument();
  });

  it('should call onClose callback when close button is clicked', async () => {
    const user = userEvent.setup();
    const onCloseMock = vi.fn();

    render(<CardDetail {...defaultProps} onClose={onCloseMock} />);

    const closeButton = screen.getByRole('button', { name: /close details/i });
    await user.click(closeButton);

    expect(onCloseMock).toHaveBeenCalledOnce();
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
