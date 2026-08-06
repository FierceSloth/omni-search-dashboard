export class RawgClient {
  private static readonly API_KEY = 'ee4cd6c77f4848da9975f75afa6d2a1d';
  private static readonly BASE_URL = 'https://api.rawg.io/api';

  public static async fetchData<T>(endpoint: string): Promise<T> {
    const url = new URL(`${RawgClient.BASE_URL}${endpoint}`);
    url.searchParams.append('key', RawgClient.API_KEY);

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = (await response.json()) as T;

    return data;
  }
}
