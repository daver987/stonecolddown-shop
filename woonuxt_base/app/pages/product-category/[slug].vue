<script setup lang="ts">
import type { Product } from '../../types';

type Category = {
  name: string;
  description: string;
  slug: string;
};

const { setProducts, updateProductList } = useProducts();
const { isQueryEmpty } = useHelpers();
const { storeSettings } = useAppConfig();
const route = useRoute();
const slug = route.params.slug;

const { data } = await useAsyncGql('getProducts', { slug });
const productsInCategory = (data.value?.products?.nodes || []) as Product[];
setProducts(productsInCategory);

// @ts-expect-error
const category = (data.value?.products?.nodes[0]?.productCategories?.nodes[0] || null) as Category;
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

useHead({
  title: 'Products',
  meta: [{ hid: 'description', name: 'description', content: 'Products' }],
});
useSeoMeta({
  title: () => `${(category as Category).name || 'Products'} | Stone Cold Down Shop`,
  description: () =>
    (category as Category).description ||
    `Shop ${(category as Category).name || 'product'} merchandise from Stone Cold Down. Inspired by Natasha Smith's fine line black and gray tattoo art.`,
  ogTitle: () => `${(category as Category).name || 'Products'} | Stone Cold Down Shop`,
  ogDescription: () =>
    (category as Category).description ||
    `Explore our ${(category as Category).name || 'product'} collection. Unique products featuring Natasha Smith's distinctive tattoo designs.`,
  ogImage: '/images/scd_logo.png',
  ogUrl: () => `https://stonecolddown.com/product-category/${slug}`,
  twitterTitle: () => `${(category as Category).name || 'Products'} | Stone Cold Down Shop`,
  twitterDescription: () =>
    `Discover ${(category as Category).name || 'product'} products from Stone Cold Down. Tattoo-inspired merchandise by fine line artist Natasha Smith.`,
  twitterImage: '/images/scd_logo.png',
  twitterCard: 'summary_large_image',
});
</script>

<template>
  <div class="container flex items-start gap-16" v-if="productsInCategory.length">
    <Filters v-if="storeSettings.showFilters" :hide-categories="true" />

    <div class="w-full">
      <div class="mt-8 flex w-full items-center justify-between gap-4 md:gap-8">
        <ProductResultCount />
        <OrderByDropdown class="hidden md:inline-flex" v-if="storeSettings.showOrderByDropdown" />
        <ShowFilterTrigger v-if="storeSettings.showFilters" class="md:hidden" />
      </div>
      <ProductGrid />
    </div>
  </div>
</template>
