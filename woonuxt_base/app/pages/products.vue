<script setup lang="ts">
import type { Product } from '../types';
import { useSeoMeta } from '#imports';

useSeoMeta({
  title: 'Products | Stone Cold Down',
  description:
    "Explore our wide range of products at Stone Cold Down. Find unique merchandise inspired by Natasha Smith's fine line black and grey tattoo artistry.",
  ogTitle: 'Products | Stone Cold Down',
  ogDescription: "Discover a variety of products at Stone Cold Down. Unique merchandise inspired by Natasha Smith's fine line black and grey tattoos.",
  ogImage: '/images/scd_logo.png',
  ogUrl: 'https://stonecolddown.com/products',
  twitterTitle: 'Products | Stone Cold Down',
  twitterDescription:
    "Explore our wide range of products at Stone Cold Down. Find unique merchandise inspired by Natasha Smith's fine line black and grey tattoo artistry.",
  twitterImage: '/images/scd_logo.png',
  twitterCard: 'summary_large_image',
});

definePageMeta({
  layout: 'default',
  colorMode: 'dark',
});

const { setProducts, updateProductList } = useProducts();
const route = useRoute();
const { storeSettings } = useAppConfig();
const { isQueryEmpty } = useHelpers();

const { data } = await useAsyncGql('getProducts');
const allProducts = (data.value?.products?.nodes || []) as Product[];
setProducts(allProducts);

onMounted(() => {
  if (!isQueryEmpty.value) updateProductList();
});

watch(
  () => route.query,
  () => {
    if (route.name !== 'products') return;
    updateProductList();
  },
);

useHead({
  title: 'Products',
  meta: [{ hid: 'description', name: 'description', content: 'Products' }],
});

useSeoMeta({
  title: 'Shop Merchandise | Stone Cold Down',
  description:
    "Explore and shop exclusive merchandise from Stone Cold Down. Find unique items inspired by Natasha Smith's fine line black and gray tattoo art.",
  ogTitle: 'Shop Merchandise | Stone Cold Down',
  ogDescription:
    "Discover our collection of tattoo-inspired merchandise. Unique products featuring Natasha Smith's distinctive fine line black and gray tattoo designs.",
  ogImage: '/images/scd_logo.png',
  ogUrl: 'https://stonecolddown.com/products',
  twitterTitle: 'Shop Merchandise | Stone Cold Down',
  twitterDescription: 'Browse and purchase exclusive Stone Cold Down merchandise. Tattoo-inspired products by fine line artist Natasha Smith.',
  twitterImage: '/images/scd_logo.png',
  twitterCard: 'summary_large_image',
});
</script>

<template>
  <div class="container flex items-start gap-16" v-if="allProducts.length">
    <Filters v-if="storeSettings.showFilters" />

    <div class="w-full">
      <div class="flex items-center justify-between w-full gap-4 mt-8 md:gap-8">
        <ProductResultCount />
        <OrderByDropdown class="hidden md:inline-flex" v-if="storeSettings.showOrderByDropdown" />
        <ShowFilterTrigger v-if="storeSettings.showFilters" class="md:hidden" />
      </div>
      <ProductGrid />
    </div>
  </div>
  <NoProductsFound v-else>Could not fetch products from your store. Please check your configuration.</NoProductsFound>
</template>
