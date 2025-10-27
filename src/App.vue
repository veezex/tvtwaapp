<script setup lang="ts">
import { ref, onMounted } from "vue";

const startParam = ref<string | null>(null);

onMounted(() => {
  const urlParams = new URLSearchParams(window.location.search);
  startParam.value = urlParams.get("tgWebAppStartParam");
});
</script>

<template>
  <h1 class="text-3xl font-bold underline">Hello</h1>
  <p v-if="startParam">Указанный параметр: {{ startParam }}</p>
</template>
