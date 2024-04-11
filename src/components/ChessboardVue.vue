<template>
  <input type="hidden" :value="updater" />
  <div
    class="root"
    ref="rootElement"
    @mousedown="reactToMouseDown"
    @mousemove="reactToMouseMove"
    @mouseup="reactToMouseUp"
    @mouseleave="reactToMouseExited"
  >
    <!-- lowest layer -->
    <div class="lowest-layer">
      <!-- upper coordinates -->
      <div />
      <template v-for="file in fileIndexes">
        <p v-if="props.coordinatesVisible" class="coordinate">
          {{ String.fromCharCode("A".charCodeAt(0) + file) }}
        </p>
        <div v-else />
      </template>
      <div />
      <!-- upper coordinates -->

      <!-- medium lines -->
      <template v-for="rank in rankIndexes">
        <!-- left coordinate -->
        <p v-if="props.coordinatesVisible" class="coordinate">
          {{ String.fromCharCode("1".charCodeAt(0) + rank) }}
        </p>
        <div v-else />
        <!-- left coordinate-->

        <!-- cells -->
        <template v-for="file in fileIndexes">
          <div
            class="cell"
            :class="(rank + file) % 2 !== 0 ? 'white' : 'black'"
          >
            <div
              v-if="isDnDOriginCell(file, rank, dndPieceData)"
              class="dnd-orig"
            />
            <WP
              v-else-if="isWhitePawnAtCell(currentPosition, file, rank)"
              :class="
                isDnDTargetCell(file, rank, dndPieceData)
                  ? 'dnd-target'
                  : isDnDCrossCell(file, rank, dndPieceData)
                  ? 'dnd-cross-cell'
                  : 'no-highlight-cell'
              "
            />
            <WN
              v-else-if="isWhiteKnightAtCell(currentPosition, file, rank)"
              :class="
                isDnDTargetCell(file, rank, dndPieceData)
                  ? 'dnd-target'
                  : isDnDCrossCell(file, rank, dndPieceData)
                  ? 'dnd-cross-cell'
                  : 'no-highlight-cell'
              "
            />
            <WB
              v-else-if="isWhiteBishopAtCell(currentPosition, file, rank)"
              :class="
                isDnDTargetCell(file, rank, dndPieceData)
                  ? 'dnd-target'
                  : isDnDCrossCell(file, rank, dndPieceData)
                  ? 'dnd-cross-cell'
                  : 'no-highlight-cell'
              "
            />
            <WR
              v-else-if="isWhiteRookAtCell(currentPosition, file, rank)"
              :class="
                isDnDTargetCell(file, rank, dndPieceData)
                  ? 'dnd-target'
                  : isDnDCrossCell(file, rank, dndPieceData)
                  ? 'dnd-cross-cell'
                  : 'no-highlight-cell'
              "
            />
            <WQ
              v-else-if="isWhiteQueenAtCell(currentPosition, file, rank)"
              :class="
                isDnDTargetCell(file, rank, dndPieceData)
                  ? 'dnd-target'
                  : isDnDCrossCell(file, rank, dndPieceData)
                  ? 'dnd-cross-cell'
                  : 'no-highlight-cell'
              "
            />
            <WK
              v-else-if="isWhiteKingAtCell(currentPosition, file, rank)"
              :class="
                isDnDTargetCell(file, rank, dndPieceData)
                  ? 'dnd-target'
                  : isDnDCrossCell(file, rank, dndPieceData)
                  ? 'dnd-cross-cell'
                  : 'no-highlight-cell'
              "
            />
            <BP
              v-else-if="isBlackPawnAtCell(currentPosition, file, rank)"
              :class="
                isDnDTargetCell(file, rank, dndPieceData)
                  ? 'dnd-target'
                  : isDnDCrossCell(file, rank, dndPieceData)
                  ? 'dnd-cross-cell'
                  : 'no-highlight-cell'
              "
            />
            <BN
              v-else-if="isBlackKnightAtCell(currentPosition, file, rank)"
              :class="
                isDnDTargetCell(file, rank, dndPieceData)
                  ? 'dnd-target'
                  : isDnDCrossCell(file, rank, dndPieceData)
                  ? 'dnd-cross-cell'
                  : 'no-highlight-cell'
              "
            />
            <BB
              v-else-if="isBlackBishopAtCell(currentPosition, file, rank)"
              :class="
                isDnDTargetCell(file, rank, dndPieceData)
                  ? 'dnd-target'
                  : isDnDCrossCell(file, rank, dndPieceData)
                  ? 'dnd-cross-cell'
                  : 'no-highlight-cell'
              "
            />
            <BR
              v-else-if="isBlackRookAtCell(currentPosition, file, rank)"
              :class="
                isDnDTargetCell(file, rank, dndPieceData)
                  ? 'dnd-target'
                  : isDnDCrossCell(file, rank, dndPieceData)
                  ? 'dnd-cross-cell'
                  : 'no-highlight-cell'
              "
            />
            <BQ
              v-else-if="isBlackQueenAtCell(currentPosition, file, rank)"
              :class="
                isDnDTargetCell(file, rank, dndPieceData)
                  ? 'dnd-target'
                  : isDnDCrossCell(file, rank, dndPieceData)
                  ? 'dnd-cross-cell'
                  : 'no-highlight-cell'
              "
            />
            <BK
              v-else-if="isBlackKingAtCell(currentPosition, file, rank)"
              :class="
                isDnDTargetCell(file, rank, dndPieceData)
                  ? 'dnd-target'
                  : isDnDCrossCell(file, rank, dndPieceData)
                  ? 'dnd-cross-cell'
                  : 'no-highlight-cell'
              "
            />
            <div
              v-else-if="isDnDOriginCell(file, rank, dndPieceData)"
              :class="
                isDnDTargetCell(file, rank, dndPieceData)
                  ? 'dnd-origin'
                  : 'dnd-target'
              "
            />
            <div
              v-else
              :class="
                isDnDTargetCell(file, rank, dndPieceData)
                  ? 'dnd-target'
                  : isDnDCrossCell(file, rank, dndPieceData)
                  ? 'dnd-cross-cell'
                  : 'no-highlight-cell'
              "
            />
          </div>
        </template>
        <!-- cells -->

        <!-- right coordinate -->
        <p v-if="props.coordinatesVisible" class="coordinate">
          {{ String.fromCharCode("1".charCodeAt(0) + rank) }}
        </p>
        <div v-else />
        <!-- right coordinate-->
      </template>
      <!-- medium lines -->

      <!-- bottom coordinates -->
      <div />
      <template v-for="file in fileIndexes">
        <p v-if="props.coordinatesVisible" class="coordinate">
          {{ String.fromCharCode("A".charCodeAt(0) + file) }}
        </p>
        <div v-else />
      </template>
      <div class="player-turn-cell">
        <div
          class="player-turn"
          :class="logic.turn() === 'w' ? 'white-turn' : 'black-turn'"
        />
      </div>
      <!-- bottom coordinates -->
    </div>
    <!-- lowest layer -->

    <!-- drag and drop layer -->
    <div class="dnd-layer">
      <WP v-if="isWhitePawnDragged(dndPieceData)" class="dndPiece" />
      <WN v-else-if="isWhiteKnightDragged(dndPieceData)" class="dndPiece" />
      <WB v-else-if="isWhiteBishopDragged(dndPieceData)" class="dndPiece" />
      <WR v-else-if="isWhiteRookDragged(dndPieceData)" class="dndPiece" />
      <WQ v-else-if="isWhiteQueenDragged(dndPieceData)" class="dndPiece" />
      <WK v-else-if="isWhiteKingDragged(dndPieceData)" class="dndPiece" />
      <BP v-else-if="isBlackPawnDragged(dndPieceData)" class="dndPiece" />
      <BN v-else-if="isBlackKnightDragged(dndPieceData)" class="dndPiece" />
      <BB v-else-if="isBlackBishopDragged(dndPieceData)" class="dndPiece" />
      <BR v-else-if="isBlackRookDragged(dndPieceData)" class="dndPiece" />
      <BQ v-else-if="isBlackQueenDragged(dndPieceData)" class="dndPiece" />
      <BK v-else-if="isBlackKingDragged(dndPieceData)" class="dndPiece" />
      <div v-else />
    </div>
    <!-- drag and drop layer -->
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onUpdated } from "vue";

