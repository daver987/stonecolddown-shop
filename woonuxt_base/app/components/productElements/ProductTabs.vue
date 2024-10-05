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
      <button v-if="product.description" type="button" :class="show === 0 ? 'active' : ''" @click.prevent="show = 0">
        {{ $t('messages.shop.productDescription') }}
      </button>
      <button v-if="storeSettings.showReviews" type="button" :class="show === 1 ? 'active' : ''" @click.prevent="show = 1">
        {{ $t('messages.shop.reviews') }} ({{ product.reviewCount }})
      </button>
    </nav>
    <div class="tab-contents">
      <div v-if="show === 0 && product.description" class="font-light mt-8 prose dark:prose-invert" v-html="product.description" />
      <ProductReviews v-if="show === 1" :product="product" />
    </div>
  </div>
</template>

<style scoped>
.tabs button {
  border-color: transparent;
  border-bottom-width: 2px;
  font-size: 1.125rem;
  padding-bottom: 2rem;
  margin-bottom: -1px;
}

.tabs button.active {
  border-color: var(--primary-color);
  color: var(--primary-color);
}
</style>
