import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Card } from './card';

describe('Card Component', () => {
  const FALLBACK_IMAGE = 'https://placehold.co/600x400/1a1a1a/aaaaaa?text=No+Image';

  it('should render basic info correctly', () => {
    render(<Card title="GTA V" description="A game released on Sep 17, 2013." badge="Action" info="4.47 ★" />);

    expect(screen.getByText('GTA V')).toBeInTheDocument();
    expect(screen.getByText('A game released on Sep 17, 2013.')).toBeInTheDocument();
    expect(screen.getByText('Action')).toBeInTheDocument();
    expect(screen.getByText('4.47 ★')).toBeInTheDocument();
  });

  it('should not render optional element when not provided', () => {
    render(<Card title="Minecraft" />);
    expect(screen.queryByText('A game released on Sep 17, 2013.')).not.toBeInTheDocument();
  });

  it('should render image with provided imageUrl', () => {
    const testImageUrl = `https://media.rawg.io/media/games/20a/20aa03a10cda45239fe22d035c0ebe64.jpg`;

    render(<Card title="GTA V" imageUrl={testImageUrl} />);
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
