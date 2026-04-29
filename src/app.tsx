import { Component, type ReactNode } from 'react';

export class App extends Component {
  public render(): ReactNode {
    return (
      <>
        <div className="ambient-light"></div>

        <div className="container">
          <h1>Omni Search Dashboard</h1>
        </div>
      </>
    );
  }
}
