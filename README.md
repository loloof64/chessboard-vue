# Chessboard Vue

A chess board component for Vue JS (>= 3).

## Usage

1. With your package manager, add the 'chessboard-vue' package (e.g `bun add chessboard-vue`)
2. In you main.js add the following content :
```js
import ChessboardVueComponent from "chessboard-vue";
import 'chessboard-vue/dist/style.css'
```
3. Don't forget to use the component (in the same file), e.g :
```js
createApp(App)
  .use(ChessboardVueComponent) //add this line
  .use(pinia)
  .use(router)
```

## For developers

### Building

1. Install dependencies : e.g with bun `bun install`
2. Build : e.g with bun `bun run vue-tsc && bun run vite build`

## Credits

Pieces vectors definitions from CBurnett and found on [Wikimedia commons](https://commons.wikimedia.org/wiki/Category:SVG_chess_pieces).

Svg cross has been downloaded from [Svg repo](https://www.svgrepo.com/svg/80301/cross)

Using [ChessJS library](https://github.com/jhlywa/chess.js), which is bundled in the produced script.