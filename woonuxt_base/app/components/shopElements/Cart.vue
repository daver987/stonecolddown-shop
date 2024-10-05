<script setup lang="ts">
const { cart, toggleCart, isUpdatingCart } = useCart();
const { t } = useI18n();

const cartItemCount = computed(() => cart.value?.contents?.itemCount || 0);
const isCartEmpty = computed(() => cart.value?.isEmpty);
</script>

<template>
  <USlideover :modelValue="true">
    <UCard class="flex h-full flex-col">
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold">
            {{ t('messages.shop.cart') }}
            <span v-if="cartItemCount > 0">({{ cartItemCount }})</span>
          </h3>
          <UButton icon="i-heroicons-x-mark" color="gray" variant="ghost" @click="toggleCart(false)" aria-label="Close cart" />
        </div>
      </template>

      <ClientOnly>
        <template v-if="cart && !isCartEmpty">
          <div class="flex-1 overflow-y-auto">
            <ul class="space-y-4 p-4">
              <CartCard v-for="item in cart.contents?.nodes" :key="item.key" :item="item" />
            </ul>
          </div>
          <div class="p-4">
            <UButton to="/checkout" color="primary" block @click="toggleCart()">
              {{ t('messages.shop.checkout') }}
              <template #trailing>
                <span v-html="cart.total" />
              </template>
            </UButton>
          </div>
        </template>
        <EmptyCartMessage v-else-if="isCartEmpty" class="flex flex-1 items-center justify-center" />
        <div v-else class="flex flex-1 items-center justify-center">
          <UIcon name="i-heroicons-arrow-path" class="animate-spin" />
        </div>
      </ClientOnly>
    </UCard>

    <UOverlay v-if="isUpdatingCart" class="bg-white/50 dark:bg-gray-900/50">
      <UIcon name="i-heroicons-arrow-path" class="animate-spin" />
    </UOverlay>
  </USlideover>
</template>
