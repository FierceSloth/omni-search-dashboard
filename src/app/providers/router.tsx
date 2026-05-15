import { App } from '@/app';
import { MainPage } from '@/pages/main';
import { ROUTE_PATHS } from '@/shared/constants/routes';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: ROUTE_PATHS.HOME,
    element: <App />,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: ROUTE_PATHS.ABOUT,
        element: <div>About Page Stub</div>,
      },
      {
        path: ROUTE_PATHS.NOT_FOUND,
        element: <div>404 - Not Found</div>,
      },
    ],
  },
]);
