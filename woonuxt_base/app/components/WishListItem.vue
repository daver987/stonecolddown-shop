<script setup lang="ts">
import type { Product } from '../types';

const { removeFromWishlist } = useWishlist();
const props = defineProps<{ product: Product }>();

const productLink = computed(() => (props.product.slug ? `/product/${decodeURIComponent(props.product.slug)}` : ''));
const productImage = computed(() => props.product.image?.cartSourceUrl || props.product.image?.sourceUrl || '/images/placeholder.jpg');
</script>

<template>
  <UCard class="p-4">
    <div class="flex items-center gap-4">
      <NuxtLink v-if="productLink" :to="productLink">
        <UAvatar :src="productImage" :alt="product.image?.altText || product.name || 'Product image'" size="lg" class="rounded-lg" />
      </NuxtLink>
      <div class="flex-grow">
        <NuxtLink v-if="productLink" :to="productLink" class="text-lg font-medium hover:underline">
          {{ product.name }}
        </NuxtLink>
        <ProductPrice :sale-price="product.salePrice" :regular-price="product.regularPrice" class="mt-1" />
      </div>
      <UButton
        v-if="product.databaseId"
        icon="i-heroicons-x-mark"
        color="gray"
        variant="ghost"
        size="sm"
        @click="removeFromWishlist(product.databaseId)"
        aria-label="Remove Item" />
    </div>
  </UCard>
</template>
