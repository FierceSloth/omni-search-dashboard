import { FALLBACK_IMAGE } from '@/shared/constants/constants';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Card } from './card';

describe('Card Component', () => {
  const defaultProps = {
    title: 'GTA V',
    description: 'A game released on Sep 17, 2013.',
    badge: 'Action',
    info: '4.47 ★',
  };

  it('should render basic info correctly', () => {
    render(<Card {...defaultProps} />);

    expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.description)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.badge)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.info)).toBeInTheDocument();
  });

  it('should not render optional element when not provided', () => {
    render(<Card title={defaultProps.title} />);

    expect(screen.queryByTestId('badge-container')).not.toBeInTheDocument();
    expect(screen.queryByTestId('info-container')).not.toBeInTheDocument();
    expect(screen.queryByTestId('description-container')).not.toBeInTheDocument();
  });

  it('should render image with provided imageUrl', () => {
    const testImageUrl = `https://media.rawg.io/media/games/20a/20aa03a10cda45239fe22d035c0ebe64.jpg`;

    render(<Card title={defaultProps.title} imageUrl={testImageUrl} />);
    const imageElement = screen.getByRole('img', { name: /gta v/i });

    expect(imageElement).toHaveAttribute('src', testImageUrl);
  });

  it('should render fallback image when imageUrl is not provided', () => {
    render(<Card title="No Image Game" />);
    const imageElement = screen.getByRole('img', { name: /no image game/i });

    expect(imageElement).toHaveAttribute('src', FALLBACK_IMAGE);
  });

  it('should render fallback image when imageUrl is broken', () => {
    const brokenImageUrl = `https://media.rawg.io/m4diaam321es/20ca/20aa03a10cda239fe22d035c0ebe64.jpg`;

    render(<Card title="Broken Image Game" imageUrl={brokenImageUrl} />);
    const imageElement = screen.getByRole('img', { name: /broken image game/i });

    fireEvent.error(imageElement);

    expect(imageElement).toHaveAttribute('src', FALLBACK_IMAGE);
  });

  it('should not change src if the fallback image itself fails to load', () => {
    render(<Card title="Fallback Error Game" />);
    const imageElement = screen.getByRole('img', { name: /fallback error game/i });

    fireEvent.error(imageElement);

    expect(imageElement).toHaveAttribute('src', FALLBACK_IMAGE);
  });
});
