<script setup lang="ts">
import type { CartItem } from '../../types';

const { updateItemQuantity, isUpdatingCart, cart } = useCart();
const { debounce } = useHelpers();

const props = defineProps({
  item: { type: Object as PropType<any>, required: true },
});

const productType = computed(() => (props.item.variation ? props.item.variation?.node : props.item.product?.node));
const quantity = ref(props.item.quantity);
const hasNoMoreStock = computed(() => (productType.value.stockQuantity ? productType.value.stockQuantity <= quantity.value : false));

const incrementQuantity = () => quantity.value++;
const decrementQuantity = () => quantity.value--;

watch(
  quantity,
  debounce(() => {
    if (quantity.value !== '') {
      updateItemQuantity(props.item.key, quantity.value);
    }
  }, 250),
);

const onFocusOut = () => {
  if (quantity.value === '') {
    const cartItem = cart.value?.contents?.nodes?.find((node: CartItem) => node.key === props.item.key);
    if (cartItem) {
      quantity.value = cartItem.quantity;
    }
  }
};
</script>

<template>
  <UInputGroup class="w-24">
    <UButton
      icon="i-heroicons-minus"
      color="gray"
      variant="outline"
      :disabled="isUpdatingCart || quantity <= 0"
      @click="decrementQuantity"
      aria-label="Decrease Quantity" />
    <UInput
      v-model.number="quantity"
      type="number"
      :min="0"
      :max="productType.stockQuantity"
      aria-label="Quantity"
      @focusout="onFocusOut"
      class="text-center" />
    <UButton
      icon="i-heroicons-plus"
      color="gray"
      variant="outline"
      :disabled="isUpdatingCart || hasNoMoreStock"
      @click="incrementQuantity"
      aria-label="Increase Quantity" />
  </UInputGroup>
</template>

<style scoped>
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type='number'] {
  -moz-appearance: textfield;
  appearance: textfield;
}
</style>
