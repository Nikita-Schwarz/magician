<script setup lang="ts">
// Пропсы вашей карточки
defineProps<{
	image: string;
	title: string;
	description: string;
}>();

const modalStore = useModalImageStore();
</script>

<template>
	<div
		@click="modalStore.openModalImage(image)"
		class="relative cursor-pointer overflow-hidden rounded-2xl bg-zinc-950 aspect-3/4"
	>
		<div class="absolute inset-0">
			<NuxtImg :src="image" :alt="title" class="w-full h-full object-cover" />
		</div>

		<div class="absolute bottom-0 w-full p-6 text-center text-white z-10">
			<h3 class="text-xl font-bold">{{ title }}</h3>
			<p class="text-sm text-zinc-300 italic mt-1">{{ description }}</p>
		</div>
	</div>
</template>
