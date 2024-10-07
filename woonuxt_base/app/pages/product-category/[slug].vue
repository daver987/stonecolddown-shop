<script setup lang="ts">
import { useSeoMeta } from '#imports';
import type { Product } from '../../types';

useSeoMeta({
  title: () => `${category.name} | Stone Cold Down Shop`,
  description: () =>
    category.description || `Shop ${category.name} merchandise from Stone Cold Down. Inspired by Natasha Smith's fine line black and gray tattoo art.`,
  ogTitle: () => `${category.name} | Stone Cold Down Shop`,
  ogDescription: () => category.description || `Explore our ${category.name} collection. Unique products featuring Natasha Smith's distinctive tattoo designs.`,
  ogImage: '/images/scd_logo.png',
  ogUrl: () => `https://stonecolddown.com/product-category/${category.slug}`,
  twitterTitle: () => `${category.name} | Stone Cold Down Shop`,
  twitterDescription: () => `Discover ${category.name} products from Stone Cold Down. Tattoo-inspired merchandise by fine line artist Natasha Smith.`,
  twitterImage: '/images/scd_logo.png',
  twitterCard: 'summary_large_image',
});

definePageMeta({
  layout: 'default',
  colorMode: 'dark',
});

const { setProducts, updateProductList } = useProducts();
const { isQueryEmpty } = useHelpers();
const { storeSettings } = useAppConfig();
const route = useRoute();
const { slug } = route.params;

const { category } = defineProps(['category']);

const { data } = await useAsyncGql('getProducts', { slug });
const productsInCategory = (data.value?.products?.nodes || []) as Product[];
setProducts(productsInCategory);

onMounted(() => {
  if (!isQueryEmpty.value) updateProductList();
});

watch(
  () => route.query,
  () => {
    if (route.name !== 'product-category-slug') return;
    updateProductList();
  },
);
</script>

<template>
  <div class="container flex items-start gap-16" v-if="productsInCategory.length">
    <Filters v-if="storeSettings.showFilters" :hide-categories="true" />

    <div class="w-full">
      <div class="flex items-center justify-between w-full gap-4 mt-8 md:gap-8">
        <ProductResultCount />
        <OrderByDropdown class="hidden md:inline-flex" v-if="storeSettings.showOrderByDropdown" />
        <ShowFilterTrigger v-if="storeSettings.showFilters" class="md:hidden" />
      </div>
      <ProductGrid />
    </div>
  </div>
</template>
