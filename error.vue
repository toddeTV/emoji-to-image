<script setup lang="ts">
const props = defineProps({
  error: Object,
});

function handleError() {
  clearError({ redirect: "/" });
}

const code = props.error?.statusCode ?? props.error?.code ?? 500;

const message =
  props.error?.statusMessage ?? props.error?.message ?? "Unknown.";
</script>

<template>
  <div class="page justify-center items-center">
    <h1>Error {{ code }}</h1>
    <div class="mb-2">{{ message }}</div>
    <!-- <pre>{{ props.error }}</pre> -->
    <button type="button" @click="handleError()">Back home</button>
  </div>
</template>
