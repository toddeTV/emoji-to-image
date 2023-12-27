<script setup lang="ts">
import { toPng } from "html-to-image";
import download from "downloadjs";
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";

const schema = z.object({
  emoji: z.string().emoji(),
});

type Schema = z.output<typeof schema>;

const state = reactive({
  emoji: undefined,
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
  // Do something with data
  console.log(event.data);
}

async function divToPng() {
  const domElement = document.getElementById("pngWrapper");
  if (domElement === null) {
    return;
  }
  const dataUrl = await toPng(domElement);
  download(dataUrl, "my-node.png", "image/png");
}
</script>

<template>
  <div>
    <ColorModeSwitch />

    <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
      <UFormGroup label="Emojis" name="emoji">
        <UInput v-model="state.emoji" type="emoji" />
      </UFormGroup>

      <UButton type="submit"> Submit </UButton>
    </UForm>

    <div id="pngWrapper">Hello world!</div>

    <button type="button" @click="divToPng">Generate & Download</button>
  </div>
</template>
