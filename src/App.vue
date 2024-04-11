<script setup lang="ts">
import { ref } from 'vue';
import ChessboardVue from './components/ChessboardVue.vue'
const board = ref();
const board2 = ref();

function newGameHandler() {
  board.value.newGame('rnbqkbnr/pp1ppppp/8/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2');
  board2.value.newGame('rnbqkbnr/pp1ppppp/8/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2');
}
</script>

<template>
  <h2>Chessboard test</h2>
  <div>
    <button @click="newGameHandler">New game</button>
  </div>
  <ChessboardVue :size="500" ref="board" />
  ||
  <ChessboardVue :size="500" ref="board2" reversed/>
</template>

<style scoped>
</style>
