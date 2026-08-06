export const formatDate = (dateString?: string): string | null => {
  if (!dateString) {
    return null;
  }

  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};
