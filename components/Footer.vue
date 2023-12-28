<script setup lang="ts">
const env = useRuntimeConfig();
</script>

<template>
  <footer class="flex flex-col gap-1 w-full pb-8 pt-6">
    <div
      class="flex flex-row flex-wrap justify-center items-center gap-x-3 text-gray-500"
    >
      <nuxt-link to="/privacy-policy">
        <span>privacy policy</span>
      </nuxt-link>

      <div>|</div>

      <nuxt-link to="/legal-notice">
        <span>legal notice</span>
      </nuxt-link>

      <div>|</div>

      <div class="flex gap-1 items-start">
        <span>Created with</span>
        <UIcon
          name="i-ph-heart-straight-fill"
          class="animate-bounce text-primary-600"
        />
        <nuxt-link to="https://todde.tv/" target="_blank">
          <span>Thorsten Seyschab</span>
        </nuxt-link>
      </div>
    </div>

    <div
      class="flex flex-row flex-wrap justify-center items-center gap-x-3 text-xs text-gray-400"
    >
      <div class="text-center">
        Copyright 2023-present © Thorsten Seyschab - All Rights Reserved
      </div>

      <div>|</div>

      <div>{{ env.public.version }}</div>
    </div>
  </footer>
</template>
