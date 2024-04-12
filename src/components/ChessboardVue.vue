<template>
  <div class="root" ref="rootElement">
    <!-- inner layer-->
    <div
      class="inner-layer"
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

      <!-- last move arrow -->
      <div v-if="lastMoveVisible" class="last-move-layer">
        <div class="last-move-line last-move-base-line" />
        <div class="last-move-line last-move-arrow-1" />
        <div class="last-move-line last-move-arrow-2" />
        <div class="last-move-line last-move-arrow-point" />
      </div>
      <!-- last move arrow -->

      <!-- drag and drop layer -->
      <div class="dnd-layer">
        <WP
          v-if="isWhitePawnDragged(dndPieceData) && !promotionPending"
          class="dndPiece"
        />
        <WN v-else-if="isWhiteKnightDragged(dndPieceData)" class="dndPiece" />
        <WB v-else-if="isWhiteBishopDragged(dndPieceData)" class="dndPiece" />
        <WR v-else-if="isWhiteRookDragged(dndPieceData)" class="dndPiece" />
        <WQ v-else-if="isWhiteQueenDragged(dndPieceData)" class="dndPiece" />
        <WK v-else-if="isWhiteKingDragged(dndPieceData)" class="dndPiece" />
        <BP
          v-else-if="isBlackPawnDragged(dndPieceData) && !promotionPending"
          class="dndPiece"
        />
        <BN v-else-if="isBlackKnightDragged(dndPieceData)" class="dndPiece" />
        <BB v-else-if="isBlackBishopDragged(dndPieceData)" class="dndPiece" />
        <BR v-else-if="isBlackRookDragged(dndPieceData)" class="dndPiece" />
        <BQ v-else-if="isBlackQueenDragged(dndPieceData)" class="dndPiece" />
        <BK v-else-if="isBlackKingDragged(dndPieceData)" class="dndPiece" />
        <div v-else />
      </div>
      <!-- drag and drop layer -->
    </div>
    <!-- promotion layer -->
    <div v-if="promotionPending" class="promotion-overlay-layer">
      <div class="promotion-layer">
        <div class="promotion-buttons">
          <template v-if="logic.turn() === 'w'">
            <WQ
              :size="cellsSize"
              class="single-promotion-button"
              @click="() => commitPromotionMove('q')"
            />
            <WR
              :size="cellsSize"
              class="single-promotion-button"
              @click="() => commitPromotionMove('r')"
            />
            <WB
              :size="cellsSize"
              class="single-promotion-button"
              @click="() => commitPromotionMove('b')"
            />
            <WN
              :size="cellsSize"
              class="single-promotion-button"
              @click="() => commitPromotionMove('n')"
            />
            <Cross
              :size="cellsSize"
              class="single-promotion-button"
              @click="() => cancelPromotion()"
            />
          </template>
          <template v-else>
            <BQ
              :size="cellsSize"
              class="single-promotion-button"
              @click="() => commitPromotionMove('q')"
            />
            <BR
              :size="cellsSize"
              class="single-promotion-button"
              @click="() => commitPromotionMove('r')"
            />
            <BB
              :size="cellsSize"
              class="single-promotion-button"
              @click="() => commitPromotionMove('b')"
            />
            <BN
              :size="cellsSize"
              class="single-promotion-button"
              @click="() => commitPromotionMove('n')"
            />
            <Cross
              :size="cellsSize"
              class="single-promotion-button"
              @click="() => cancelPromotion()"
            />
          </template>
        </div>
      </div>
    </div>
    <!-- promotion layer -->
    <!--inner layer -->
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
import Cross from "./pieces/Cross.vue";

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
  cellAlgebraic,
} from "./util/PiecesTest.js";

