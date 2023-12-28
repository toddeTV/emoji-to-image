<script setup lang="ts">
import { toPng } from "html-to-image";
import download from "downloadjs";
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";

const schema = z.object({
  emoji: z.string().emoji(),
  width: z.number().min(8).max(512),
  height: z.number().min(8).max(512),
  bgColor: z.string().min(4).max(9).regex(/^#/),
  gridSize: z.number().min(1).max(16),
});

type Schema = z.output<typeof schema>;

type SchemaWithTransformedEmojis = Schema & {
  emojiImages: string[][][];
};

const state = reactive<Schema>({
  emoji: "😀😃😅😄",
  width: 64,
  height: 64,
  bgColor: "#392580",
  gridSize: 2,
});

const lastValidState = ref<SchemaWithTransformedEmojis>(getValidState(state)!); //TODO do not force non undefined here

watch(
  () => state,
  (newState, oldState) => {
    //TODO add deep compare, maybe with lodash? (Not `if (newState !== oldState) { ... }`)
    const validState = getValidState(newState);
    if (validState !== undefined) {
      lastValidState.value = validState;
    }
  },
  { deep: true }
);

function getValidState(
  newState: Schema
): SchemaWithTransformedEmojis | undefined {
  if (schema.safeParse(newState).success) {
    return {
      ...newState,
      emojiImages: splitEmojis(state.emoji, state.gridSize),
    };
  }
  return undefined;
}

function splitEmojis(
  emoji: string,
  gridSize: number
): SchemaWithTransformedEmojis["emojiImages"] {
  const emojiArray: string[] = [...emoji];
  const rows = Array.from(
    { length: Math.ceil(emojiArray.length / gridSize) },
    (_, index) => emojiArray.slice(index * gridSize, (index + 1) * gridSize)
  );
  const emojiImages = Array.from(
    { length: Math.ceil(rows.length / gridSize) },
    (_, index) => rows.slice(index * gridSize, (index + 1) * gridSize)
  );
  return emojiImages;
}

async function onSubmit(event: FormSubmitEvent<Schema>) {
  divToPngAndDownload();
}

async function divToPngAndDownload() {
  const domElement = document.getElementById("pngWrapper");
  if (domElement === null) {
    return;
  }
  const dataUrl = await toPng(domElement);
  download(dataUrl, "my-node.png", "image/png");
}
</script>

<template>
  <div class="flex flex-col gap-4 m-4">
    <UCard>
      <ColorModeSwitch />
    </UCard>

    <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
      <UCard>
        <template #header> Input </template>

        <div class="flex flex-col gap-2">
          <UFormGroup label="Emojis" name="emoji">
            <UInput v-model="state.emoji" type="text" />
          </UFormGroup>

          <UFormGroup label="Dimensions">
            <div class="flex gap-x-2">
              <UFormGroup name="width">
                <UInput v-model="state.width" class="w-28" type="number">
                  <template #trailing>
                    <span class="text-gray-500 dark:text-gray-400 text-xs"
                      >px</span
                    >
                  </template>
                </UInput>
              </UFormGroup>

              <UIcon name="i-ph-x-bold" class="mt-2.5" />

              <UFormGroup name="height">
                <UInput v-model="state.height" class="w-28" type="number">
                  <template #trailing>
                    <span class="text-gray-500 dark:text-gray-400 text-xs"
                      >px</span
                    >
                  </template>
                </UInput>
              </UFormGroup>
            </div>
          </UFormGroup>

          <UFormGroup label="Background Color" name="bgColor">
            <UInput v-model="state.bgColor" type="color" />
          </UFormGroup>

          <UFormGroup label="Grid Size NxN" name="gridSize">
            <UInput v-model="state.gridSize" type="number" />
          </UFormGroup>
        </div>
      </UCard>

      <UCard>
        <template #header> Preview </template>
        <div class="flex gap-2">
          <div
            class="border w-fit h-fit"
            v-for="(emojiImage, emojiImageIndex) in lastValidState.emojiImages"
            :key="emojiImageIndex"
          >
            <div
              :id="`pngWrapper${emojiImageIndex}`"
              :style="`
                width: ${lastValidState.width}px;
                height: ${lastValidState.height}px;
                background-color: ${lastValidState.bgColor};
              `"
              class="flex flex-col justify-evenly"
            >
              <div
                v-for="(row, rowIndex) in emojiImage"
                :key="rowIndex"
                class="flex flex-row justify-evenly"
              >
                <div v-for="(emoji, emojiIndex) in row" :key="emojiIndex">
                  {{ emoji }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </UCard>

      <UCard>
        <UButton type="submit">
          Download {{ lastValidState.width }}px x {{ lastValidState.height }}px
        </UButton>
      </UCard>
    </UForm>
  </div>
</template>
