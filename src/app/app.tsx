import { MainPage } from '@/pages/main';
import { Component, type ReactNode } from 'react';

export class App extends Component {
  public render(): ReactNode {
    return (
      <>
        <div className="ambient-light" data-testid="background" />

        <div className="container">
          <MainPage />
        </div>
      </>
    );
  }
}