import {
  buildMoveObject,
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

export interface Move {
  start: Cell;
  end: Cell;
}

const emit = defineEmits<{
  checkmate: [byWhite: boolean];
  stalemate: [];
  perpetualDraw: [];
  missingMaterialDraw: [];
  fiftyMovesDraw: [];
  waitingManualMove: [];
  moveDone: [
    moveNumber: number,
    whiteTurn: boolean,
    moveSan: string,
    moveFan: string,
    resultingPosition: string,
    move: Move,
  ];
}>();

const emptyPosition = "4k3/8/8/8/8/8/8/4K3 w - - 0 1";
const standardPosition =
  "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
let logic = new Chess(emptyPosition);

const currentPosition = ref(logic.fen());
const startPosition = ref<string>(emptyPosition);
const gameInProgress = ref<boolean>(false);
const playerHuman = ref<boolean>(false);
const waitingForExternalMove = ref<boolean>(false);
const dragAndDropInProgress = ref<boolean>(false);
const lastMove = ref<Move>({
  start: {
    file: -100,
    rank: -100,
  },
  end: {
    file: -100,
    rank: -100,
  },
});
const pendingPromotionMove = ref<Move>({
  start: {
    file: -100,
    rank: -100,
  },
  end: {
    file: -100,
    rank: -100,
  },
});

const lastMoveBaselineLeft = ref<string>("0px");
const lastMoveBaselineTop = ref<string>("0px");
const lastMoveBaselineWidth = ref<string>("0px");
const lastMoveBaselineHeight = ref<string>("0px");
const lastMoveBaselineTransform = ref<string>("");
const lastMoveBaselineTransformOrigin = ref<string>("center");

const lastMoveArrow1Left = ref<string>("0px");
const lastMoveArrow1Top = ref<string>("0px");
const lastMoveArrow1Width = ref<string>("0px");
const lastMoveArrow1Height = ref<string>("0px");
const lastMoveArrow1Transform = ref<string>("");
const lastMoveArrow1TransformOrigin = ref<string>("center");

const lastMoveArrow2Left = ref<string>("0px");
const lastMoveArrow2Top = ref<string>("0px");
const lastMoveArrow2Width = ref<string>("0px");
const lastMoveArrow2Height = ref<string>("0px");
const lastMoveArrow2Transform = ref<string>("");
const lastMoveArrow2TransformOrigin = ref<string>("center");

const lastMovePointLeft = ref<string>("0px");
const lastMovePointTop = ref<string>("0px");
const lastMovePointWidth = ref<string>("0px");
const lastMovePointHeight = ref<string>("0px");
const lastMovePointTransform = ref<string>("");
const lastMovePointTransformOrigin = ref<string>("center");

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
    moveHighlightColor?: string;
    whitePlayerHuman?: boolean;
    blackPlayerHuman?: boolean;
    lastMoveVisible?: boolean;
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
    moveHighlightColor: "CadetBlue",
    whitePlayerHuman: true,
    blackPlayerHuman: true,
    lastMoveVisible: true,
  }
);

function update() {
  currentPosition.value = logic.fen();
}

const dndPieceData = ref<DndPieceData>({
  piece: "",
  originCell: {
    file: -100,
    rank: -100,
  },
  targetCell: {
    file: -100,
    rank: -100,
  },
});
const dndLocation = ref<DndLocation>({
  x: -100,
  y: -100,
});
const promotionPending = ref<boolean>(false);

const cellsSize = computed<number>(() => props.size / 9.0);
const halfCellsSize = computed<number>(() => cellsSize.value * 0.5);

const fontSize = computed<string>(() => `${cellsSize.value * 0.3}px`);

