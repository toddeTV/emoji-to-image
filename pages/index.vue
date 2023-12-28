<script setup lang="ts">
import { toPng } from "html-to-image";
import download from "downloadjs";
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";
import { card } from "#ui/ui.config";
// import lodash from "#ui/utils/lodash.js";

const gridTypes = [
  {
    name: "force grid",
    value: "even",
  },
  {
    name: "fill only existing emojis",
    value: "fill",
  },
];

const schema = z.object({
  emoji: z.string().emoji(),
  width: z.number().int().min(8).max(512),
  height: z.number().int().min(8).max(512),
  bgTransparent: z.boolean(),
  bgColor: z.string().min(4).max(9).regex(/^#/),
  gridSize: z.number().int().min(1).max(16),
  emojiScale: z.number().int().min(1).max(100),
  gridType: z.union([z.literal("even"), z.literal("fill")]),
});

type SchemaType = z.output<typeof schema>;

type EmojiImageType = EmojiRowType[];
type EmojiRowType = EmojiType[];
type EmojiType = string;

type SchemaTransformedType = SchemaType & {
  emojiImages: EmojiImageType[];
  emojiContainerDimensionPx: number;
  emojiFontSizePx: number;
};

const state = reactive<SchemaType>({
  emoji: "😀😃😅😄",
  width: 64,
  height: 64,
  bgTransparent: false,
  bgColor: "#392580",
  gridSize: 2,
  emojiScale: 80,
  gridType: "even",
});

const lastValidState = ref<SchemaTransformedType>(getValidState(state)!); //TODO do not force non undefined here

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
  newState: SchemaType
): SchemaTransformedType | undefined {
  if (schema.safeParse(newState).success) {
    const emojiContainerDimensionPx = getEmojiContainerDimensionPx(
      newState.width,
      newState.height,
      newState.gridSize
    );
    return {
      ...newState,
      emojiImages: splitEmojis(state.emoji, state.gridSize),
      emojiContainerDimensionPx: emojiContainerDimensionPx,
      emojiFontSizePx: getEmojiFontSizePx(emojiContainerDimensionPx),
    };
  }
  return undefined;
}

function splitEmojis(
  emoji: string,
  gridSize: number
): SchemaTransformedType["emojiImages"] {
  const emojiArray: string[] = [...emoji]; //TODO this does not work if combined emojis are used (e.g. 🏳️‍🌈 or 👨‍👨‍👧‍👧)
  // try using: https://stackoverflow.com/questions/24531751/how-can-i-split-a-string-containing-emoji-into-an-array
  const rows: EmojiRowType[] = Array.from(
    { length: Math.ceil(emojiArray.length / gridSize) },
    (_, index) => emojiArray.slice(index * gridSize, (index + 1) * gridSize)
  );
  const emojiImages: EmojiImageType[] = Array.from(
    { length: Math.ceil(rows.length / gridSize) },
    (_, index) => rows.slice(index * gridSize, (index + 1) * gridSize)
  );
  return emojiImages;
}

function getEmojiContainerDimensionPx(
  width: number,
  height: number,
  gridSize: number
): SchemaTransformedType["emojiContainerDimensionPx"] {
  const useSmallerDimension = width > height ? height : width;
  const size = Math.floor(useSmallerDimension / gridSize);
  return size;
}

function getEmojiFontSizePx(
  emojiContainerDimensionPx: number
): SchemaTransformedType["emojiFontSizePx"] {
  return Math.floor(emojiContainerDimensionPx * (state.emojiScale / 100));
}

async function onSubmit(event: FormSubmitEvent<SchemaType>) {
  divToPngAndDownload();
}

async function divToPngAndDownload() {
  const emojiImagesLength = lastValidState.value!.emojiImages.length;
  for (let i = 0; i < emojiImagesLength; i++) {
    const domElement = document.getElementById(`pngWrapper${i}`);
    if (domElement === null) {
      return;
    }
    const dataUrl = await toPng(domElement);
    download(dataUrl, `emoji-image-${i}.png`, "image/png");
  }
}

const nuxtUiConfigCard = getNuxtUiConfig("card", card);
</script>

