import { App } from '@/app';
import { MainPage } from '@/pages/main';
import { NotFoundPage } from '@/pages/not-found/';
import { ROUTE_PATHS } from '@/shared/constants/routes';
import { ErrorMessage } from '@/shared/ui/error-message';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: ROUTE_PATHS.HOME,
    element: <App />,
    errorElement: (
      <ErrorMessage
        title="Something went wrong"
        description="The application encountered a critical error in this section. Please refresh the page to continue."
      />
    ),
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
        element: <NotFoundPage />,
      },
    ],
  },
]);
