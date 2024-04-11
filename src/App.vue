<script setup lang="ts">
import { ref } from "vue";
import ChessboardVue from "./components/ChessboardVue.vue";
const board = ref();
const board2 = ref();

function newGameHandler() {
  board.value.newGame();
  board2.value.newGame();
}

function handleCheckmate(byWhite: boolean) {
  if (byWhite) {
    alert("White won by checkmate");
  } else {
    alert("Black won by checkmate");
  }
}
</script>

<template>
  <h2>Chessboard test</h2>
  <div>
    <button @click="newGameHandler">New game</button>
  </div>
  <ChessboardVue :size="500" ref="board" @checkmate="handleCheckmate" />
  ||
  <ChessboardVue :size="500" ref="board2" reversed />
</template>

<style scoped></style>
