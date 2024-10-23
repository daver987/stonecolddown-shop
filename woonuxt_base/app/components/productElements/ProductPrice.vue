<script setup lang="ts">
interface ProductPriceProps {
  regularPrice?: string | null;
  salePrice?: string | null;
}

const props = defineProps<ProductPriceProps>();

const regularPrice = computed(() => props.regularPrice);
const salePrice = computed(() => props.salePrice);
</script>

<template>
  <div v-if="regularPrice" class="flex font-semibold">
    <span :class="{ 'text-gray-400 line-through font-normal': salePrice }" v-html="regularPrice" />
    <span v-if="salePrice" class="ml-2" v-html="salePrice" />
  </div>
</template>
