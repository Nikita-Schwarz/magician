<script setup lang="ts">
const { pb, getFileUrl } = usePocketBase();

const { data: hero } = await useAsyncData('hero', async () => {
  try {
    return await pb.collection('hero').getFirstListItem('');
  } catch {
    return null;
  }
});

const heroImage = computed(() =>
  hero.value?.image ? getFileUrl(hero.value, hero.value.image) : '/images/hero_img.jpg',
);
</script>

<template>
  <section class="container mx-auto mt-4 px-4 md:mt-6">
    <div class="relative mx-auto aspect-3/4 w-full max-w-lg overflow-hidden rounded-2xl bg-black">
      <div class="absolute inset-0">
        <img :src="heroImage" alt="" class="h-full w-full object-cover" />
      </div>

      <div class="absolute inset-0 z-10 flex flex-col justify-between">
        <!-- Верхний текст -->
        <div
          class="bg-linear-to-b from-black/90 via-black/50 to-transparent px-6 pt-4 pb-8 text-center"
        >
          <span class="text-primary text-xs font-medium tracking-widest uppercase">
            {{ hero?.tagline || 'Сделайте невозможное реальным' }}
          </span>
          <h2 class="mt-1 text-2xl font-bold text-white drop-shadow-md">
            {{ hero?.title || 'Фокусы и магия для вашего праздника' }}
          </h2>
        </div>

        <!-- Нижний текст -->
        <div
          class="w-full bg-linear-to-t from-black/90 via-black/70 to-transparent px-6 pt-10 pb-6 text-center"
        >
          <p class="text-sm text-zinc-300 italic">
            {{
              hero?.description ||
              'Интерактивные, впечатляющие магические представления для мероприятий, которые заслуживают немного волшебства.'
            }}
          </p>
          <button
            class="bg-primary mt-3 cursor-pointer rounded-lg px-6 py-2 text-sm font-semibold text-black transition-colors hover:bg-amber-400"
          >
            {{ hero?.button_text || 'Напишите мне' }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
