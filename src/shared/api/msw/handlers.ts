import { mockGameDetailsResponse, mockValidApiResponse } from '@/entities/game/model/mocks/responses.mock';
import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('https://api.rawg.io/api/games', () => {
    return HttpResponse.json(mockValidApiResponse);
  }),

  http.get('https://api.rawg.io/api/games/:id', () => {
    return HttpResponse.json(mockGameDetailsResponse);
  }),
];
