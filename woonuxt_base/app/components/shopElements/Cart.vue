<script setup lang="ts">
const { cart, toggleCart, isUpdatingCart, isShowingCart } = useCart();
const { t } = useI18n();

const cartItemCount = computed(() => cart.value?.contents?.itemCount || 0);
const isCartEmpty = computed(() => cart.value?.isEmpty);
</script>

<template>
  <USlideover v-model="isShowingCart">
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
            <ul role="list" class="divide-y divide-gray-200 border-b border-t border-gray-200/10">
              <CartCard v-for="item in cart.contents?.nodes" :key="item.key" :item="item" />
            </ul>
          </div>
          <div class="p-4">
            <UButton to="/checkout" color="primary" block @click="toggleCart(false)">
              {{ t('messages.shop.checkout') }}
              <template #trailing>
                <span v-html="cart.total" />
              </template>
            </UButton>
          </div>
        </template>
        <EmptyCartMessage v-else-if="isCartEmpty" class="flex flex-1 items-center justify-center" />
        <div v-else class="flex flex-1 items-center justify-center">
          <Icon name="i-heroicons-arrow-path" class="animate-spin" size="24" />
        </div>
      </ClientOnly>
    </UCard>

    <div v-if="isUpdatingCart" class="absolute inset-0 flex items-center justify-center bg-white dark:bg-gray-900 bg-opacity-20">
      <Icon name="i-heroicons-arrow-path" class="animate-spin" size="24" />
    </div>
  </USlideover>
</template>