import { Chess } from "chess.js";
import BP from "./pieces/BP.vue";
import BN from "./pieces/BN.vue";
import BB from "./pieces/BB.vue";
import BR from "./pieces/BR.vue";
import BQ from "./pieces/BQ.vue";
import BK from "./pieces/BK.vue";
import WP from "./pieces/WP.vue";
import WN from "./pieces/WN.vue";
import WB from "./pieces/WB.vue";
import WR from "./pieces/WR.vue";
import WQ from "./pieces/WQ.vue";
import WK from "./pieces/WK.vue";

import {
  isWhitePawnAtCell,
  isWhiteKnightAtCell,
  isWhiteBishopAtCell,
  isWhiteRookAtCell,
  isWhiteQueenAtCell,
  isWhiteKingAtCell,
  isBlackPawnAtCell,
  isBlackKnightAtCell,
  isBlackBishopAtCell,
  isBlackRookAtCell,
  isBlackQueenAtCell,
  isBlackKingAtCell,
} from "./util/PiecesTest.js";

import {
  handleMouseDown,
  handleMouseExited,
  handleMouseMove,
  handleMouseUp,
  isDnDOriginCell,
  isDnDTargetCell,
  isDnDCrossCell,
  isWhitePawnDragged,
  isWhiteKnightDragged,
  isWhiteBishopDragged,
  isWhiteRookDragged,
  isWhiteQueenDragged,
  isWhiteKingDragged,
  isBlackPawnDragged,
  isBlackKnightDragged,
  isBlackBishopDragged,
  isBlackRookDragged,
  isBlackQueenDragged,
  isBlackKingDragged,
  Cell,
  DndPieceData,
  DndLocation,
} from "./util/DragAndDrop.js";

