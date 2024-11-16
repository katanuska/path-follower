import { fllowPathAndCollectLetters } from '../runner';

describe('Runner', () => {
  it('should throw error if there is no map', () => {
    expect(() => fllowPathAndCollectLetters('---')).toThrow('The start of this path was not found');
  });

  it('should collect characters on basic map', () => {
    const pathMap = `
        @---A---+
                |
        x-B-+   C
            |   |
            +---+`;
    const pathAndLetters = fllowPathAndCollectLetters(pathMap);

    expect(pathAndLetters.collectedLetters.join('')).toBe('ACB');
    expect(pathAndLetters.pathCharacters.join('')).toBe('@---A---+|C|+---+|+-B-x');
  });

  it('should go straight through intersections', () => {
    const pathMap = `
        @
        | +-C--+
        A |    |
        +---B--+
          |      x
          |      |
          +---D--+`;
    const pathAndLetters = fllowPathAndCollectLetters(pathMap);

    expect(pathAndLetters.collectedLetters.join('')).toBe('ABCD');
    expect(pathAndLetters.pathCharacters.join('')).toBe('@|A+---B--+|+--C-+|-||+---D--+|x');
  });

  it('should fillow path when letter is on intersection', () => {
    const pathMap = `
      @---A---+
              |
      x-B-+   |
          |   |
          +---C`;
    const pathAndLetters = fllowPathAndCollectLetters(pathMap);

    expect(pathAndLetters.collectedLetters.join('')).toBe('ACB');
    expect(pathAndLetters.pathCharacters.join('')).toBe('@---A---+|||C---+|+-B-x');
  });

  it('should not collect letter from the same location twice', () => {
    const pathMap = `
          +-O-N-+
          |     |
          |   +-I-+
      @-G-O-+ | | |
          | | +-+ E
          +-+     S
                  |
                  x`;
    const pathAndLetters = fllowPathAndCollectLetters(pathMap);

    expect(pathAndLetters.collectedLetters.join('')).toBe('GOONIES');
    expect(pathAndLetters.pathCharacters.join('')).toBe('@-G-O-+|+-+|O||+-O-N-+|I|+-+|+-I-+|ES|x');
  });

  it('should keep direction even in a compact space', () => {
    const pathMap = `
         +-L-+
         |  +A-+
        @B+ ++ H
         ++    x`;

    const pathAndLetters = fllowPathAndCollectLetters(pathMap);

    expect(pathAndLetters.collectedLetters.join('')).toBe('BLAH');
    expect(pathAndLetters.pathCharacters.join('')).toBe('@B+++B|+-L-+A+++A-+Hx');
  });

  it('should ignore characters after end of path', () => {
    const pathMap = `
       @-A--+
            |
            +-B--x-C--D`;
    const pathAndLetters = fllowPathAndCollectLetters(pathMap);

    expect(pathAndLetters.collectedLetters.join('')).toBe('AB');
    expect(pathAndLetters.pathCharacters.join('')).toBe('@-A--+|+-B--x');
  });

  it('should fail if start character is missing', () => {
    const pathMap = `
          -A---+
                |
        x-B-+   C
            |   |
            +---+`;

    expect(() => fllowPathAndCollectLetters(pathMap)).toThrow('The start of this path was not found.');
  });

  it('should fail if end character is missing', () => {
    const pathMap = `
      @--A---+
             |
       B-+   C
         |   |
         +---+`;
    expect(() => fllowPathAndCollectLetters(pathMap)).toThrow('The path you followed leads nowhere.');
  });

  it('should fail if there is more than one start', () => {
    let pathMap = `
           @--A-@-+
          |
  x-B-+   C
      |   |
      +---+`;

    expect(() => fllowPathAndCollectLetters(pathMap)).toThrow('This path has more than one start.');

    pathMap = `
   @--A---+
          |
          C
          x
      @-B-+`;
    expect(() => fllowPathAndCollectLetters(pathMap)).toThrow('This path has more than one start.');

    pathMap = `
   @--A--x

  x-B-+
      |
      @`;
    expect(() => fllowPathAndCollectLetters(pathMap)).toThrow('This path has more than one start.');
  });

  it('should fail if there is fork in path', () => {
    const pathMap = `
              x-B
                |
         @--A---+
                |
           x+   C
            |   |
            +---+`;
    expect(() => fllowPathAndCollectLetters(pathMap)).toThrow("There is a fork on my path. I don't know which way to go.");
  });

  it('should fail if path is broken', () => {
    const pathMap = `
        @--A-+
              |
              
              B-x+`;

    expect(() => fllowPathAndCollectLetters(pathMap)).toThrow('The path you followed leads nowhere.');
  });

  it('should fail if there are multiple starting paths', () => {
    const pathMap = '-B-@-A-x';

    expect(() => fllowPathAndCollectLetters(pathMap)).toThrow("There is a fork on my path. I don't know which way to go.");
  });

  it('should fail if there is fake turn', () => {
    const pathMap = '  @-A-+-B-x';

    expect(() => fllowPathAndCollectLetters(pathMap)).toThrow('The path you followed leads nowhere.');
  });

  it('should fail if there is unsuported character on the map', () => {
    const pathMap = '@-7-A-+-B-x';

    expect(() => fllowPathAndCollectLetters(pathMap)).toThrow('There are unsuported characters on the map.');
  });
});
