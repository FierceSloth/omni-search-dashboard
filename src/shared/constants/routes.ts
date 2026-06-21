export const ROUTE_PATHS = {
  HOME: '/',
  ABOUT: '/about',
  DETAILS: '/details/:id',
  NOT_FOUND: '*',
} as const;

export const buildDetailsPath = (id: string | number): string => {
  return `${ROUTE_PATHS.HOME}?details=${id}`;
};
