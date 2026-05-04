import { Component, type ReactNode } from 'react';

interface IProps {
  shouldThrow: boolean;
}

export class ErrorTrigger extends Component<IProps> {
  public render(): ReactNode {
    const { shouldThrow = false } = this.props;

    if (shouldThrow) {
      throw new Error('Test Error for Error Boundary');
    }

    return null;
  }
}
