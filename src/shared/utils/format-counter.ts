export const formatCounter = (current: number, total: number): string => {
  return `${current.toLocaleString('ru-RU')} / ${total.toLocaleString('ru-RU')}`;
};
