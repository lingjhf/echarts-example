<template>
  <div id="echarts-map"></div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import * as echarts from 'echarts/core'

onMounted(()=>{
  echarts.init()
})

</script>

<style scoped></style>