const globalSizePx = computed<string>(() => `${props.size}px`);
const cellsSizePx = computed<string>(() => `${cellsSize.value}px`);
const promotionStyleWidthPx = computed<string>(() => `${props.size * 0.8}px`);
const promotionStyleHeightPx = computed<string>(() => `${props.size * 0.6}px`);
const promotionButtonBorder = computed<string>(
  () => `${cellsSize.value * 0.08}px solid black`
);
const promotionButtonPadding = computed<string>(
  () => `${cellsSize.value * 0.01}px`
);
const promotionButtonMargin = computed<string>(
  () => `${cellsSize.value * 0.02}px`
);
const gridTemplate = computed<string>(
  () =>
    `${halfCellsSize.value}px repeat(8, ${cellsSize.value}px) ${halfCellsSize.value}px / ${halfCellsSize.value}px repeat(8, ${cellsSize.value}px) ${halfCellsSize.value}px`
);
const halfThickness = computed(() => cellsSize.value * 0.08);

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
    emit("checkmate", logic.turn() !== "w");
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
      file: -100,
      rank: -100,
    },
    targetCell: {
      file: -100,
      rank: -100,
    },
  };
  dndLocation.value = { x: -100, y: -100 };
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
  clearLastMoveArrow();
  startPosition.value = startPositionFen;
  promotionPending.value = false;
  cancelDnd();
  gameInProgress.value = true;
  handleGameEndedStatus();
  updatePlayerHuman();
  updateWaitingForExternalMove();
}

