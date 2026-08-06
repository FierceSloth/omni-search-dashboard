import type { IGameCardEntity } from '@/entities/game';
import { describe, expect, it } from 'vitest';
import { clearAllSelected, selectedCardsReducer, toggleSelected } from './slice';

describe('selectedCardsSlice', () => {
  const mockCard: IGameCardEntity = {
    id: 3498,
    title: 'Grand Theft Auto V',
    imageUrl: 'https://media.rawg.io/media/games/example.jpg',
    description: 'Action game',
    badge: 'Action',
    info: '4.47 ★',
  };

  it('should return the initial state when passed undefined action', () => {
    const result = selectedCardsReducer(undefined, { type: '@@INIT' });

    expect(result).toEqual({ cards: [] });
  });

  it('should add a card to the store if it is not present', () => {
    const initialState = { cards: [] };

    const result = selectedCardsReducer(initialState, toggleSelected(mockCard));

    expect(result.cards).toContainEqual(mockCard);
    expect(result.cards).toHaveLength(1);
  });

  it('should remove a card from the store if it is already present', () => {
    const initialState = { cards: [mockCard] };

    const result = selectedCardsReducer(initialState, toggleSelected(mockCard));

    expect(result.cards).not.toContainEqual(mockCard);
    expect(result.cards).toHaveLength(0);
  });

  it('should clear all selected cards from the store', () => {
    const initialState = { cards: [mockCard, { ...mockCard, id: 9999 }] };

    const result = selectedCardsReducer(initialState, clearAllSelected());

    expect(result.cards).toEqual([]);
  });
});
