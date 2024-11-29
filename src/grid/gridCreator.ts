import { Grid } from './grid';

export function createGrid(content: string): Grid {
  let rows = content.split('\n');
  rows = removeTrailingRows(rows);
  rows = removeTrailingWhitespaces(rows);
  const grid = rows.map((row) => row.split(''));

  return new Grid(grid);
}

function removeTrailingRows(rows: string[]): string[] {
  return rows.filter((row, index, array) => row.trim().length || (index > 0 && index < array.length));
}

function removeTrailingWhitespaces(rows: string[]): string[] {
  const minLeadingSpaces = Math.min(...rows.map((row) => row.match(/^ */)?.[0]?.length || 0));
  return rows.map((row) => row.slice(minLeadingSpaces).trimEnd());
}
