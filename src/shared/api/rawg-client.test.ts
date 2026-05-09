import { afterEach, describe, expect, it, vi } from 'vitest';
import { RawgClient } from './rawg-client';

describe('RawgClient', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should fetch data successfully and return parsed JSON', async () => {
    const mockResponseData = { results: ['game1', 'game2'] };

    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => mockResponseData,
    });

    const result = await RawgClient.fetchData('/test-endpoint');

    expect(globalThis.fetch).toHaveBeenCalledWith(
      new URL('https://api.rawg.io/api/test-endpoint?key=ee4cd6c77f4848da9975f75afa6d2a1d')
    );
    expect(result).toEqual(mockResponseData);
  });

  it('should throw an error if the response is not ok', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 404,
    });

    await expect(RawgClient.fetchData('/wrong-endpoint')).rejects.toThrow('HTTP error! status: 404');
  });
});
