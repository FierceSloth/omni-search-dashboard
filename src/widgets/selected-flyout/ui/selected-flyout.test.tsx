import type { IGameCardEntity } from '@/entities/game';
import { downloadCsv } from '@/shared/utils/download-csv.util';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi, type Mock } from 'vitest';
import { SelectedFlyout } from './selected-flyout';

const mockDispatch = vi.fn();
let mockCards: IGameCardEntity[] = [];
let mockCount = 0;

interface IClearAllSelectedReturn {
  type: string;
}

vi.mock('@/app/_store', () => {
  const mockSelectSelectedCards = vi.fn();
  const mockSelectSelectedCardsCount = vi.fn();

  return {
    useAppDispatch: (): Mock => mockDispatch,
    useAppSelector: <T,>(selector: unknown): T => {
      if (selector === mockSelectSelectedCardsCount) {
        return mockCount as unknown as T;
      }
      return mockCards as unknown as T;
    },
    selectSelectedCards: mockSelectSelectedCards,
    selectSelectedCardsCount: mockSelectSelectedCardsCount,
    clearAllSelected: (): IClearAllSelectedReturn => ({ type: 'clearAllSelected' }),
  };
});

vi.mock('@/shared/utils/download-csv.util', () => ({
  escapeCsv: (text?: string): string => (text ? `"${text}"` : '""'),
  downloadCsv: vi.fn(),
}));

describe('SelectedFlyout', () => {
  const mockCard: IGameCardEntity = {
    id: 3498,
    title: 'Grand Theft Auto V',
    description: 'An exciting action game.',
    badge: 'Action',
    info: '4.47 ★',
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockCards = [];
    mockCount = 0;
  });

  it('should render nothing when no items are selected', () => {
    const { container } = render(<SelectedFlyout />);
    expect(container.firstChild).toBeNull();
  });

  it('should render singular text when one item is selected', () => {
    mockCards = [mockCard];
    mockCount = 1;

    render(<SelectedFlyout />);

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('Item selected')).toBeInTheDocument();
  });

  it('should render plural text when multiple items are selected', () => {
    mockCards = [mockCard, { ...mockCard, id: 9999 }];
    mockCount = 2;

    render(<SelectedFlyout />);

    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('Items selected')).toBeInTheDocument();
  });

  it('should dispatch clearAllSelected action on clear button click', async () => {
    const user = userEvent.setup();
    mockCards = [mockCard];
    mockCount = 1;

    render(<SelectedFlyout />);

    const clearButton = screen.getByRole('button', { name: /clear selection/i });
    await user.click(clearButton);

    expect(mockDispatch).toHaveBeenCalledWith({ type: 'clearAllSelected' });
  });

  it('should build correct CSV data matrix and trigger downloadCsv', async () => {
    const user = userEvent.setup();
    mockCards = [mockCard];
    mockCount = 1;

    render(<SelectedFlyout />);

    const downloadButton = screen.getByRole('button', { name: /download selection/i });
    await user.click(downloadButton);

    const expectedUrl = `${globalThis.location.origin}/details/${mockCard.id}`;
    const expectedHeaders = 'ID,Title,Description,Badge,Info,URL';
    const expectedRow = `${mockCard.id},"${mockCard.title}","${mockCard.description}","${mockCard.badge}","${mockCard.info}","${expectedUrl}"`;
    const expectedCsvContent = `${expectedHeaders}\n${expectedRow}`;
    const expectedFileName = '1_items.csv';

    expect(vi.mocked(downloadCsv)).toHaveBeenCalledWith(expectedFileName, expectedCsvContent);
  });
});