interface Move {
  start: Cell;
  end: Cell;
}

const emit = defineEmits([
  "checkmate",
  "stalemate",
  "perpetualDraw",
  "missingMaterialDraw",
  "fiftyMovesDraw",
  "waitingManualMove",
  "moveDone",
]);

const emptyPosition = "4k3/8/8/8/8/8/8/4K3 w - - 0 1";
const standardPosition =
  "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
let logic = new Chess(emptyPosition);

const updater = ref<number>(Math.random());
const currentPosition = ref(logic.fen());
const startPosition = ref<string>(emptyPosition);
const gameInProgress = ref<boolean>(false);
const playerHuman = ref<boolean>(false);
const waitingForExternalMove = ref<boolean>(false);
const dragAndDropInProgress = ref<boolean>(false);
const lastMove = ref<Move>({
  start: {
    file: -Infinity,
    rank: -Infinity,
  },
  end: {
    file: -Infinity,
    rank: -Infinity,
  },
});
const pendingPromotionMove = ref<Move>({
  start: {
    file: -Infinity,
    rank: -Infinity,
  },
  end: {
    file: -Infinity,
    rank: -Infinity,
  },
});

const props = withDefaults(
  defineProps<{
    size?: number;
    reversed?: boolean;
    background?: string;
    coordinatesVisible?: boolean;
    coordinatesColor?: string;
    whiteCellsColor?: string;
    blackCellsColor?: string;
    originCellColor?: string;
    targetCellColor?: string;
    dndCrossCellColor?: string;
    whitePlayerHuman?: boolean;
    blackPlayerHuman?: boolean;
  }>(),
  {
    size: 100,
    reversed: false,
    background: "#124589",
    coordinatesVisible: true,
    coordinatesColor: "yellow",
    whiteCellsColor: "navajowhite",
    blackCellsColor: "peru",
    originCellColor: "crimson",
    targetCellColor: "ForestGreen",
    dndCrossCellColor: "DimGrey",
    whitePlayerHuman: true,
    blackPlayerHuman: true,
  }
);

function update() {
  updater.value = Math.random();
}

const dndPieceData = ref<DndPieceData>({
  piece: "",
  originCell: {
    file: -Infinity,
    rank: -Infinity,
  },
  targetCell: {
    file: -Infinity,
    rank: -Infinity,
  },
});
const dndLocation = ref<DndLocation>({
  x: -Infinity,
  y: -Infinity,
});
const promotionPending = ref<boolean>(false);

const cellsSize = computed<number>(() => props.size / 9.0);
const halfCellsSize = computed<number>(() => cellsSize.value * 0.5);

const fontSize = computed<string>(() => `${cellsSize.value * 0.3}px`);

const globalSizePx = computed<string>(() => `${props.size}px`);
const cellsSizePx = computed<string>(() => `${cellsSize.value}px`);
const gridTemplate = computed<string>(
  () =>
    `${halfCellsSize.value}px repeat(8, ${cellsSize.value}px) ${halfCellsSize.value}px / ${halfCellsSize.value}px repeat(8, ${cellsSize.value}px) ${halfCellsSize.value}px`
);

const rootElement = ref<HTMLElement | undefined>();

