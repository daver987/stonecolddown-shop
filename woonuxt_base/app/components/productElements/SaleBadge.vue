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
  <UBadge v-if="showSaleBadge" color="red" variant="solid" size="sm">{{ textToDisplay }}</UBadge>
</template>
