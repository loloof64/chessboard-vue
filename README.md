# Chessboard Vue

A chess board component for Vue JS (>= 3), written in Typescript.

## Usage

1. With your package manager, add the 'chessboard-vue' package (e.g `bun add chessboard-vue`)
2. In you main.js add the following content :

```js
import ChessboardVueComponent from "chessboard-vue";
import "chessboard-vue/dist/style.css";
```

3. Don't forget to use the component (in the same file), e.g :

```js
createApp(App)
  .use(ChessboardVueComponent) //add this line
  .use(pinia)
  .use(router);
```

4. You can use the ChessboardVue component from any template in your project. E.g :

```html
<ChessboardVue
  :size="500"
  ref="board"
  @checkmate="handleCheckmate"
  @move-done="addHistoryMove"
  :reversed="reversed"
/>
```

## Documentation

### Attributes

| Name               | Purpose                                                                                                                  | Type    | Default     |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------ | ------- | ----------- |
| size               | Defines the common width and height of the board, in pixels.                                                             | number  | 100         |
| reversed           | Says if the black side is at bottom of the board.                                                                        | boolean | false       |
| background         | Defines the overall background color of the board.                                                                       | string  | #124589     |
| coordinatesVisible | Says if the coordinates (around the cells) are visible.                                                                  | boolean | true        |
| coordinatesColor   | Defines the text color of the coordinates.                                                                               | string  | yellow      |
| whiteCellsColor    | Defines the color of the white cells.                                                                                    | string  | navajowhite |
| blackCellsColor    | Defines the color of the black cells.                                                                                    | string  | peru        |
| originCellColor    | Defines the color of the origin cell when performing a drag and drop for a move.                                         | string  | crimson     |
| targetCellColor    | Defines the color of the target cell when performing a drag and drop for a move.                                         | string  | ForestGreen |
| dndCrossCellColor  | Defines the color of the indicator cross cells when performing a drag and drop for a move.                               | string  | DimGrey     |
| moveHighlightColor | Defines the color of the last move arrow.                                                                                | string  | CadetBlue   |
| lastMoveVisible    | Says if the last move arrow must be visible.                                                                             | boolean | true        |
| whitePlayerHuman   | Says if the white side accepts a move from the user, of if it should be handled manually with the playManualMove method. | boolean | true        |
| blackPlayerHuman   | Says if the black side accepts a move from the user, of if it should be handled manually with the playManualMove method. | boolean | true        |

### Methods

#### newGame

