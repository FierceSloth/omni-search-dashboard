import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Button } from './button';

describe('Button Component', () => {
  it('should render children correctly', () => {
    render(<Button>Click me!</Button>);
    const buttonElement = screen.getByRole('button', { name: /click me!/i });

    expect(buttonElement).toBeInTheDocument();
  });

  it('should call onClick handler when is clicked', async () => {
    const onClickMock = vi.fn();
    const user = userEvent.setup();

    render(<Button onClick={onClickMock}>Submit</Button>);
    const buttonElement = screen.getByRole('button', { name: /submit/i });

    await user.click(buttonElement);

    expect(onClickMock).toHaveBeenCalledOnce();
  });

  it('should pass native html attributes like disabled', () => {
    render(<Button disabled>Disabled</Button>);
    const buttonElement = screen.getByRole('button', { name: /disabled/i });

    expect(buttonElement).toBeDisabled();
  });
});
