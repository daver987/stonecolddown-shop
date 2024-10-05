<script setup lang="ts">
const { toggleCart } = useCart();
const { t } = useI18n();
</script>

<template>
  <div class="flex flex-col items-center justify-center flex-1 p-8 text-center">
    <UIcon name="i-heroicons-shopping-cart" class="text-gray-400 dark:text-gray-500 mb-6" size="xl" />
    <h3 class="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
      {{ t('messages.shop.cartEmpty') }}
    </h3>
    <p class="text-gray-600 dark:text-gray-400 mb-8">
      {{ t('messages.shop.addProductsInYourCart') }}
    </p>
    <UButton to="/products" color="primary" @click="toggleCart(false)">
      {{ t('messages.shop.browseOurProducts') }}
    </UButton>
  </div>
</template>
