<script setup lang="ts">
interface HistoryNode {
  text: string;
  fen?: string;
  lastMove?: Move;
}

import { computed, ref } from "vue";
import ChessboardVue, { Move } from "./components/ChessboardVue.vue";
const board = ref<typeof ChessboardVue>();
const reversed = ref<boolean>(false);
const manualField = ref<HTMLInputElement>();
const historyElements = ref<Array<HistoryNode>>([]);
const gameInProgress = computed<boolean>(() => {
  if (!board.value) return false;
  return board.value.gameIsInProgress();
});
const currentPosition = ref<string>("");

function newGameHandler() {
  if (!board.value) return;
  historyElements.value = [];
  board.value.newGame();
  currentPosition.value = board.value.getCurrentPosition();
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
  if (!board.value) return;
  const moveText = manualField.value?.value;
  const success = board.value.playManualMove(moveText);
  if (success) {
    if (!manualField.value) return;
    manualField.value.value = "";
    currentPosition.value = board.value.getCurrentPosition();
  } else {
    alert("Illegal move, or you don't have right to send one now !");
  }
}

function tryToSetHistory(fen?: string, lastMove?: Move) {
  if (!board.value) return;
  if (!fen) return;

  const success = board.value.setPositionAndLastMove(fen, lastMove);
  if (!success) {
    alert("Forbidden as game is in progress !");
  } else {
    currentPosition.value = board.value.getCurrentPosition();
  }
}

function tryToSetStartPosition() {
  if (!board.value) return;

  const success = board.value.setStartPosition();
  if (!success) {
    alert("Forbidden as game is in progress !");
  } else {
    currentPosition.value = board.value.getCurrentPosition();
  }
}

function addHistoryMove(
  moveNumber: number,
  whiteTurn: boolean,
  moveSan: string,
  moveFan: string,
  resultingPosition: string,
  move: Move
) {
  if (whiteTurn) {
    historyElements.value.push({
      text: `${moveNumber}.`,
    });
  }
  historyElements.value.push({
    text: moveFan,
    fen: resultingPosition,
    lastMove: move,
  });
  if (!board.value) return;
  currentPosition.value = board.value.getCurrentPosition();
}

function stopGame() {
  if (!board.value) return;
  if (window.confirm("Stop current game ?")) {
    board.value.stop();
  }
}
</script>

<template>
  <h2>Chessboard test</h2>
  <h3>{{ currentPosition }}</h3>
  <div>
    <button @click="newGameHandler">New game</button>
    <button @click="reverseBoard">Reverse side</button>
    <button @click="tryToSetStartPosition">Start position (history)</button>
    <button v-if="gameInProgress" @click="stopGame">Stop game</button>
  </div>
  <div>
    <label for="manualField">Manual move (e.g b1c3, or even c7c8r)</label>
    <input type="text" id="manualField" ref="manualField" />
    <button @click="playManualMove">Send</button>
  </div>
  <div id="gameZone">
    <ChessboardVue
      :size="500"
      ref="board"
      @checkmate="handleCheckmate"
      @move-done="addHistoryMove"
      :reversed="reversed"
    />
    <div class="history">
      <template v-for="node in historyElements">
        <button
          v-if="node.fen"
          @click="() => tryToSetHistory(node.fen, node.lastMove)"
        >
          {{ node.text }}
        </button>
        <p v-else>
          {{ node.text }}
        </p>
      </template>
    </div>
  </div>
</template>

<style scoped>
.history {
  display: grid;
  width: 300px;
  height: 60vh;
  overflow-y: scroll;
  grid-template-columns: 1fr 2fr 2fr;
}

.history > button {
  height: 5vh;
}

#gameZone {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
</style>