const fileIndexes = computed<Array<number>>(() =>
  props.reversed ? [7, 6, 5, 4, 3, 2, 1, 0] : [0, 1, 2, 3, 4, 5, 6, 7]
);
const rankIndexes = computed<Array<number>>(() =>
  props.reversed ? [0, 1, 2, 3, 4, 5, 6, 7] : [7, 6, 5, 4, 3, 2, 1, 0]
);
const dndX = computed<string>(() => dndLocation.value.x + "px");
const dndY = computed<string>(() => dndLocation.value.y + "px");

function updateWaitingForExternalMove() {
  if (!gameInProgress.value) return;

  waitingForExternalMove.value = !playerHuman.value;

  if (waitingForExternalMove.value) emit("waitingManualMove");
}

function handleGameEndedStatus() {
  if (logic.isCheckmate()) {
    cancelDnd();
    gameInProgress.value = false;
    emit("checkmate", { whiteTurnBeforeMove: logic.turn() !== "w" });
  } else if (logic.isStalemate()) {
    cancelDnd();
    gameInProgress.value = false;
    emit("stalemate");
  } else if (logic.isThreefoldRepetition()) {
    cancelDnd();
    gameInProgress.value = false;
    emit("perpetualDraw");
  } else if (logic.isDraw()) {
    if (logic.isInsufficientMaterial()) {
      cancelDnd();
      gameInProgress.value = false;
      emit("missingMaterialDraw");
    } else {
      cancelDnd();
      gameInProgress.value = false;
      emit("fiftyMovesDraw");
    }
  }
}

function setupDnd(
  x: number,
  y: number,
  file: number,
  rank: number,
  piece: string
) {
  dndLocation.value = {
    x,
    y,
  };

  dndPieceData.value = {
    piece,
    originCell: { file, rank },
    targetCell: { file, rank },
  };

  dragAndDropInProgress.value = true;
}

function cancelDnd() {
  dragAndDropInProgress.value = false;
  dndPieceData.value = {
    piece: "",
    originCell: {
      file: -Infinity,
      rank: -Infinity,
    },
    targetCell: {
      file: -Infinity,
      rank: -Infinity,
    },
  };
  dndLocation.value = { x: -Infinity, y: -Infinity };
}

function updatePlayerHuman() {
  if (!gameInProgress.value) {
    playerHuman.value = false;
    return;
  }

  const whiteTurn = logic.turn() === "w";
  playerHuman.value =
    (whiteTurn && props.whitePlayerHuman) ||
    (!whiteTurn && props.blackPlayerHuman);
}

function newGame(startPositionFen: string | undefined = standardPosition) {
  logic = new Chess(startPositionFen);
  update();
  startPosition.value = startPositionFen;
  cancelDnd();
  gameInProgress.value = true;
  handleGameEndedStatus();
  updatePlayerHuman();
  updateWaitingForExternalMove();
}

function convertMoveSanToMoveFan(moveSan: string, whiteTurn: boolean) {
  moveSan = moveSan
    .replace(/K/g, whiteTurn ? "\u2654" : "\u265A")
    .normalize("NFKC");
  moveSan = moveSan
    .replace(/Q/g, whiteTurn ? "\u2655" : "\u265B")
    .normalize("NFKC");
  moveSan = moveSan
    .replace(/R/g, whiteTurn ? "\u2656" : "\u265C")
    .normalize("NFKC");
  moveSan = moveSan
    .replace(/B/g, whiteTurn ? "\u2657" : "\u265D")
    .normalize("NFKC");
  moveSan = moveSan
    .replace(/N/g, whiteTurn ? "\u2658" : "\u265E")
    .normalize("NFKC");

  return moveSan;
}

function updateAndEmitLastMove(
  startFile: number,
  startRank: number,
  endFile: number,
  endRank: number,
  logicBeforeMove: Chess,
  logicAfterMove: Chess
) {
  lastMove.value = {
    start: {
      file: startFile,
      rank: startRank,
    },
    end: {
      file: endFile,
      rank: endRank,
    },
  };

  const moveNumber = logicBeforeMove.fen().split(" ")[5];
  const allMovesHistory = logicAfterMove.history();
  const whiteTurnBeforeMove = logicBeforeMove.turn() === "w";
  const moveSan = allMovesHistory[allMovesHistory.length - 1];
  const moveFan = convertMoveSanToMoveFan(moveSan, whiteTurnBeforeMove);

  const lastMoveEventPayload = {
    moveNumber,
    whiteTurn: whiteTurnBeforeMove,
    moveSan,
    moveFan,
    positionFen: logicAfterMove.fen(),
    fromFileIndex: startFile,
    fromRankIndex: startRank,
    toFileIndex: endFile,
    toRankIndex: endRank,
  };

  emit("moveDone", { moveObject: lastMoveEventPayload });
}

