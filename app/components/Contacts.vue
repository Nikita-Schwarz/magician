<script lang="ts" setup>
import IconAvito from './icons/IconAvito.vue';
import IconTel from './icons/IconTel.vue';
import IconTelegram from './icons/IconTelegram.vue';
import IconVk from './icons/IconVk.vue';

const { pb } = usePocketBase();

const iconMap: Record<string, Component> = {
  phone: IconTel,
  telegram: IconTelegram,
  vk: IconVk,
  avito: IconAvito,
};

const { data: contacts } = await useAsyncData('contacts', async () => {
  try {
    return await pb.collection('contacts').getFullList({ sort: 'order' });
  } catch {
    return [];
  }
});
</script>

<template>
  <section v-if="contacts?.length" class="container mx-auto mt-6 px-4">
    <h4 class="text-stone mb-12 text-center text-4xl font-bold">Давайте обсудим ваше событие</h4>

    <div class="flex w-full flex-wrap items-center justify-center gap-4 md:gap-6">
      <a
        v-for="contact in contacts"
        :key="contact.id"
        :href="contact.href"
        :target="contact.type !== 'phone' ? '_blank' : undefined"
        :rel="contact.type !== 'phone' ? 'noopener noreferrer' : undefined"
        class="border-primary inline-flex items-center gap-4 rounded-lg border-2 px-6 py-2 text-3xl font-bold transition-colors"
      >
        <component
          v-if="iconMap[contact.type]"
          :is="iconMap[contact.type]"
          class="fill-primary size-8 shrink-0"
        />
        <span>{{ contact.label }}</span>
      </a>
    </div>
  </section>
</template>
