export const ROUTE_PATHS = {
  HOME: '/',
  ABOUT: '/about',
  DETAILS: '/details/:id',
  NOT_FOUND: '*',
} as const;

export const buildDetailsPath = (id: number | string): string => {
  return `/${id}`;
};
