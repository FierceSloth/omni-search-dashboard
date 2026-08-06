import { beforeEach, describe, expect, it, vi } from 'vitest';
import { downloadCsv, escapeCsv } from './download-csv.util';

describe('CSV Utilities', () => {
  describe('escapeCsv', () => {
    it('should enclose regular text in double quotes', () => {
      const inputText = 'Hello World';
      const expected = '"Hello World"';

      expect(escapeCsv(inputText)).toBe(expected);
    });

    it('should double any existing quotes inside the text', () => {
      const inputText = 'Game "Grand Theft Auto V" description';
      const expected = '"Game ""Grand Theft Auto V"" description"';

      expect(escapeCsv(inputText)).toBe(expected);
    });

    it('should return empty quotes for empty or undefined input', () => {
      expect(escapeCsv('')).toBe('""');
      expect(escapeCsv()).toBe('""');
    });
  });

  describe('downloadCsv', () => {
    const mockObjectUrl = 'blob:http://localhost:3000/mock-uuid';

    beforeEach(() => {
      vi.clearAllMocks();
    });

    it('should correctly orchestrate native browser workflow for file download', () => {
      const testFilename = 'selected_games_report.csv';
      const testContent = 'id,name\n3498,GTA V';

      const createObjectURLSpy = vi.spyOn(globalThis.URL, 'createObjectURL').mockReturnValue(mockObjectUrl);
      const revokeObjectURLSpy = vi.spyOn(globalThis.URL, 'revokeObjectURL').mockImplementation(() => {});

      const createElementSpy = vi.spyOn(document, 'createElement');
      const appendSpy = vi.spyOn(document.body, 'append');

      const clickSpy = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {});
      const removeSpy = vi.spyOn(HTMLAnchorElement.prototype, 'remove');

      const blobSpy = vi.spyOn(globalThis, 'Blob');

      downloadCsv(testFilename, testContent);

      expect(blobSpy).toHaveBeenCalledWith([testContent], {
        type: 'text/csv;charset=utf-8;',
      });

      expect(createObjectURLSpy).toHaveBeenCalled();

      expect(createElementSpy).toHaveBeenCalledWith('a');
      expect(appendSpy).toHaveBeenCalled();

      const createdLink = appendSpy.mock.calls[0][0] as HTMLAnchorElement;

      expect(createdLink.href).toBe(mockObjectUrl);
      expect(createdLink.getAttribute('download')).toBe(testFilename);

      expect(clickSpy).toHaveBeenCalledOnce();
      expect(removeSpy).toHaveBeenCalledOnce();

      expect(revokeObjectURLSpy).toHaveBeenCalledWith(mockObjectUrl);
    });
  });
});
