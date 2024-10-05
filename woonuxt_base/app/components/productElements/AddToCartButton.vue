<script setup>
const { cart } = useCart();
const props = defineProps({
  disabled: { type: Boolean, default: false },
});
const isLoading = ref(false);
const { t } = useI18n();
const addToCartButtonText = computed(() => (isLoading.value ? t('messages.shop.adding') : t('messages.shop.addToCart')));

// stop loading when cart is updated
watch(cart, (val) => {
  isLoading.value = false;
});
</script>

<template>
  <UButton
    block
    type="submit"
    :class="{ disabled: disabled }"
    :disabled="disabled"
    :loading="isLoading"
    @click="isLoading = true">
    <span>{{ addToCartButtonText }}</span>
  </UButton>
</template>

<style scoped>
button {
  outline: none !important;
  transition: all 150ms ease-in;
}

button.disabled {
  cursor: not-allowed;
  background-color: #cbd5e0;
}
</style>
