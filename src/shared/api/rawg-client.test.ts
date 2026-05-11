import { afterEach, describe, expect, it, vi } from 'vitest';
import { RawgClient } from './rawg-client';

describe('RawgClient', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should fetch data successfully and return parsed JSON', async () => {
    const mockResponseData = { results: ['game1', 'game2'] };

    const baseUrl = 'https://api.rawg.io/api';
    const endpoint = '/test-endpoint';
    const apiKey = 'ee4cd6c77f4848da9975f75afa6d2a1d';

    const expectedUrl = new URL(`${baseUrl}${endpoint}?key=${apiKey}`);

    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => mockResponseData,
    });

    const result = await RawgClient.fetchData(endpoint);

    expect(globalThis.fetch).toHaveBeenCalledWith(expectedUrl);
    expect(result).toEqual(mockResponseData);
  });

  it('should throw an error if the response is not ok', async () => {
    const wrongEndpoint = '/wrong-endpoint';

    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 404,
    });

    await expect(RawgClient.fetchData(wrongEndpoint)).rejects.toThrow('HTTP error! status: 404');
  });
});
