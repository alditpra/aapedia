/**
 * Format a date to a human-readable string
 * @param date The date to format
 * @returns Formatted date string (e.g., "February 26, 2025")
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
}
