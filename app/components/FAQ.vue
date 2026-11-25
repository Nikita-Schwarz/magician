<script lang="ts" setup>
const { pb } = usePocketBase();

const { data: faqList } = await useAsyncData('faq', async () => {
  try {
    return await pb.collection('faq').getFullList({ sort: 'order' });
  } catch {
    return [];
  }
});

const openIds = ref<string[]>([]);

const isOpen = (id: string) => openIds.value.includes(id);

const toggleItem = (id: string) => {
  if (isOpen(id)) {
    openIds.value = openIds.value.filter((item) => item !== id);
  } else {
    openIds.value.push(id);
  }
};

const half = computed(() => Math.ceil((faqList.value?.length ?? 0) / 2));
const leftColumn = computed(() => (faqList.value ?? []).slice(0, half.value));
const rightColumn = computed(() => (faqList.value ?? []).slice(half.value));

// Плавная анимация высоты для аккордеона
const onEnter = (el: Element) => {
  const element = el as HTMLElement;
  element.style.height = '0';
  void element.offsetHeight;
  element.style.height = `${element.scrollHeight}px`;
};

const onAfterEnter = (el: Element) => {
  const element = el as HTMLElement;
  element.style.height = 'auto';
};

const onLeave = (el: Element) => {
  const element = el as HTMLElement;
  element.style.height = `${element.scrollHeight}px`;
  void element.offsetHeight;
  element.style.height = '0';
};
</script>

<template>
  <section v-if="faqList?.length" class="container mx-auto mt-6 px-4">
    <h4 class="text-stone mb-12 text-center text-4xl font-bold">Частые вопросы</h4>

    <div class="grid grid-cols-1 items-start gap-x-16 gap-y-4 md:grid-cols-2 md:gap-y-10">
      <div
        v-for="(col, colIdx) in [leftColumn, rightColumn]"
        :key="colIdx"
        class="flex flex-col gap-y-4 md:gap-y-10"
      >
        <div v-for="item in col" :key="item.id">
          <button
            @click="toggleItem(item.id)"
            class="font-bree flex w-full cursor-pointer items-center gap-4 pb-4 text-left"
          >
            <LucideChevronDown
              :class="isOpen(item.id) ? 'rotate-180' : ''"
              class="stroke-primary size-8 shrink-0 transition-transform"
            />
            <span class="text-2xl font-medium">{{ item.question }}</span>
          </button>

          <Transition
            name="accordion"
            @enter="onEnter"
            @after-enter="onAfterEnter"
            @leave="onLeave"
          >
            <div
              v-show="isOpen(item.id)"
              class="overflow-hidden transition-[height] duration-300 ease-in-out"
            >
              <div class="font-bree rounded-lg bg-stone-200 px-4 py-2 text-xl text-green-950">
                <p v-html="item.answer"></p>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </section>
</template>
