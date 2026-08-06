import { describe, expect, it } from 'vitest';
import { formatDate } from './format-date.util';

describe('formatDate utility', () => {
  it('should return null if dateString is not provided', () => {
    expect(formatDate()).toBeNull();
    expect(formatDate('')).toBeNull();
  });

  it('should formate valid date string correctly', () => {
    const formattedDate = formatDate('2023-12-25');
    const result = 'Dec 25, 2023';

    expect(formattedDate).toBe(result);
  });

  it('should handle invalid date strings', () => {
    const formattedDate = formatDate('not-a-real-date');
    expect(formattedDate).toBe('Invalid Date');
  });
});
