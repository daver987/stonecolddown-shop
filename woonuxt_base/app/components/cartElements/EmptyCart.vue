<script setup lang="ts">
const { emptyCart } = useCart();
</script>

<template>
  <UButton icon="i-heroicons-trash" size="sm" color="primary" variant="solid" class="top-6 right-6 md:right-8 absolute" @click="emptyCart" />
</template>
