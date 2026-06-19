import type { IGameCardEntity } from '@/entities/game';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi, type Mock } from 'vitest';
import { ToggleSelectionCheckbox } from './toggle-selection-checkbox';

const mockDispatch = vi.fn();
let mockIsSelected = false;

interface IToggleSelectedReturn {
  type: string;
  payload: IGameCardEntity;
}

vi.mock('@app/_store', () => ({
  useAppDispatch: (): Mock => mockDispatch,
  useAppSelector: (): boolean => mockIsSelected,
  selectIsCardSelectedById: vi.fn(),
  toggleSelected: (card: IGameCardEntity): IToggleSelectedReturn => ({ type: 'toggleSelected', payload: card }),
}));

describe('ToggleSelectionCheckbox', () => {
  const mockCard: IGameCardEntity = {
    id: 3498,
    title: 'Grand Theft Auto V',
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockIsSelected = false;
  });

  it('should render unchecked by default', () => {
    render(<ToggleSelectionCheckbox card={mockCard} />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
  });

  it('should render checked when state dictates it', () => {
    mockIsSelected = true;
    render(<ToggleSelectionCheckbox card={mockCard} />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });

  it('should dispatch toggleSelected action on change', async () => {
    const user = userEvent.setup();
    render(<ToggleSelectionCheckbox card={mockCard} />);

    const checkbox = screen.getByRole('checkbox');
    await user.click(checkbox);

    expect(mockDispatch).toHaveBeenCalledOnce();
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'toggleSelected',
      payload: mockCard,
    });
  });

  it('should stop event propagation on click', async () => {
    const user = userEvent.setup();
    const parentClickSpy = vi.fn();

    render(
      <div onClick={parentClickSpy}>
        <ToggleSelectionCheckbox card={mockCard} />
      </div>
    );

    const checkbox = screen.getByRole('checkbox');
    await user.click(checkbox);

    expect(parentClickSpy).not.toHaveBeenCalled();
  });
});
