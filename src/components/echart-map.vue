<template>
  <div id="echarts-map" ref="mapRef" class="h-200px w-200px"></div>
</template>

<script setup lang="ts">
import { onMounted, shallowRef } from "vue";
import * as echarts from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { MapChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
} from "echarts/components";
import { LabelLayout, UniversalTransition } from "echarts/features";
import type { MapSeriesOption } from "echarts/charts";
import type { ComposeOption } from "echarts/core";
import guangdong from "@/data/guangdong.json";
import type { FeatureCollection } from "geojson";

function transformPolylineStringToGeoJson(polyline: string): FeatureCollection {

  return {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: [],
        geometry: { type: "", coordinates: [] },
      },
    ],
  };
}

type Options = ComposeOption<MapSeriesOption>;

const mapRef = shallowRef<HTMLDivElement>();
echarts.use([
  MapChart,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
]);
onMounted(() => {
  if (mapRef.value) {
    const json = transformPolylineStringToGeoJson(guangdong.polyline);

    echarts.registerMap("china", json as any);
    const echart = echarts.init(mapRef.value);

    const options: Options = {};
    echart.setOption(options);
  }
});
</script>
