<script setup lang="ts">
import TradingViewWidget from "./components/TradingViewWidget.vue";

const urlParams = new URLSearchParams(window.location.search);
const startParam = urlParams.get("tgWebAppStartParam") || undefined;
</script>

<template>
  <TradingViewWidget :symbol="startParam" class="w-dvw h-dvh bg-gray-700" />
</template>
