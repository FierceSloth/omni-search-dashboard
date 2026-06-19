'use client';

import { store } from '@app/_store';
import type { ReactNode } from 'react';
import React from 'react';
import { Provider } from 'react-redux';

export function StoreProvider({ children }: { children: React.ReactNode }): ReactNode {
  return <Provider store={store}>{children}</Provider>;
}
