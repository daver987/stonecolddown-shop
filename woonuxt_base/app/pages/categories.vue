<script lang="ts" setup>
import type { ProductCategory } from '../types';

definePageMeta({
  layout: 'default',
  colorMode: 'dark',
});

useSeoMeta({
  title: 'Shop Categories | Stone Cold Down',
  description:
    'Explore our diverse range of product categories at Stone Cold Down. Find tattoo-inspired merchandise and accessories by fine line artist Natasha Smith.',
  ogTitle: 'Shop Categories | Stone Cold Down',
  ogDescription:
    "Browse our collection of tattoo-inspired product categories. Discover unique items featuring Natasha Smith's distinctive fine line black and gray designs.",
  ogImage: '/images/scd_logo.png',
  ogUrl: 'https://stonecolddown.com/categories',
  twitterTitle: 'Shop Categories | Stone Cold Down',
  twitterDescription: "Explore Stone Cold Down's product categories. Find merchandise inspired by Natasha Smith's fine line tattoo artistry.",
  twitterImage: '/images/scd_logo.png',
  twitterCard: 'summary_large_image',
});

const { data } = await useAsyncGql('getProductCategories');
const productCategories = data.value.productCategories?.nodes as ProductCategory[];

useHead({
  title: 'Categories',
  meta: [{ name: 'description', content: 'All product categories' }],
  link: [{ rel: 'canonical', href: 'https://stonecolddown.com/categories' }],
});
</script>

<template>
  <main class="container">
    <div v-if="productCategories?.length" class="grid grid-cols-2 gap-4 my-6 md:grid-cols-3 lg:gap-8 xl:grid-cols-4">
      <CategoryCard v-for="(category, i) in productCategories" :key="i" :node="category" :image-loading="i <= 2 ? 'eager' : 'lazy'" />
    </div>
  </main>
</template>
