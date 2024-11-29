# Path follower

Follow a path of characters & collect letters:

- Start at the character `@`
- Follow the path
- Collect letters
- Stop when you reach the character `x`

Input:

- a map (2-dimensional array) of characters in a data format of your choice (can even be hard-coded as a global constant)

Output:

- Collected letters
- Path as characters

## Start 
**Run the path follower**:
- run `npm install`
- create your path map in file `map.txt`
- run `npm run build` and  `npm start`

**Run tests:**
- `npm run test`


## Specifications

### Valid maps

#### A basic example

```
  @---A---+
          |
  x-B-+   C
      |   |
      +---+
```

Expected result: 
- Letters ```ACB```
- Path as characters ```@---A---+|C|+---+|+-B-x```

#### Go straight through intersections

```
  @
  | +-C--+
  A |    |
  +---B--+
    |      x
    |      |
    +---D--+
```

Expected result: 
- Letters ```ABCD```
- Path as characters ```@|A+---B--+|+--C-+|-||+---D--+|x```

#### Letters may be found on turns

```
  @---A---+
          |
  x-B-+   |
      |   |
      +---C
```

Expected result: 
- Letters ```ACB```
- Path as characters ```@---A---+|||C---+|+-B-x```

#### Do not collect a letter from the same location twice

```
     +-O-N-+
     |     |
     |   +-I-+
 @-G-O-+ | | |
     | | +-+ E
     +-+     S
             |
             x
```

Expected result: 
- Letters ```GOONIES```
- Path as characters ```@-G-O-+|+-+|O||+-O-N-+|I|+-+|+-I-+|ES|x```

#### Keep direction, even in a compact space

```
 +-L-+
 |  +A-+
@B+ ++ H
 ++    x
```

Expected result: 
- Letters ```BLAH```
- Path as characters ```@B+++B|+-L-+A+++A-+Hx```

#### Ignore stuff after end of path

```
  @-A--+
       |
       +-B--x-C--D
```

Expected result: 
- Letters ```AB```
- Path as characters ```@-A--+|+-B--x```

### Invalid maps

#### Missing start character

```
     -A---+
          |
  x-B-+   C
      |   |
      +---+
```

Expected result: Error

#### Missing end character

```
   @--A---+
          |
    B-+   C
      |   |
      +---+
```

Expected result: Error

#### Multiple starts

```
   @--A-@-+
          |
  x-B-+   C
      |   |
      +---+
```

```
   @--A---+
          |
          C
          x
      @-B-+
```

```
   @--A--x

  x-B-+
      |
      @
```

Expected result: Error

#### Fork in path

```
        x-B
          |
   @--A---+
          |
     x+   C
      |   |
      +---+
```

Expected result: Error

#### Broken path

```
   @--A-+
        |
         
        B-x
```

Expected result: Error

#### Multiple starting paths

```
  x-B-@-A-x
```

Expected result: Error

#### Fake turn

```
  @-A-+-B-x
```

Expected result: Error


## Notes

- the only valid characters are all uppercase letters (`A`-`Z`) and other characters appearing in the example maps; anything else found must result in an error
- turns can be letters or `+`
- input examples are jagged matrices - rows (lines) don't contain the same number of elements (characters): this is a valid form of input so keep that in mind