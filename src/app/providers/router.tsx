import { App } from '@/app';
import { AboutPage } from '@/pages/about';
import { MainPage } from '@/pages/main';
import { NotFoundPage } from '@/pages/not-found/';
import { ROUTE_PATHS } from '@/shared/constants/routes';
import { ErrorMessage } from '@/shared/ui/error-message';
import { GameDetailsWidget } from '@/widgets/games-details';
import { createBrowserRouter, type RouteObject } from 'react-router-dom';

export const routesConfig: RouteObject[] = [
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
        path: ROUTE_PATHS.HOME,
        element: <MainPage />,
        children: [
          {
            path: ROUTE_PATHS.DETAILS,
            element: <GameDetailsWidget />,
          },
        ],
      },
      {
        path: ROUTE_PATHS.ABOUT,
        element: <AboutPage />,
      },
      {
        path: ROUTE_PATHS.NOT_FOUND,
        element: <NotFoundPage />,
      },
    ],
  },
];

export const router = createBrowserRouter(routesConfig);