Starts a new game with the given position in [Forsyth-Edwards Notation](https://en.wikipedia.org/wiki/Forsyth%E2%80%93Edwards_Notation). If the startPositionFen string is not given, will use the default chess start position.

| Field name       |                               Purpose                               |   Type | Default                                                  |
|------------------|:-------------------------------------------------------------------:|-------:|----------------------------------------------------------|
| startPositionFen | Defines the position, in Forsth-Edwards Notation, that must be use. | string | rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1 |

This method does not return anything.

#### stop

Stops the current game, even if it has not been stopped logically yet.

This method does not take any parameter, and does not return anything.

#### isWhiteTurn

Says, if the turn is to white side, as a boolean.

This method does not take any parameter.

#### playManualMove

Plays a move manually, without user interaction. This method won't have any effect is game is not in progress, or if the side in turn is defined as a human player.

If the parameter `inputMove` is given a string, it must conform to the [Long Algebraic Notation](https://www.chessprogramming.org/Algebraic_Chess_Notation#Long_Algebraic_Notation_.28LAN.29). Otherwise, it can be an object with the following keys : "from" as the start cell string (e.g: "a4"), "to" as the end cell string, and "promotion" still an optional letter which can be one of "q", "r", "b" or "n".

| Field name |             Purpose             |                                                                    Type | Default     |
|------------|:-------------------------------:|------------------------------------------------------------------------:|-------------|
| inputMove  | Defines the move to be applied. | string \| {  from :  string ;  to :  string ;  promotion ? :  string  } | Not defined |

This method returns if the call succeed, as a boolean.

#### gameIsInProgress

Says if the game is in progress, as a boolean.

This method does not take any parameter.

#### setStartPosition

Sets the start position of the game in the board, but only if the game is not in progress. It returns a boolean indicated the success of the call.

This method does not take any parameter.

It can be useful in order to define an history component and make it interact with the board. Don't forget to check the event @moveDone below.

#### setPositionAndLastMove

Sets the current position of the game in the board, but only if the game is not in progress. It returns a boolean indicated the success of the call.

The type `Move` is defined in the **Chessboard.vue** file (so can be imported too), and means the following :
```javascript
export interface Move {
  start: Cell;
  end: Cell;
}
```
where `Cell` is also defined in the **Chessboard.vue** file and means the following :
```javascript
export interface Cell {
  file: number,
  rank: number,
}
```

[Forsyth-Edwards Notation](https://en.wikipedia.org/wiki/Forsyth%E2%80%93Edwards_Notation) is explained there.

| Field name  |                           Purpose                           |   Type | Default     |
|-------------|:-----------------------------------------------------------:|-------:|-------------|
| positionFen | Defines the position to be set in Forsyth-Edwards Notation. | string | Not defined |
| move        | Defines the last move arrow to be set values.               | Move   | Not defined |

It can be useful in order to define an history component and make it interact with the board. Don't forget to check the event @moveDone below.

#### getCurrentPosition

Returns the current position of the board, in the format [Forsyth-Edwards Notation](https://en.wikipedia.org/wiki/Forsyth%E2%80%93Edwards_Notation) as a string.

This method does not take any parameter.

### setLastBoardArrow

Sets the last board arrow, it can even be when the game is in progress.

This method does not return anything.

The type `Move` is defined in the **Chessboard.vue** file (so can be imported too), and means the following :
```javascript
export interface Move {
  start: Cell;
  end: Cell;
}
```
where `Cell` is also defined in the **Chessboard.vue** file and means the following :
```javascript
export interface Cell {
  file: number,
  rank: number,
}
```

| Field name        |                       Purpose                       | Type    | Default     |
|-------------------|:---------------------------------------------------:|---------|-------------|
| move              | The coordinates of the last move arrow.             | Move    | Not defined |

### Events 

#### checkmate

Happens when a checkmate has been done on the board.

| Given field name |                           Purpose                           |    Type |
|------------------|:-----------------------------------------------------------:|--------:|
| byWhite          | Says it the checkmate has been administrated by white side. | boolean |

#### stalemate

Happens when a stalemate has been done on the board.

This event does not provide any parameter.

#### perpetualDraw

Happens when a three-fold repetition has been done on the board.

This event does not provide any parameter.

#### missingMaterialDraw

Happens when a draw by missing material has been done on the board.

This event does not provide any parameter.

#### fiftyMovesDraw

Happens when a draw by the 50 moves rule has been done on the board.

This event does not provide any parameter.

#### waitingManualMove

Indicates that the side which is now in turn cannot be updated with an interaction from the user, and that the board is waiting for a manual move to be done (see also the method `playManualMove`).

This event does not provide any parameter.

#### moveDone

Indicates that a move has been done on the board.

SAN is the [Standard Algebraic Notation](https://www.chessprogramming.org/Algebraic_Chess_Notation#Standard_Algebraic_Notation_.28SAN.29).

FAN is the [Figurine Algebraic Notation](https://www.chessprogramming.org/Algebraic_Chess_Notation#Figurine_Algebraic_Notation_.28FAN.29).

[Forsyth-Edwards Notation](https://en.wikipedia.org/wiki/Forsyth%E2%80%93Edwards_Notation) is explained there.

The type `Move` is defined in the **Chessboard.vue** file (so can be imported too), and means the following :
```javascript
export interface Move {
  start: Cell;
  end: Cell;
}
```
where `Cell` is also defined in the **Chessboard.vue** file and means the following :
```javascript
export interface Cell {
  file: number,
  rank: number,
}
```

| Given field name  |                       Purpose                       | Type    |
|-------------------|:---------------------------------------------------:|---------|
| moveNumber        | Says the move number of the given move.             | number  |
| whiteTurn         | Says if the given move has been done by white side. | boolean |
| moveSan           | The SAN notation of the move.                       | string  |
| moveFan           | The FAN notation of the move.                       | string  |
| resultingPosition | The resulting position in Forsyth-Edwards Notation  | string  |
| move              | The move definition.                                | Move    |

## For developers

### Building

1. Install dependencies : e.g with bun `bun install`
2. Build : e.g with bun `bun run vue-tsc && bun run vite build`

## Credits

Pieces vectors definitions from CBurnett and found on [Wikimedia commons](https://commons.wikimedia.org/wiki/Category:SVG_chess_pieces).

Svg cross has been downloaded from [Svg repo](https://www.svgrepo.com/svg/80301/cross)

Using [ChessJS library](https://github.com/jhlywa/chess.js), which is bundled in the produced script.
