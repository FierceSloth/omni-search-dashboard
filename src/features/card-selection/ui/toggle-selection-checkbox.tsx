import type { IGameCardEntity } from '@/entities/game';
import { Checkbox } from '@/shared/ui/checkbox';
import { selectIsCardSelectedById, toggleSelected, useAppDispatch, useAppSelector } from '@app/store';
import { useMemo, type ReactNode } from 'react';

interface IProps {
  card: IGameCardEntity;
  className?: string;
}

const handleStopPropagation = (event: React.MouseEvent): void => {
  event.stopPropagation();
};

export function ToggleSelectionCheckbox({ card, className }: IProps): ReactNode {
  const dispatch = useAppDispatch();

  const selectIsCardSelected = useMemo(() => selectIsCardSelectedById(card.id), [card.id]);
  const isSelected = useAppSelector(selectIsCardSelected);

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
