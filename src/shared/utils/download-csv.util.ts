/**
 * Escapes text for CSV format.
 * Encloses the string in double quotes and doubles any single quotes (‘’)
 * to ensure that commas and special characters within the game descriptions do not disrupt the column structure.
 */
export const escapeCsv = (text?: string): string => (text ? `"${text.replaceAll('"', '""')}"` : '""');

export const downloadCsv = (filename: string, content: string): void => {
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);

  document.body.append(link);
  link.click();

  link.remove();
  URL.revokeObjectURL(url);
};
