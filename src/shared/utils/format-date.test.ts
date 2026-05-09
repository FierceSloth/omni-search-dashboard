import { describe, expect, it } from 'vitest';
import { formatDate } from './format-date.util';

describe('formatDate utility', () => {
  it('should return null if dateString is not provided', () => {
    expect(formatDate()).toBeNull();
    expect(formatDate('')).toBeNull();
  });

  it('should formate valid date string correctly', () => {
    const inputDate = '2023-12-25';
    const result = formatDate(inputDate);

    expect(result).toBe('Dec 25, 2023');
  });

  it('should handle invalid date strings', () => {
    const result = formatDate('not-a-real-date');
    expect(result).toBe('Invalid Date');
  });
});
