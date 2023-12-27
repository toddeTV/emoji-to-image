<script setup lang="ts">
const colorMode = useColorMode();

function setPageColorMode(newColorMode: "dark" | "light") {
  colorMode.value = newColorMode;
}
</script>

<template>
  <ClientOnly>
    <UButton
      icon="i-ph-moon-fill"
      size="sm"
      color="primary"
      square
      variant="link"
      v-if="colorMode.value === 'dark'"
      @click="setPageColorMode('light')"
    />
    <UButton
      icon="i-ph-sun-fill"
      size="sm"
      color="primary"
      square
      variant="link"
      v-else-if="colorMode.value === 'light'"
      @click="setPageColorMode('dark')"
    />
  </ClientOnly>
</template>
