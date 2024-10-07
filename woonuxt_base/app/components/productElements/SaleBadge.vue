<script setup lang="ts">
import type { Product } from '../../types';

const { t } = useI18n();
const { node } = defineProps({
  node: { type: Object as PropType<Product>, required: true },
});

const { storeSettings } = useAppConfig();

const salePercentage = computed((): string => {
  if (!node?.rawSalePrice || !node?.rawRegularPrice) return '';
  const salePrice = parseFloat(node?.rawSalePrice);
  const regularPrice = parseFloat(node?.rawRegularPrice);
  return `${Math.round(((salePrice - regularPrice) / regularPrice) * 100)} %`;
});

const showSaleBadge = computed(() => node.rawSalePrice && storeSettings.saleBadge !== 'hidden');

const textToDisplay = computed(() => {
  if (storeSettings?.saleBadge === 'percent') return salePercentage.value;
  return t('messages.shop.onSale') ? t('messages.shop.onSale') : 'Sale';
});
</script>

<template>
  <span v-if="showSaleBadge" class="red-badge">{{ textToDisplay }}</span>
</template>

<style scoped>
.red-badge {
  border-radius: 0.375rem;
  background-color: #f87171;
  font-size: 0.75rem;
  color: #ffffff;
  letter-spacing: -0.015em;
  padding-left: 0.375rem;
  padding-right: 0.375rem;
  line-height: 1.5rem;
  z-index: 10;
  background: #000 linear-gradient(0deg, #f87171, #f87171);
}
</style>
