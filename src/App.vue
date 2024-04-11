<script setup lang="ts">
import { ref } from "vue";
import ChessboardVue from "./components/ChessboardVue.vue";
const board = ref();
const reversed = ref<boolean>(false);
const manualField = ref<HTMLInputElement>();

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

function playManualMove() {
  const moveText = manualField.value?.value;
  const success = board.value.playManualMove(moveText);
  if (!success) {
    alert("Illegal move, or you don't have right to send one now !");
  }
}
</script>

<template>
  <h2>Chessboard test</h2>
  <div>
    <button @click="newGameHandler">New game</button>
    <button @click="reverseBoard">Reverse side</button>
  </div>
  <div>
    <label for="manualField">Manual move (e.g b1c3, or even c7c8r)</label>
    <input type="text" id="manualField" ref="manualField" />
    <button @click="playManualMove">Send</button>
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
