<template>
	<div class="mx-auto mt-4 px-4 container">
		<div
			class="relative w-full max-w-lg mx-auto aspect-3/4 overflow-hidden rounded-2xl bg-black"
		>
			<div class="absolute inset-0">
				<NuxtImg
					src="/images/hero_img.jpg"
					class="w-full h-full object-cover"
				/>
			</div>

			<div class="absolute inset-0 flex flex-col justify-between z-10">
				<!-- Верхний текст -->
				<div class="text-center pt-4 px-6">
					<span
						class="text-xs uppercase tracking-widest text-primary font-medium"
						>Шоу иллюзий</span
					>
					<h2 class="text-2xl font-bold text-white mt-1 drop-shadow-md">
						Фокусы и магия для вашего праздника
					</h2>
				</div>

				<!-- Нижний текст -->
				<div
					class="w-full bg-linear-to-t from-black/90 via-black/70 to-transparent pt-10 pb-6 px-6 text-center"
				>
					<p class="text-sm text-gray-300 italic">
						«Иллюзии , меняющие реальность»
					</p>
					<button
						class="mt-3 px-6 py-2 bg-primary hover:bg-amber-400 text-black font-semibold rounded-lg transition-colors text-sm"
					>
						Записаться
					</button>
				</div>
			</div>
		</div>
	</div>
</template>
