import { type ReactNode } from 'react';

interface IProps {
  shouldThrow: boolean;
}

export function ErrorTrigger({ shouldThrow }: IProps): ReactNode {
  if (shouldThrow) {
    throw new Error('Test Error for Error Boundary');
  }

  return null;
}