<template>
  <div class="flex flex-col gap-4">
    <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
      <UCard>
        <template #header> Input </template>

        <div class="flex flex-col gap-2">
          <UFormGroup label="Emojis" name="emoji" class="max-w-sm">
            <UInput v-model="state.emoji" type="text" />
          </UFormGroup>

          <UFormGroup label="Dimensions">
            <div class="flex gap-x-2">
              <UFormGroup name="width" class="max-w-[120px]">
                <UInput v-model="state.width" type="number">
                  <template #trailing>
                    <span class="text-gray-500 dark:text-gray-400 text-xs"
                      >px</span
                    >
                  </template>
                </UInput>
              </UFormGroup>

              <UIcon name="i-ph-x-bold" class="mt-2.5" />

              <UFormGroup name="height" class="max-w-[120px]">
                <UInput v-model="state.height" type="number">
                  <template #trailing>
                    <span class="text-gray-500 dark:text-gray-400 text-xs"
                      >px</span
                    >
                  </template>
                </UInput>
              </UFormGroup>
            </div>
          </UFormGroup>

          <UFormGroup label="Background Transparent" name="bgTransparent">
            <UCheckbox
              v-model="state.bgTransparent"
              label="Background Transparent"
            />
          </UFormGroup>

          <UFormGroup label="Background Color" name="bgColor" class="max-w-sm">
            <UInput
              v-model="state.bgColor"
              type="color"
              :disabled="state.bgTransparent"
            />
          </UFormGroup>

          <UFormGroup label="Grid Size NxN" name="gridSize" class="max-w-sm">
            <UInput v-model="state.gridSize" type="number" />
          </UFormGroup>

          <UFormGroup label="Grid Type" name="gridType" class="max-w-sm">
            <USelect
              v-model="state.gridType"
              :options="gridTypes"
              option-attribute="name"
            />
          </UFormGroup>

          <UFormGroup
            label="Emoji Scale"
            name="emojiScale"
            class="max-w-[120px]"
          >
            <UInput v-model="state.emojiScale" type="number">
              <template #trailing>
                <span class="text-gray-500 dark:text-gray-400 text-xs">%</span>
              </template>
            </UInput>
          </UFormGroup>
        </div>
      </UCard>

      <UCard>
        <template #header> Preview </template>
        <div class="flex gap-2">
          <div
            :class="['w-fit h-fit', nuxtUiConfigCard.ring]"
            v-for="(emojiImage, emojiImageIndex) in lastValidState.emojiImages"
            :key="emojiImageIndex"
          >
            <div
              :id="`pngWrapper${emojiImageIndex}`"
              :style="`
                width: ${lastValidState.width}px;
                height: ${lastValidState.height}px;
                background-color: ${
                  lastValidState.bgTransparent
                    ? 'transparent'
                    : lastValidState.bgColor
                };
              `"
              class="flex flex-col justify-evenly"
            >
              <!-- TODO here the inner div is redundant, refactor! -->
              <div
                v-if="lastValidState.gridType === 'fill'"
                v-for="(row, rowIndex) in emojiImage"
                :key="rowIndex"
                class="flex flex-row justify-evenly"
              >
                <div
                  v-for="(emoji, emojiIndex) in row"
                  :key="emojiIndex"
                  class="flex justify-center items-center"
                  :style="`
                    width: ${lastValidState.emojiContainerDimensionPx}px;
                    height: ${lastValidState.emojiContainerDimensionPx}px;
                    line-height: ${lastValidState.emojiFontSizePx}px;
                    font-size: ${lastValidState.emojiFontSizePx}px;
                  `"
                >
                  {{ emoji }}
                </div>
              </div>
              <div
                v-if="lastValidState.gridType === 'even'"
                v-for="rowIndex in Array.from(
                  { length: lastValidState.gridSize },
                  (_, index) => index
                )"
                :key="rowIndex"
                class="flex flex-row justify-evenly"
              >
                <div
                  v-for="columnIndex in Array.from(
                    { length: lastValidState.gridSize },
                    (_, index) => index
                  )"
                  :key="columnIndex"
                  class="flex justify-center items-center"
                  :style="`
                    width: ${lastValidState.emojiContainerDimensionPx}px;
                    height: ${lastValidState.emojiContainerDimensionPx}px;
                    line-height: ${lastValidState.emojiFontSizePx}px;
                    font-size: ${lastValidState.emojiFontSizePx}px;
                  `"
                >
                  {{
                    emojiImage[rowIndex]
                      ? emojiImage[rowIndex][columnIndex]
                      : ""
                  }}
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
