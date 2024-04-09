<script setup lang="ts">
import ChessboardVue from './components/ChessboardVue.vue'
</script>

<template>
  <h2>Chessboard test</h2>
  <ChessboardVue :size="300" />
  ||
  <ChessboardVue :size="500" reversed/>
</template>

<style scoped>
</style>
