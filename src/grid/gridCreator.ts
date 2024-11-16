import { Grid } from './grid';

export function createGrid(content: string): Grid {
  let rows = content.split('\n');
  rows = removeTrailingRows(rows);
  rows = removeTrailingWhitespaces(rows);
  const grid = rows.map((row) => row.split(''));

  return new Grid(grid);
}

function removeTrailingRows(rows: string[]) {
  return rows.filter((row, index, arr) => {
    if (row.trim().length > 0) return true;
    if (index === 0 || index === arr.length - 1) return false;
    return true;
  });
}

function removeTrailingWhitespaces(rows: string[]) {
  const minLeadingSpaces = Math.min(...rows.map((row) => row.match(/^ */)?.[0]?.length || 0));
  return rows.map((row) => row.slice(minLeadingSpaces).trimEnd());
}
