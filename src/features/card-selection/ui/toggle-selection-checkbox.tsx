import type { IGameCardEntity } from '@/entities/game';
import { Checkbox } from '@/shared/ui/checkbox';
import { useAppDispatch, useAppSelector } from '@app/store';
import type { ReactNode } from 'react';
import { selectSelectedCardIds } from '../model/selectors';
import { toggleSelected } from '../model/slice';

interface IProps {
  card: IGameCardEntity;
  className?: string;
}

const handleStopPropagation = (event: React.MouseEvent): void => {
  event.stopPropagation();
};

export function ToggleSelectionCheckbox({ card, className }: IProps): ReactNode {
  const dispatch = useAppDispatch();

  const selectedIdsSet = useAppSelector(selectSelectedCardIds);
  const isSelected = selectedIdsSet.has(card.id);

  const handleCheckboxChange = (): void => {
    dispatch(toggleSelected(card));
  };

  return (
    <Checkbox
      className={className}
      checked={isSelected}
      onChange={handleCheckboxChange}
      onClick={handleStopPropagation}
      aria-label={`Select game ${card.title}`}
    />
  );
}
