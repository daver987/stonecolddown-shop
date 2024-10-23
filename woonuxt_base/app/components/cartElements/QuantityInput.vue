<script setup lang="ts">
import type { CartItem } from '../../types'

const { updateItemQuantity, isUpdatingCart, cart } = useCart()
const { debounce } = useHelpers()

const props = defineProps({
  item: { type: Object as PropType<CartItem>, required: true },
})

const productType = computed(() => (props.item.variation ? props.item.variation?.node : props.item.product?.node))
const quantity = ref(props.item.quantity)
const hasNoMoreStock = computed(() =>
  'stockQuantity' in productType.value && productType.value.stockQuantity != null ? productType.value.stockQuantity <= quantity.value : false,
)

const incrementQuantity = () => quantity.value++
const decrementQuantity = () => quantity.value--

watch(
  quantity,
  debounce(() => {
    if (quantity.value !== 0) {
      updateItemQuantity(props.item.key, quantity.value)
    }
  }, 250),
)

const onFocusOut = () => {
  if (quantity.value === 0) {
    const cartItem = cart.value?.contents?.nodes?.find((node) => node.key === props.item.key)
    if (cartItem?.quantity != null) {
      quantity.value = cartItem.quantity
    }
  }
}

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  const value = target.value.replace(/[^0-9]/g, '')
  quantity.value = value ? Number.parseInt(value, 10) : 0
}
</script>

<template>
  <UButtonGroup>
    <UButton
      icon="i-heroicons-minus"
      size="2xs"
      variant="ghost"
      color="white"
      :disabled="isUpdatingCart || quantity <= 0"
      @click="decrementQuantity"
      aria-label="Decrease Quantity" />
    <UInput
      :model-value="quantity"
      type="text"
      size="2xs"
      class="w-8"
      inputmode="numeric"
      pattern="[0-9]*"
      aria-label="Quantity"
      @input="onInput"
      @focusout="onFocusOut" />
    <UButton
      icon="i-heroicons-plus"
      size="2xs"
      color="white"
      variant="ghost"
      :disabled="isUpdatingCart || hasNoMoreStock"
      @click="incrementQuantity"
      aria-label="Increase Quantity" />
  </UButtonGroup>
</template>
