import type { ReactNode } from 'react';

import '../src/app/styles/style.scss';

export default function RootLayout({ children }: { children: React.ReactNode }): ReactNode {
  return children;
}
