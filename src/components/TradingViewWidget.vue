<template>
  <div :class="props.class">
    <div :id="containerId" class="w-full h-full"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch, computed } from "vue";

const props = defineProps({
  symbol: {
    type: String,
    default: "NASDAQ:AAPL",
  },
  class: {
    type: String,
    optional: true,
  },
});

const containerId = `tradingview_widget_${Math.random().toString(36).substr(2, 9)}`;

const widgetOptions = computed(() => ({
  autosize: true,
  symbol: props.symbol,
  interval: "60",
  timezone: "Etc/UTC",
  theme: "dark",
  style: "1",
  locale: "en",
  enable_publishing: false,
  allow_symbol_change: true,
  container_id: containerId,
}));

const createWidget = () => {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = ""; // Clear previous widget
  const script = document.createElement("script");
  script.src =
    "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
  script.async = true;
  script.innerHTML = JSON.stringify(widgetOptions.value);
  container.appendChild(script);
};

onMounted(() => {
  createWidget();
});

watch(
  () => props.symbol,
  () => {
    createWidget();
  },
);
</script>
