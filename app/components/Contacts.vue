<script lang="ts" setup>
import IconAvito from './icons/IconAvito.vue';
import IconTel from './icons/IconTel.vue';
import IconTelegram from './icons/IconTelegram.vue';
import IconVk from './icons/IconVk.vue';

interface ContactItem {
  label: string;
  href: string;
  icon: Component;
  isExternal?: boolean;
}

const contacts: ContactItem[] = [
  {
    label: '+7 (912) 514-08-99',
    href: 'tel:+79125140899',
    icon: IconTel,
  },
  {
    label: '@magicliffe',
    href: 'https://t.me',
    icon: IconTelegram,
    isExternal: true,
  },
  {
    label: 'fokusnik_ekb',
    href: 'https://vk.com',
    icon: IconVk,
    isExternal: true,
  },
  {
    label: 'fokusnik',
    href: 'https://avito.ru',
    icon: IconAvito,
    isExternal: true,
  },
];
</script>

<template>
  <section class="container mx-auto mt-6 px-4">
    <h4 class="text-stone mb-12 text-center text-4xl font-bold">Давайте обсудим ваше событие</h4>

    <div class="flex w-full flex-wrap items-center justify-center gap-4 md:gap-6">
      <a
        v-for="contact in contacts"
        :key="contact.label"
        :href="contact.href"
        :target="contact.isExternal ? '_blank' : undefined"
        :rel="contact.isExternal ? 'noopener noreferrer' : undefined"
        class="border-primary inline-flex items-center gap-4 rounded-lg border-2 px-6 py-2 text-3xl font-bold transition-colors"
      >
        <component :is="contact.icon" class="fill-primary size-8 shrink-0" />
        <span>{{ contact.label }}</span>
      </a>
    </div>
  </section>
</template>
