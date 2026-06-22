import { FALLBACK_IMAGE } from '@/shared/constants/constants';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Card } from './card';

vi.mock('next/image', () => ({
  default: (props: { fill?: boolean } & React.ImgHTMLAttributes<HTMLImageElement>): JSX.Element => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { fill, ...rest } = props;
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...rest} />;
  },
}));

describe('Card Component', () => {
  it('should render children content correctly', () => {
    render(
      <Card>
        <div data-testid="test-child">Abstract Content</div>
      </Card>
    );

    expect(screen.getByTestId('test-child')).toBeInTheDocument();
    expect(screen.getByText('Abstract Content')).toBeInTheDocument();
  });

  it('should apply custom className', () => {
    render(
      <Card className="custom-test-class">
        <div>Content</div>
      </Card>
    );

    const cardContainer = screen.getByText('Content').parentElement?.parentElement;
    expect(cardContainer).toHaveClass('custom-test-class');
  });

  it('should render image with provided imageUrl', () => {
    const testImageUrl = `https://media.rawg.io/media/games/20a/20aa03a10cda45239fe22d035c0ebe64.jpg`;

    render(
      <Card imageUrl={testImageUrl}>
        <div>Content</div>
      </Card>
    );

    const imageElement = screen.getByRole('img');
    expect(imageElement).toHaveAttribute('src', testImageUrl);
  });

  it('should render fallback image when imageUrl is not provided', () => {
    render(
      <Card>
        <div>Content</div>
      </Card>
    );

    const imageElement = screen.getByRole('img');
    expect(imageElement).toHaveAttribute('src', FALLBACK_IMAGE);
  });

  it('should render fallback image when imageUrl is broken', () => {
    const brokenImageUrl = `https://media.rawg.io/m4diaam321es/20ca/invalid.jpg`;

    render(
      <Card imageUrl={brokenImageUrl}>
        <div>Content</div>
      </Card>
    );

    const imageElement = screen.getByRole('img');

    fireEvent.error(imageElement);

    expect(imageElement).toHaveAttribute('src', FALLBACK_IMAGE);
  });

  it('should not change src if the fallback image itself fails to load', () => {
    render(
      <Card>
        <div>Content</div>
      </Card>
    );

    const imageElement = screen.getByRole('img');

    fireEvent.error(imageElement);

    expect(imageElement).toHaveAttribute('src', FALLBACK_IMAGE);
  });
});
