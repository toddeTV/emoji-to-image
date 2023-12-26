<script setup lang="ts">
import { toPng } from "html-to-image";
import download from "downloadjs";

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
    <div id="pngWrapper">Hello world!</div>
    <button type="button" @click="divToPng">Generate & Download</button>
  </div>
</template>
