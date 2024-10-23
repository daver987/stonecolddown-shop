<script setup lang="ts">
import { StockStatusEnum } from '#woo';
const { t } = useI18n();

const props = defineProps({
  stockStatus: { type: String, required: false },
});

const statusColor = computed(() => {
  switch (props.stockStatus) {
    case StockStatusEnum.IN_STOCK:
      return 'green';
    case StockStatusEnum.OUT_OF_STOCK:
      return 'red';
    case StockStatusEnum.ON_BACKORDER:
      return 'yellow';
    default:
      return 'gray';
  }
});

const statusText = computed(() => {
  switch (props.stockStatus) {
    case StockStatusEnum.IN_STOCK:
      return t('messages.shop.inStock');
    case StockStatusEnum.OUT_OF_STOCK:
      return t('messages.shop.outOfStock');
    case StockStatusEnum.ON_BACKORDER:
      return t('messages.shop.onBackorder');
    default:
      return 'Loading';
  }
});
</script>

<template>
  <UBadge :color="statusColor" variant="subtle" size="sm">
    {{ statusText }}
  </UBadge>
</template>
