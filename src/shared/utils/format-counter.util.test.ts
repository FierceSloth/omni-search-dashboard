import { describe, expect, it } from 'vitest';
import { formatCounter } from './format-counter.util';

describe('formatCounter', () => {
  it('should format simple numbers correctly without thousands separator', () => {
    const current = 1;
    const total = 5;

    const expected = '1 / 5';

    expect(formatCounter(current, total)).toBe(expected);
  });

  it('should format large numbers with ru-RU locale spacing', () => {
    const current = 1500;
    const total = 10_000;

    const expectedCurrent = current.toLocaleString('ru-RU');
    const expectedTotal = total.toLocaleString('ru-RU');
    const expectedResult = `${expectedCurrent} / ${expectedTotal}`;

    expect(formatCounter(current, total)).toBe(expectedResult);
  });
});
