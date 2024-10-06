<script setup>
const { cart } = useCart();
const props = defineProps({
  disabled: { type: Boolean, default: false },
});
const isLoading = ref(false);
const { t } = useI18n();
const addToCartButtonText = computed(() => (isLoading.value ? t('messages.shop.adding') : t('messages.shop.addToCart')));

watch(cart, (val) => {
  isLoading.value = false;
});
</script>

<template>
  <UButton :label="addToCartButtonText" block type="submit" :class="{ disabled: disabled }" :loading="isLoading" @click="isLoading = true" />
</template>
