import { Grid } from '../grid';
import { createGrid } from '../gridCreator';

describe('Grid', () => {
  it('should get character from grid', () => {
    const map = new Grid(['@----+-L'.split('')]);

    expect(map.get({ row: 0, col: 5 })).toEqual('+');
  });

  it('should not throw an exception when it gets character outside of the grid boundaries', () => {
    const map = new Grid(['@----+-L'.split('')]);

    expect(map.get({ row: 0, col: 10 })).toEqual(undefined);
    expect(map.get({ row: 1, col: 5 })).toEqual(undefined);
  });

  it('should find one cell with character', () => {
    const map = new Grid(['@----+-L'.split('')]);

    expect(map.findCaracter('@')[0]).toEqual({ row: 0, col: 0 });
  });

  it('should find two cells with given caracter in the same row', () => {
    const map = new Grid(['@---@-'.split('')]);

    expect(map.findCaracter('@')).toEqual(
      expect.arrayContaining([
        { row: 0, col: 0 },
        { row: 0, col: 4 },
      ])
    );
  });

  it('should find two cells with given caracter in two rows', () => {
    const map = new Grid([' @-'.split(''), '---@-'.split('')]);

    expect(map.findCaracter('@')).toEqual(
      expect.arrayContaining([
        { row: 0, col: 1 },
        { row: 1, col: 3 },
      ])
    );
  });

  it('should find character for bigger grid', () => {
    const grid = createGrid(`
      @---A---+
              |
      x-B-+   C
          |   |
          +---+`);

    expect(grid.findCaracter('@')).toEqual(expect.arrayContaining([{ row: 0, col: 0 }]));
  });

  it('should convert grid to string', () => {
    const grid = new Grid([
      ['@', '-', '+'],
      [' ', ' ', '|'],
      ['x', '-', 'A'],
    ]);
    expect(grid.toString()).toEqual('@-+\n  |\nx-A');
  });

  it('shoulod convert grid to string 1', () => {
    const grid = createGrid(`
      @---A---+
              |
      x-B-+   C
          |   |
          +---+`);

    expect(grid.toString()).toEqual('@---A---+\n        |\nx-B-+   C\n    |   |\n    +---+');
  });
});
