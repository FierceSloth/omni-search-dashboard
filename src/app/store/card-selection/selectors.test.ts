import type { IGameCardEntity } from '@/entities/game';
import { describe, expect, it } from 'vitest';
import { selectIsCardSelectedById, selectSelectedCards, selectSelectedCardsCount } from './selectors';

describe('card-selection selectors', () => {
  const mockCard: IGameCardEntity = {
    id: 3498,
    title: 'Grand Theft Auto V',
  };

  const mockState = {
    selectedCards: {
      cards: [mockCard],
    },
  };

  it('should select the cards array from state', () => {
    const result = selectSelectedCards(mockState);

    expect(result).toEqual(mockState.selectedCards.cards);
  });

  it('should return true if the card is selected by id', () => {
    const targetId = mockCard.id;
    const selector = selectIsCardSelectedById(targetId);

    expect(selector(mockState)).toBe(true);
  });

  it('should return false if the card is not selected by id', () => {
    const nonExistingId = 9999;
    const selector = selectIsCardSelectedById(nonExistingId);

    expect(selector(mockState)).toBe(false);
  });

  it('should return the correct count of selected cards', () => {
    const expectedCount = mockState.selectedCards.cards.length;

    expect(selectSelectedCardsCount(mockState)).toBe(expectedCount);
  });
});
