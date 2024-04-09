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
          ></div>
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
      <div />
      <!-- bottom coordinates -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

const props = withDefaults(
  defineProps<{
    size?: number;
    reversed?: boolean;
    background?: string;
    coordinatesVisible?: boolean;
    coordinatesColor?: string;
    whiteCellsColor?: string;
    blackCellsColor?: string;
  }>(),
  {
    size: 100,
    reversed: false,
    background: "#124589",
    coordinatesVisible: true,
    coordinatesColor: "yellow",
    whiteCellsColor: "navajowhite",
    blackCellsColor: "peru",
  }
);

const cellsSize = computed<number>(() => props.size / 9.0);
const halfCellsSize = computed<number>(() => cellsSize.value * 0.5);

const fontSize = computed<string>(() => `${cellsSize.value * 0.3}px`);

const globalSize = computed<string>(() => `${props.size}px`);
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
  width: v-bind(globalSize);
  height: v-bind(globalSize);
  background-color: v-bind(background);
}

.lowest-layer {
  position: absolute;
  display: grid;
  left: 0;
  top: 0;
  width: v-bind(globalSize);
  height: v-bind(globalSize);
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
</style>
