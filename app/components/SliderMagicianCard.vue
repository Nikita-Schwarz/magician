<script setup lang="ts">
defineProps<{
  image: string;
  title: string;
  description: string;
}>();
</script>

<template>
  <div
    class="relative mx-auto aspect-3/4 max-h-130 cursor-pointer overflow-hidden rounded-2xl bg-zinc-950"
  >
    <div class="absolute inset-0">
      <NuxtImg :src="image" :alt="title" class="h-full w-full object-cover" />
    </div>

    <div
      class="absolute bottom-0 z-10 w-full bg-linear-to-t from-black/90 via-black/70 to-transparent p-6 text-center text-white"
    >
      <h3 class="text-xl font-bold">{{ title }}</h3>
      <p class="mt-1 text-sm text-zinc-300 italic">{{ description }}</p>
    </div>
  </div>
</template>
