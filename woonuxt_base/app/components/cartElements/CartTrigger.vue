<script setup lang="ts">
const { toggleCart, cart } = useCart();
</script>

<template>
  <UTooltip text="Cart">
    <UButton
      icon="i-heroicons-shopping-cart"
      color="gray"
      variant="ghost"
      @click="toggleCart"
      class="relative rounded-md"
    >
      <ClientOnly>
        <UBadge
          v-if="cart?.contents?.itemCount > 0"
          :value="cart.contents.itemCount"
          size="xs"
          color="primary"
          class="absolute -top-1 -right-1"
        />
      </ClientOnly>
    </UButton>
  </UTooltip>
</template>