function stop() {
  cancelDnd();
  waitingForExternalMove.value = false;
  promotionPending.value = false;
  gameInProgress.value = false;
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

  updateLastMoveArrow();

  const moveNumber = parseInt(logicBeforeMove.fen().split(" ")[5]);
  const allMovesHistory = logicAfterMove.history();
  const whiteTurnBeforeMove = logicBeforeMove.turn() === "w";
  const moveSan = allMovesHistory[allMovesHistory.length - 1];
  const moveFan = convertMoveSanToMoveFan(moveSan, whiteTurnBeforeMove);

  emit(
    "moveDone",
    moveNumber,
    whiteTurnBeforeMove,
    moveSan,
    moveFan,
    logicAfterMove.fen(),
    {
      start: {
        file: startFile,
        rank: startRank,
      },
      end: {
        file: endFile,
        rank: endRank
      }
    }
  );
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

function commitPromotionMove(type: string) {
  const moveObject = {
    from: cellAlgebraic(
      pendingPromotionMove.value.start.file,
      pendingPromotionMove.value.start.rank
    ),
    to: cellAlgebraic(
      pendingPromotionMove.value.end.file,
      pendingPromotionMove.value.end.rank
    ),
    promotion: type,
  };

  const logicBeforeMove = new Chess(logic.fen());

  logic.move(moveObject);
  update();

  cancelDnd();

  const {
    start: { file: startFile, rank: startRank },
    end: { file: endFile, rank: endRank },
  } = pendingPromotionMove.value;

  pendingPromotionMove.value = {
    start: {
      file: -100,
      rank: -100,
    },
    end: {
      file: -100,
      rank: -100,
    },
  };
  promotionPending.value = false;

  handleGameEndedStatus();

  updateAndEmitLastMove(
    startFile,
    startRank,
    endFile,
    endRank,
    logicBeforeMove,
    logic
  );

  updatePlayerHuman();
  updateWaitingForExternalMove();
}

function cancelPromotion() {
  promotionPending.value = false;
  pendingPromotionMove.value = {
    start: {
      file: -100,
      rank: -100,
    },
    end: {
      file: -100,
      rank: -100,
    },
  };
  cancelDnd();
}

/*
If you pass a string, you must give a move as UCI format,
for example b1c3 or even a7a8q.
*/
function playManualMove(
  inputMove: string | { to: string; from: string; promotion?: string }
): boolean {
  if (!gameInProgress.value) return false;
  if (!waitingForExternalMove.value) return false;

  const logicBeforeMove = new Chess(logic.fen());

  let startFile: number,
    startRank: number,
    endFile: number,
    endRank: number,
    promotion: string | undefined;

  if (typeof inputMove === "string") {
    startFile = inputMove.charCodeAt(0) - "a".charCodeAt(0);
    startRank = inputMove.charCodeAt(1) - "1".charCodeAt(0);
    endFile = inputMove.charCodeAt(2) - "a".charCodeAt(0);
    endRank = inputMove.charCodeAt(3) - "1".charCodeAt(0);
    promotion = inputMove.length >= 5 ? inputMove.charAt(4) : undefined;
  } else {
    startFile = inputMove.from.charCodeAt(0) - "a".charCodeAt(0);
    startRank = inputMove.from.charCodeAt(1) - "1".charCodeAt(0);
    endFile = inputMove.to.charCodeAt(0) - "a".charCodeAt(0);
    endRank = inputMove.to.charCodeAt(1) - "1".charCodeAt(0);
    promotion = inputMove.promotion;
  }

  const moveObject = buildMoveObject(
    startFile,
    startRank,
    endFile,
    endRank,
    promotion
  );

  try {
    logic.move(moveObject);
  } catch (ex: any) {
    return false;
  }

  update();

  updateAndEmitLastMove(
    startFile,
    startRank,
    endFile,
    endRank,
    logicBeforeMove,
    logic
  );

  handleGameEndedStatus();

  updatePlayerHuman();
  updateWaitingForExternalMove();

  return true;
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
    playerHuman.value,
    updatePlayerHuman
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

function isWhiteTurn(): boolean {
  return logic.turn() === "w";
}

function clearLastMoveArrow() {
  lastMove.value = {
    start: {
      file: -100,
      rank: -100,
    },
    end: {
      file: -100,
      rank: -100,
    },
  };
  lastMoveBaselineLeft.value = `0px`;
  lastMoveBaselineTop.value = `0px`;
  lastMoveBaselineWidth.value = `0px`;
  lastMoveBaselineHeight.value = `0px`;
  lastMoveBaselineTransform.value = ``;
  lastMoveBaselineTransformOrigin.value = `0px 0px`;

  lastMoveArrow1Left.value = `0px`;
  lastMoveArrow1Top.value = `0px`;
  lastMoveArrow1Width.value = `0px`;
  lastMoveArrow1Height.value = `0px`;
  lastMoveArrow1Transform.value = ``;
  lastMoveArrow1TransformOrigin.value = `0px 0px`;

  lastMoveArrow2Left.value = `0px`;
  lastMoveArrow2Top.value = `0px`;
  lastMoveArrow2Width.value = `0px`;
  lastMoveArrow2Height.value = `0px`;
  lastMoveArrow2Transform.value = `)`;
  lastMoveArrow2TransformOrigin.value = `0px 0px`;

  lastMovePointLeft.value = `0px`;
  lastMovePointTop.value = `0px`;
  lastMovePointWidth.value = `0px`;
  lastMovePointHeight.value = `0px`;
  lastMovePointTransform.value = ``;
  lastMovePointTransformOrigin.value = "center";
}

function updateLastMoveArrow() {
  const startColumn = props.reversed
    ? 7 - lastMove.value.start.file
    : lastMove.value.start.file;
  const startLine = props.reversed
    ? lastMove.value.start.rank
    : 7 - lastMove.value.start.rank;
  const endColumn = props.reversed
    ? 7 - lastMove.value.end.file
    : lastMove.value.end.file;
  const endLine = props.reversed
    ? lastMove.value.end.rank
    : 7 - lastMove.value.end.rank;

  const ax = cellsSize.value * (startColumn + 1.0);
  const ay = cellsSize.value * (startLine + 1.0);
  const bx = cellsSize.value * (endColumn + 1.0);
  const by = cellsSize.value * (endLine + 1.0);

  const realAx = ax - halfThickness.value;
  const realAy = ay;
  const realBx = bx - halfThickness.value;
  const realBy = by;

  const vectX = realBx - realAx;
  const vectY = realBy - realAy;

  const baseLineAngleRad = Math.atan2(vectY, vectX) - Math.PI / 2.0;
  const baseLineLength = Math.sqrt(vectX * vectX + vectY * vectY);
  lastMoveBaselineLeft.value = `${realAx}px`;
  lastMoveBaselineTop.value = `${realAy}px`;
  lastMoveBaselineWidth.value = `${2 * halfThickness.value}px`;
  lastMoveBaselineHeight.value = `${baseLineLength}px`;
  lastMoveBaselineTransform.value = `rotate(${baseLineAngleRad}rad)`;
  lastMoveBaselineTransformOrigin.value = `${halfThickness.value}px ${0}px`;

  const arrow1AngleRad =
    Math.atan2(vectY, vectX) - Math.PI / 2.0 - (3 * Math.PI) / 4.0;
  const arrow1Length = Math.sqrt(vectX * vectX + vectY * vectY) * 0.4;
  lastMoveArrow1Left.value = `${realBx}px`;
  lastMoveArrow1Top.value = `${realBy}px`;
  lastMoveArrow1Width.value = `${2 * halfThickness.value}px`;
  lastMoveArrow1Height.value = `${arrow1Length}px`;
  lastMoveArrow1Transform.value = `rotate(${arrow1AngleRad}rad)`;
  lastMoveArrow1TransformOrigin.value = `${halfThickness.value}px ${0}px`;

  const arrow2AngleRad =
    Math.atan2(vectY, vectX) - Math.PI / 2.0 + (3 * Math.PI) / 4.0;
  const arrow2Length = Math.sqrt(vectX * vectX + vectY * vectY) * 0.4;
  lastMoveArrow2Left.value = `${realBx}px`;
  lastMoveArrow2Top.value = `${realBy}px`;
  lastMoveArrow2Width.value = `${2 * halfThickness.value}px`;
  lastMoveArrow2Height.value = `${arrow2Length}px`;
  lastMoveArrow2Transform.value = `rotate(${arrow2AngleRad}rad)`;
  lastMoveArrow2TransformOrigin.value = `${halfThickness.value}px ${0}px`;

  const pointAngleRad = Math.atan2(vectY, vectX) + Math.PI / 4.0;
  const pointLength = 2 * halfThickness.value;
  lastMovePointLeft.value = `${realBx}px`;
  lastMovePointTop.value = `${realBy}px`;
  lastMovePointWidth.value = `${2 * halfThickness.value}px`;
  lastMovePointHeight.value = `${pointLength}px`;
  lastMovePointTransform.value = `rotate(${pointAngleRad}rad)`;
  lastMovePointTransformOrigin.value = "center";
}

function gameIsInProgress(): boolean {
  return gameInProgress.value;
}

function setStartPosition(): boolean {
  if (gameInProgress.value) return false;

  logic = new Chess(startPosition.value);
  clearLastMoveArrow();
  update();
  return true;
}

function setPositionAndLastMove(positionFen: string, move: Move): boolean {
  if (gameInProgress.value) return false;

  logic = new Chess(positionFen);
  lastMove.value = move;
  updateLastMoveArrow();
  update();
  
  return true;
}

function getCurrentPosition(): string {
  return logic.fen();
}

onUpdated(() => updateLastMoveArrow());

defineExpose({
  newGame,
  isWhiteTurn,
  stop,
  playManualMove,
  gameIsInProgress,
  setPositionAndLastMove,
  setStartPosition,
  getCurrentPosition,
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

.inner-layer {
  position: absolute;
  left: 0;
  right: 0;
  width: v-bind(globalSizePx);
  height: v-bind(globalSizePx);
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
  width: v-bind(globalSizePx);
  height: v-bind(globalSizePx);
}

.dnd-layer {
  position: absolute;
  left: 0;
  top: 0;
  width: v-bind(globalSizePx);
  height: v-bind(globalSizePx);
}

.promotion-overlay-layer {
  position: absolute;
  left: 0;
  top: 0;
  width: v-bind(globalSizePx);
  height: v-bind(globalSizePx);
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
  width: v-bind(globalSizePx);
  height: v-bind(globalSizePx);
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.promotion-buttons {
  display: flex;
  justify-content: center;
  align-items: center;
  width: v-bind(promotionStyleWidthPx);
  height: v-bind(promotionStyleHeightPx);
}

.single-promotion-button {
  border: v-bind(promotionButtonBorder);
  padding: v-bind(promotionButtonPadding);
  margin: v-bind(promotionButtonMargin);
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

.last-move-base-line {
  left: v-bind(lastMoveBaselineLeft);
  top: v-bind(lastMoveBaselineTop);
  width: v-bind(lastMoveBaselineWidth);
  height: v-bind(lastMoveBaselineHeight);
  transform: v-bind(lastMoveBaselineTransform);
  -ms-transform: v-bind(lastMoveBaselineTransform);
  -moz-transform: v-bind(lastMoveBaselineTransform);
  -webkit-transform: v-bind(lastMoveBaselineTransform);
  transform-origin: v-bind(lastMoveBaselineTransformOrigin);
  -ms-transform-origin: v-bind(lastMoveBaselineTransformOrigin);
  -moz-transform-origin: v-bind(lastMoveBaselineTransformOrigin);
  -webkit-transform-origin: v-bind(lastMoveBaselineTransformOrigin);
  background-color: v-bind(moveHighlightColor);
}

.last-move-arrow-1 {
  left: v-bind(lastMoveArrow1Left);
  top: v-bind(lastMoveArrow1Top);
  width: v-bind(lastMoveArrow1Width);
  height: v-bind(lastMoveArrow1Height);
  transform: v-bind(lastMoveArrow1Transform);
  -ms-transform: v-bind(lastMoveArrow1Transform);
  -moz-transform: v-bind(lastMoveArrow1Transform);
  -webkit-transform: v-bind(lastMoveArrow1Transform);
  transform-origin: v-bind(lastMoveArrow1TransformOrigin);
  -ms-transform-origin: v-bind(lastMoveArrow1TransformOrigin);
  -moz-transform-origin: v-bind(lastMoveArrow1TransformOrigin);
  -webkit-transform-origin: v-bind(lastMoveArrow1TransformOrigin);
  background-color: v-bind(moveHighlightColor);
}

.last-move-arrow-2 {
  left: v-bind(lastMoveArrow2Left);
  top: v-bind(lastMoveArrow2Top);
  width: v-bind(lastMoveArrow2Width);
  height: v-bind(lastMoveArrow2Height);
  transform: v-bind(lastMoveArrow2Transform);
  -ms-transform: v-bind(lastMoveArrow2Transform);
  -moz-transform: v-bind(lastMoveArrow2Transform);
  -webkit-transform: v-bind(lastMoveArrow2Transform);
  transform-origin: v-bind(lastMoveArrow2TransformOrigin);
  -ms-transform-origin: v-bind(lastMoveArrow2TransformOrigin);
  -moz-transform-origin: v-bind(lastMoveArrow2TransformOrigin);
  -webkit-transform-origin: v-bind(lastMoveArrow2TransformOrigin);
  background-color: v-bind(moveHighlightColor);
}

.last-move-point {
  left: v-bind(lastMovePointLeft);
  top: v-bind(lastMovePointTop);
  width: v-bind(lastMovePointWidth);
  height: v-bind(lastMovePointHeight);
  transform: v-bind(lastMovePointTransform);
  -ms-transform: v-bind(lastMovePointTransform);
  -moz-transform: v-bind(lastMovePointTransform);
  -webkit-transform: v-bind(lastMovePointTransform);
  transform-origin: v-bind(lastMovePointTransformOrigin);
  -ms-transform-origin: v-bind(lastMovePointTransformOrigin);
  -moz-transform-origin: v-bind(lastMovePointTransformOrigin);
  -webkit-transform-origin: v-bind(lastMovePointTransformOrigin);
  background-color: v-bind(moveHighlightColor);
}
</style>
