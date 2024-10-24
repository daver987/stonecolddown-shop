<script setup lang="ts">
import { ProductsOrderByEnum } from "#gql/default";
import type { ImageObject, ImageType } from "../types";

useSeoMeta({
	title: "Portfolio | Natasha Smith at Stone Cold Down",
	description:
		"Explore Natasha Smith's portfolio of fine line black and grey tattoos. View her unique designs and custom tattoo work at Stone Cold Down in Toronto.",
	ogTitle: "Tattoo Portfolio | Natasha Smith at Stone Cold Down",
	ogDescription:
		"Discover the artistry of Natasha Smith through her portfolio of fine line black and grey tattoos. See her unique designs and custom work.",
	ogImage: "/images/scd_logo.png",
	ogUrl: "https://stonecolddown.com/portfolio",
	twitterTitle: "Tattoo Portfolio | Natasha Smith at Stone Cold Down",
	twitterDescription:
		"Browse Natasha Smith's portfolio of fine line black and grey tattoos. Experience her unique style and custom designs.",
	twitterImage: "/images/scd_logo.png",
	twitterCard: "summary_large_image",
});

definePageMeta({
	layout: "default",
	colorMode: "dark",
});

useHead({
	htmlAttrs: {
		lang: "en",
	},
	link: [
		{
			rel: "icon",
			type: "image/png",
			href: "/favicon.ico",
		},
	],
});

const createImageUrls = (
	basePath: ImageType,
	maxImages: number,
	skipNumbers: number[] = [],
): ImageObject[] => {
	const imageUrls: ImageObject[] = [];
	for (let i = 1; i <= maxImages; i++) {
		if (skipNumbers.includes(i)) continue;
		const paddedNumber = i.toString().padStart(2, "00");
		const url = `stonecolddown/${basePath}/${basePath.toLowerCase()}_${paddedNumber}`;
		imageUrls.push({
			id: `${basePath.toLowerCase()}_${paddedNumber}`,
			url,
		});
	}
	return imageUrls;
};

const portfolioImages = createImageUrls("Portfolio", 29, [3, 4, 6, 8]);

// State for grid layout
const gridCols = ref("5");

// State for lightbox
const selectedImage = ref<ImageObject | null>(null);
const isLightboxOpen = ref(false);

const openLightbox = (image: ImageObject) => {
	selectedImage.value = image;
	isLightboxOpen.value = true;
};

const closeLightbox = () => {
	isLightboxOpen.value = false;
	selectedImage.value = null;
};

const { data } = await useAsyncGql("getProductCategories", { first: 6 });
const productCategories = data.value?.productCategories?.nodes || [];
</script>

<template>
  <Page>
    <PageHero
      align="center"
      headline="My Work"
      title="Portfolio"
      description="Explore a curated collection of my fine line black and grey tattoos. Each piece tells a unique story and reflects my artistic vision." />
    <PageBody>
      <LandingSection>
        <div class="flex justify-between items-center">
          <h2 class="text-3xl font-heading text-primary-400">Gallery</h2>
          <UFormGroup name="grid-layout" label="Images per Row">
            <USelect
              v-model="gridCols"
              :options="[
                { label: '2 Columns', value: '2' },
                { label: '3 Columns', value: '3' },
                { label: '4 Columns', value: '4' },
                { label: '5 Columns', value: '5' },
              ]" />
          </UFormGroup>
        </div>
        <div
          :class="[
            'grid gap-4',
            {
              'grid-cols-2': gridCols === '2',
              'grid-cols-3': gridCols === '3',
              'grid-cols-4': gridCols === '4',
              'grid-cols-5': gridCols === '5',
            },
          ]">
          <div
            class="group relative overflow-hidden col-span-1 rounded-lg shadow-lg cursor-pointer"
            v-for="item in portfolioImages"
            :key="item.id"
            @click="openLightbox(item)">
            <CldImage
              class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              :src="item.url"
              width="600"
              height="600"
              crop="fill"
              gravity="auto"
              alt="Portfolio image" />
            <div
              class="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <UButton class="text-sm" color="white" variant="outline" label="View Image" />
            </div>
          </div>
        </div>
      </LandingSection>

      <LandingSection headline="What's Hot" title="Popular Designs and Products">
        <div class="grid justify-center grid-cols-2 gap-4 mt-8 md:grid-cols-3 lg:grid-cols-6">
          <CategoryCard v-for="(category, i) in productCategories" :key="i" class="w-full" :node="category" />
        </div>
      </LandingSection>

      <LandingSection>
        <LandingCTA
          :ui="{
            title: 'text-3xl font-heading text-amber-400',
          }"
          title="Ready to Get Inked?"
          description="Book your appointment with Natasha today and start your tattoo journey."
          :links="[
            {
              label: 'Book Now',
              color: 'white',
              size: 'lg',
              to: '/booking',
            },
          ]" />
      </LandingSection>
    </PageBody>

    <!-- Lightbox -->
    <UModal v-model="isLightboxOpen" :ui="{ width: 'max-w-7xl' }">
      <div class="p-4" v-if="selectedImage">
        <CldImage class="max-w-full max-h-[80vh] mx-auto object-contain" :src="selectedImage.url" width="1200" height="1200" crop="fit" alt="Portfolio image" />
      </div>
    </UModal>
  </Page>
</template>
