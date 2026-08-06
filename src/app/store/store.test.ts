import { describe, expect, it } from 'vitest';
import { toggleSelected } from './card-selection/slice';
import { store } from './store';

describe('Redux Store Configuration', () => {
  it('should initialize with the correct default state structure', () => {
    const state = store.getState();

    expect(state).toHaveProperty('selectedCards');
    expect(state.selectedCards).toEqual({ cards: [] });
  });

  it('should successfully dispatch actions through the configured store', () => {
    const mockCard = { id: 1, title: 'Test Game' };

    store.dispatch(toggleSelected(mockCard));

    const state = store.getState();
    expect(state.selectedCards.cards).toHaveLength(1);
  });
});
