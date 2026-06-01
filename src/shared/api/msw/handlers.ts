import { mockGameDetailsResponse, mockValidApiResponse } from '@/entities/game/model/mocks/responses.mock';
import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('https://api.rawg.io/api/games', ({ request }) => {
    const request_ = request as Request;
    const url = new URL(request_.url);
    const search = url.searchParams.get('search');

    if (search === 'error-trigger') {
      return HttpResponse.error();
    }

    return HttpResponse.json(mockValidApiResponse);
  }),

  http.get('https://api.rawg.io/api/games/:id', ({ params }) => {
    const routeParams = params as { id: string };

    if (routeParams.id === 'error-id') {
      return HttpResponse.error();
    }

    return HttpResponse.json(mockGameDetailsResponse);
  }),
];
