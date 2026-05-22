import type { IGameCardEntity } from '@/entities/game';
import { useAppDispatch, useAppSelector } from '@app/store';
import type { ReactNode } from 'react';
import { selectIsCardSelected } from '../model/selectors';
import { toggleSelected } from '../model/slice';
import styles from './toggle-selection-checkbox.module.scss';

interface IProps {
  card: IGameCardEntity;
}

export function ToggleSelectionCheckbox({ card }: IProps): ReactNode {
  const dispatch = useAppDispatch();

  const isSelected = useAppSelector((state) => selectIsCardSelected(state, card.id));

  const handleCheckboxClick = (event: React.MouseEvent<HTMLDivElement>): void => {
    event.stopPropagation();
    dispatch(toggleSelected(card));
  };

  return (
    <div className={styles.checkboxWrapper} onClick={handleCheckboxClick}>
      <input className={styles.checkbox} type="checkbox" checked={isSelected} onChange={() => {}} />
    </div>
  );
}
