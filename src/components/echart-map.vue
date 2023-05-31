<template>
  <div id="echarts-map" ref="mapRef" class="h-300px w-300px"></div>
</template>

<script setup lang="ts">
import { onMounted, shallowRef } from "vue";
import * as echarts from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { MapChart } from "echarts/charts";
import { VisualMapComponent } from "echarts/components";
import type {
  ComposeOption,
  MapSeriesOption,
  VisualMapComponentOption,
} from "echarts";
import type { GeoJSON } from "geojson";

import { polylineStringToGeometry } from "./utils";

echarts.use([MapChart, VisualMapComponent, CanvasRenderer]);

const mapRef = shallowRef<HTMLDivElement>();
const mapData = [
  async () => await import("@/data/china/110000.json"),
  async () => await import("@/data/china/120000.json"),
  async () => await import("@/data/china/130000.json"),
  async () => await import("@/data/china/140000.json"),
  async () => await import("@/data/china/150000.json"),
  async () => await import("@/data/china/210000.json"),
  async () => await import("@/data/china/220000.json"),
  async () => await import("@/data/china/230000.json"),
  async () => await import("@/data/china/310000.json"),
  async () => await import("@/data/china/320000.json"),
  async () => await import("@/data/china/330000.json"),
  async () => await import("@/data/china/340000.json"),
  async () => await import("@/data/china/350000.json"),
  async () => await import("@/data/china/360000.json"),
  async () => await import("@/data/china/370000.json"),
  async () => await import("@/data/china/410000.json"),
  async () => await import("@/data/china/420000.json"),
  async () => await import("@/data/china/430000.json"),
  async () => await import("@/data/china/440000.json"),
  async () => await import("@/data/china/450000.json"),
  async () => await import("@/data/china/460000.json"),
  async () => await import("@/data/china/500000.json"),
  async () => await import("@/data/china/510000.json"),
  async () => await import("@/data/china/520000.json"),
  async () => await import("@/data/china/530000.json"),
  async () => await import("@/data/china/540000.json"),
  async () => await import("@/data/china/610000.json"),
  async () => await import("@/data/china/620000.json"),
  async () => await import("@/data/china/630000.json"),
  async () => await import("@/data/china/640000.json"),
  async () => await import("@/data/china/650000.json"),
  async () => await import("@/data/china/710000.json"),
  async () => await import("@/data/china/810000.json"),
  async () => await import("@/data/china/820000.json"),
];

async function loadGeoJSON() {
  const data = await Promise.all(mapData.map((item) => item()));
  const features: GeoJSON[] = [];
  for (const item of data) {
    const geometry = polylineStringToGeometry(item.polyline);
    features.push({
      type: "Feature",
      properties: { name: item.adcode },
      geometry,
    });
  }
  return features;
}

onMounted(async () => {
  const echart = echarts.init(mapRef.value!);
  const features = await loadGeoJSON();
  features.push({
    type: "Feature",
    properties: {},
    geometry: {
      type: "MultiLineString",
      coordinates: [
        [
          [113.121586, 23.021351],
          [110.179752, 25.235615],
        ],
        [
          [110.179752, 25.235615],
          [116.407387, 39.904179],
        ],
        // [113.121586, 23.021351],
        // [110.179752, 25.235615],
        // [107.031922, 27.721931],
        // [87.464257, 43.509016],
      ],
    },
  });
  echarts.registerMap("china", {
    type: "FeatureCollection",
    features: features as any,
  });
  const options: ComposeOption<MapSeriesOption | VisualMapComponentOption> = {
    visualMap: {},
    series: [{ type: "map", roam: true, map: "china", data: [{}] }],
  };
  echart.setOption(options);
});
</script>
