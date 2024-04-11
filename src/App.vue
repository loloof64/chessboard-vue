<script setup lang="ts">
import { ref } from "vue";
import ChessboardVue from "./components/ChessboardVue.vue";
const board = ref();
const reversed = ref<boolean>(false);

function newGameHandler() {
  board.value.newGame();
}

function handleCheckmate(byWhite: boolean) {
  if (byWhite) {
    alert("White won by checkmate");
  } else {
    alert("Black won by checkmate");
  }
}

function reverseBoard() {
  reversed.value = !reversed.value;
}
</script>

<template>
  <h2>Chessboard test</h2>
  <div>
    <button @click="newGameHandler">New game</button>
    <button @click="reverseBoard">Reverse side</button>
  </div>
  <ChessboardVue
    :size="500"
    ref="board"
    @checkmate="handleCheckmate"
    :reversed="reversed"
    :black-player-human="false"
  />
</template>

<style scoped></style>