function updateDndLocation(x: number, y: number, file: number, rank: number) {
  dndLocation.value = {
    x,
    y,
  };

  dndPieceData.value.targetCell.file = file;
  dndPieceData.value.targetCell.rank = rank;
}

function setPromotionPending(
  startFile: number,
  startRank: number,
  endFile: number,
  endRank: number
) {
  promotionPending.value = true;
  pendingPromotionMove.value = {
    start: {
      file: startFile,
      rank: startRank,
    },
    end: {
      file: endFile,
      rank: endRank,
    },
  };
}

function reactToMouseDown(e: MouseEvent) {
  e.preventDefault();
  handleMouseDown(
    e,
    cellsSize.value,
    props.reversed,
    rootElement.value,
    currentPosition.value,
    setupDnd,
    gameInProgress.value,
    waitingForExternalMove.value,
    playerHuman.value
  );
}

function reactToMouseMove(e: MouseEvent) {
  e.preventDefault();
  handleMouseMove(
    e,
    dragAndDropInProgress.value,
    updateDndLocation,
    rootElement.value,
    cancelDnd,
    cellsSize.value,
    props.reversed,
    promotionPending.value,
    gameInProgress.value,
    waitingForExternalMove.value,
    playerHuman.value
  );
}

function reactToMouseUp(e: MouseEvent) {
  e.preventDefault();
  handleMouseUp(
    e,
    cellsSize.value,
    props.reversed,
    rootElement.value,
    logic,
    dragAndDropInProgress.value,
    dndPieceData.value,
    cancelDnd,
    update,
    updateAndEmitLastMove,
    promotionPending.value,
    setPromotionPending,
    gameInProgress.value,
    handleGameEndedStatus,
    updateWaitingForExternalMove,
    waitingForExternalMove.value,
    playerHuman.value
  );
}

function reactToMouseExited(e: MouseEvent) {
  e.preventDefault();
  handleMouseExited(
    e,
    cancelDnd,
    promotionPending.value,
    gameInProgress.value,
    waitingForExternalMove.value,
    playerHuman.value
  );
}

onUpdated(() => {
  currentPosition.value = logic.fen();
});

defineExpose({
  newGame,
});
</script>

<style scoped>
.root {
  position: relative;
  display: inline-block;
  width: v-bind(globalSizePx);
  height: v-bind(globalSizePx);
  background-color: v-bind(background);
}

.lowest-layer {
  position: absolute;
  display: grid;
  left: 0;
  top: 0;
  width: v-bind(globalSizePx);
  height: v-bind(globalSizePx);
  grid-template: v-bind(gridTemplate);
}

.last-move-layer {
  position: absolute;
  left: 0;
  top: 0;
}

.dnd-layer {
  position: absolute;
  left: 0;
  top: 0;
}

.promotion-overlay-layer {
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0.8;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
}

.promotion-layer {
  position: absolute;
  left: 0;
  top: 0;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.promotion-title {
  font-weight: bold;
  color: black;
}

.promotion-buttons {
  display: flex;
  justify-content: center;
  align-items: center;
}

.cell {
  display: flex;
  justify-content: center;
  align-items: center;
}

.cell.white {
  background-color: v-bind(whiteCellsColor);
}

.cell.black {
  background-color: v-bind(blackCellsColor);
}

.coordinate {
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: v-bind(fontSize);
  color: v-bind(coordinatesColor);
}

.dndPiece {
  position: absolute;
  left: v-bind(dndX);
  top: v-bind(dndY);
  width: v-bind(cellsSizePx);
  height: v-bind(cellsSizePx);
}

.last-move-line {
  position: absolute;
}

.player-turn-cell {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90%;
  height: 90%;
}

.player-turn {
  border-radius: 50%;
  width: 100%;
  height: 100%;
}

.white-turn {
  background-color: white;
}

.black-turn {
  background-color: black;
}

.dnd-orig {
  background-color: v-bind(originCellColor);
  width: v-bind(cellsSizePx);
  height: v-bind(cellsSizePx);
}

.dnd-target {
  background-color: v-bind(targetCellColor);
  width: v-bind(cellsSizePx);
  height: v-bind(cellsSizePx);
}

.dnd-cross-cell {
  background-color: v-bind(dndCrossCellColor);
  width: v-bind(cellsSizePx);
  height: v-bind(cellsSizePx);
}

.no-highlight-cell {
  width: v-bind(cellsSizePx);
  height: v-bind(cellsSizePx);
}
</style>
