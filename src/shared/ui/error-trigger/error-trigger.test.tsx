import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ErrorTrigger } from './error-trigger';

describe('ErrorTrigger Component', () => {
  it('should render nothing when shouldThrow is false', () => {
    const { container } = render(<ErrorTrigger shouldThrow={false} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('should throw an error whe shouldThrow is true', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => render(<ErrorTrigger shouldThrow={true} />)).toThrow('Test Error for Error Boundary');

    consoleSpy.mockRestore();
  });
});
