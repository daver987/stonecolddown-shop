<script setup lang="ts">
import type { Order } from '../../types';

const props = defineProps<{ order: Order }>();

const readableStatus = computed(() => props.order?.status?.replace(/_/g, ' ') || '');
</script>

<template>
  <span :class="`order-${order?.status}`" class="order-status">{{ readableStatus }}</span>
</template>

<style scoped>
.order-status {
  border: 1px solid;
  border-radius: 0.375rem;
  font-weight: 600;
  background-color: #f3f4f6;
  font-size: 0.75rem;
  line-height: 1;
  padding: 0.375rem;
  display: inline-block;
}

.order-COMPLETED {
  background-color: #d1fae5;
  border-color: #a7f3d0;
  color: #059669;
}

.order-CANCELLED {
  background-color: #fee2e2;
  border-color: #fecaca;
  color: #dc2626;
}

.order-PENDING {
  background-color: #fef3c7;
  border-color: #fde68a;
  color: #ca8a04;
}

.order-PROCESSING {
  background-color: #dbeafe;
  border-color: #bfdbfe;
  color: #2563eb;
}
</style>
