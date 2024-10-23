<script setup lang="ts">
import type { Product } from '../../types';

const { product } = defineProps({
  product: { type: Object as PropType<Product>, required: true },
});
const { storeSettings } = useAppConfig();

const initialTab = product.description ? 0 : 1;
const show = ref(initialTab);
</script>

<template>
  <div>
    <nav class="border-b flex gap-8 tabs">
      <UButton v-if="product.description" :class="show === 0 ? 'active' : ''" @click.prevent="show = 0" class="rounded-br-none rounded-bl-none">
        {{ $t('messages.shop.productDescription') }}
      </UButton>
      <UButton v-if="storeSettings.showReviews" :class="show === 1 ? 'active' : ''" @click.prevent="show = 1" class="rounded-br-none rounded-bl-none">
        {{ $t('messages.shop.reviews') }} ({{ product.reviewCount }})
      </UButton>
    </nav>
    <div class="tab-contents">
      <div v-if="show === 0 && product.description" class="font-light mt-8 prose dark:prose-invert" v-html="product.description" />
      <ProductReviews v-if="show === 1" :product="product" />
    </div>
  </div>
</template>
