// stores/modalImage.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useModalImageStore = defineStore('modalImage', () => {
	const isOpen = ref(false);
	const src = ref('');

	const openModalImage = (imgSrc: string) => {
		src.value = imgSrc;
		isOpen.value = true;
		if (typeof document !== 'undefined') {
			document.body.style.overflow = 'hidden';
		}
	};

	const closeModalImage = () => {
		isOpen.value = false;
		if (typeof document !== 'undefined') {
			document.body.style.overflow = '';
		}
	};

	return {
		isOpen,
		src,
		openModalImage,
		closeModalImage,
	};
});
