<script setup>
const { cart, isUpdatingCart } = useCart();
</script>

<template>
  <Aside v-if="cart" class="border border-gray-200 dark:border-gray-800 py-6 px-4 rounded-lg shadow-lg bg-white dark:bg-gray-800">
    <template #top>
      <h2 class="text-xl font-semibold leading-none mb-6">{{ $t('messages.shop.orderSummary') }}</h2>
    </template>

    <ul class="flex flex-col gap-4 overflow-y-auto">
      <CartCard v-for="item in cart.contents.nodes" :key="item.key" :item />
    </ul>

    <AddCoupon class="my-4" />

    <div class="grid gap-1 text-sm font-semibold">
      <div class="flex justify-between">
        <span>{{ $t('messages.shop.subtotal') }}</span>
        <span class="tabular-nums" v-html="cart.subtotal" />
      </div>
      <div class="flex justify-between">
        <span>{{ $t('messages.general.shipping') }}</span>
        <span class="tabular-nums"> {{ Number.parseFloat(cart.shippingTotal) > 0 ? '+' : '' }} {{ cart.shippingTotal }} </span>
      </div>
      <transition name="scale-y" mode="out-in">
        <div v-if="cart && cart.appliedCoupons" class="flex justify-between">
          <span>{{ $t('messages.shop.discount') }}</span>
          <span class="text-primary tabular-nums">- <span v-html="cart.discountTotal" /></span>
        </div>
      </transition>
      <div class="flex justify-between mt-4 mb-2">
        <span>{{ $t('messages.shop.total') }}</span>
        <span class="text-lg font-bold tabular-nums" v-html="cart.total" />
      </div>
    </div>

    <slot></slot>

    <template #bottom>
      <div v-if="isUpdatingCart" class="absolute inset-0 flex items-center justify-center bg-white dark:bg-gray-800 bg-opacity-30">
        <LoadingIcon />
      </div>
    </template>
  </Aside>
</template>
