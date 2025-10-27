<script setup lang="ts">
import TradingViewWidget from "./components/TradingViewWidget.vue";

const urlParams = new URLSearchParams(window.location.search);
const startParam = urlParams.get("tgWebAppStartParam") || undefined;
const startObject = JSON.parse(startParam ? atob(startParam) : "{}") as {
  symbol?: string;
};
</script>

<template>
  <TradingViewWidget
    :symbol="startObject.symbol"
    class="w-dvw h-dvh bg-gray-700"
  />
</template>
