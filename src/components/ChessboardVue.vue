<template>
  <div class="root" ref="rootElement">
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
          v-if="isDnDOriginCell(dndPieceData, file, rank)"
          :class="(targetFile !== file || targetRank !== rank) ? 'dnd-orig' : 'dnd-target'">

          </div>
            <WP
              v-else-if="isWhitePawnAtCell(logic, file, rank)"
              :class="
                targetFile === file && targetRank === rank
                  ? 'dnd-target'
                  : targetFile === file || targetRank === rank
                  ? 'dnd-cross-cell'
                  : 'no-highlight-cell'
              "
            />
            <WN
              v-else-if="isWhiteKnightAtCell(logic, file, rank)"
              :class="
                targetFile === file && targetRank === rank
                  ? 'dnd-target'
                  : targetFile === file || targetRank === rank
                  ? 'dnd-cross-cell'
                  : 'no-highlight-cell'
              "
            />
            <WB
              v-else-if="isWhiteBishopAtCell(logic, file, rank)"
              :class="
                targetFile === file && targetRank === rank
                  ? 'dnd-target'
                  : targetFile === file || targetRank === rank
                  ? 'dnd-cross-cell'
                  : 'no-highlight-cell'
              "
            />
            <WR
              v-else-if="isWhiteRookAtCell(logic, file, rank)"
              :class="
                targetFile === file && targetRank === rank
                  ? 'dnd-target'
                  : targetFile === file || targetRank === rank
                  ? 'dnd-cross-cell'
                  : 'no-highlight-cell'
              "
            />
            <WQ
              v-else-if="isWhiteQueenAtCell(logic, file, rank)"
              :class="
                targetFile === file && targetRank === rank
                  ? 'dnd-target'
                  : targetFile === file || targetRank === rank
                  ? 'dnd-cross-cell'
                  : 'no-highlight-cell'
              "
            />
            <WK
              v-else-if="isWhiteKingAtCell(logic, file, rank)"
              :class="
                targetFile === file && targetRank === rank
                  ? 'dnd-target'
                  : targetFile === file || targetRank === rank
                  ? 'dnd-cross-cell'
                  : 'no-highlight-cell'
              "
            />
            <BP
              v-else-if="isBlackPawnAtCell(logic, file, rank)"
              :class="
                targetFile === file && targetRank === rank
                  ? 'dnd-target'
                  : targetFile === file || targetRank === rank
                  ? 'dnd-cross-cell'
                  : 'no-highlight-cell'
              "
            />
            <BN
              v-else-if="isBlackKnightAtCell(logic, file, rank)"
              :class="
                targetFile === file && targetRank === rank
                  ? 'dnd-target'
                  : targetFile === file || targetRank === rank
                  ? 'dnd-cross-cell'
                  : 'no-highlight-cell'
              "
            />
            <BB
              v-else-if="isBlackBishopAtCell(logic, file, rank)"
              :class="
                targetFile === file && targetRank === rank
                  ? 'dnd-target'
                  : targetFile === file || targetRank === rank
                  ? 'dnd-cross-cell'
                  : 'no-highlight-cell'
              "
            />
            <BR
              v-else-if="isBlackRookAtCell(logic, file, rank)"
              :class="
                targetFile === file && targetRank === rank
                  ? 'dnd-target'
                  : targetFile === file || targetRank === rank
                  ? 'dnd-cross-cell'
                  : 'no-highlight-cell'
              "
            />
            <BQ
              v-else-if="isBlackQueenAtCell(logic, file, rank)"
              :class="
                targetFile === file && targetRank === rank
                  ? 'dnd-target'
                  : targetFile === file || targetRank === rank
                  ? 'dnd-cross-cell'
                  : 'no-highlight-cell'
              "
            />
            <BK
              v-else-if="isBlackKingAtCell(logic, file, rank)"
              :class="
                targetFile === file && targetRank === rank
                  ? 'dnd-target'
                  : targetFile === file || targetRank === rank
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
        class="player-turn" :class="logic.turn() === 'w' ? 'white-turn' : 'black-turn'"
      />
    </div>
      <!-- bottom coordinates -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

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
  cellAlgebraic,
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
} from "./util/PiecesTest.ts";

import {
    handleMouseDown,
    handleMouseExited,
    handleMouseMove,
    handleMouseUp,
    isDnDOriginCell,
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
  } from "./util/DragAndDrop.js";

const emptyPosition = "4k3/8/8/8/8/8/8/4K3 w - - 0 1";
let logic = new Chess(emptyPosition);

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
  }
);

const targetFile = ref<number | undefined>();
const targetRank = ref<number | undefined>();
const dndPieceData = ref<DndPieceData | undefined>();

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
