<template>
  <div class="root" ref="rootElement"></div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

const props = withDefaults(
  defineProps<{
    size?: number;
    background?: string;
  }>(),
  {
    size: 100,
    background: "#124589",
  }
);

const globalSize = computed<string>(() => `${props.size}px`);

const rootElement = ref<HTMLElement|undefined>();
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

.coordinate {
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
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
