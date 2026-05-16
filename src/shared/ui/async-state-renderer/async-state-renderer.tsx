import { ErrorMessage } from '@/shared/ui/error-message';
import { Loader } from '@/shared/ui/loader/loader';
import type { ReactNode } from 'react';

interface IProps {
  isLoading: boolean;
  error: string | null;
  isEmpty?: boolean;
  emptyNode?: ReactNode;
  loadingText?: string;
  children: ReactNode;
}

export function AsyncStateRenderer({
  isLoading,
  error,
  isEmpty = false,
  emptyNode = null,
  loadingText = 'Loading...',
  children,
}: IProps): ReactNode {
  if (isLoading) {
    return <Loader dataTestId="loader" text={loadingText} />;
  }

  if (error) {
    return <ErrorMessage title="Connection Lost" description={error} />;
  }

  if (isEmpty && emptyNode) {
    return emptyNode;
  }

  return children;
}
