<template>
  <div id="echarts-map" ref="mapRef" class="h-300px w-300px"></div>
</template>

<script setup lang="ts">
import { onMounted, shallowRef } from "vue";
import * as echarts from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { MapChart } from "echarts/charts";

import guangdong from "@/data/guangdong.json";
import { polylineStringToGeoJSON } from "./utils";

echarts.use([MapChart, CanvasRenderer]);

const mapRef = shallowRef<HTMLDivElement>();
const guangdongGeoJSON = polylineStringToGeoJSON(guangdong.polyline);
console.log(guangdongGeoJSON);
echarts.registerMap("china", guangdongGeoJSON as any);
onMounted(() => {
  const echart = echarts.init(mapRef.value!);
  echart.setOption({
    series: [
      {
        name: "USA PopEstimates",
        type: "map",
        roam: true,
        map: "china",
        emphasis: {
          label: {
            show: true,
          },
        },
      },
    ],
  });
});
</script>
