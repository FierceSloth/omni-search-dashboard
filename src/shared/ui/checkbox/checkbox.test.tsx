import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { Checkbox } from './checkbox';

describe('Checkbox component', () => {
  it('should render correctly as a checkbox role', () => {
    render(<Checkbox />);

    const checkboxElement = screen.getByRole('checkbox');
    expect(checkboxElement).toBeInTheDocument();
  });

  it('should support native interactive behavior', async () => {
    const user = userEvent.setup();
    render(<Checkbox defaultChecked={false} />);

    const checkboxElement = screen.getByRole('checkbox');
    expect(checkboxElement).not.toBeChecked();

    await user.click(checkboxElement);
    expect(checkboxElement).toBeChecked();
  });

  it('should respect disabled attribute passed via rest props', () => {
    render(<Checkbox disabled />);

    const checkboxElement = screen.getByRole('checkbox');
    expect(checkboxElement).toBeDisabled();
  });
});
