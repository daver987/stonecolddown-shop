<script setup>
const { cart, isUpdatingCart } = useCart();

const links = [
  {
    label: 'Cart',
    href: '/cart',
  },
];
</script>

<template>
  <Aside v-if="cart" :links="links">
    <template #top>
      <h2 class="text-xl font-semibold leading-none mb-6">{{ $t('messages.shop.orderSummary') }}</h2>
    </template>

    <ul class="flex flex-col gap-4 overflow-y-auto">
      <CartCard v-for="item in cart.contents.nodes" :key="item.key" :item />
    </ul>

    <AddCoupon class="my-8" />

    <div class="grid gap-1 text-sm font-semibold text-gray-500">
      <div class="flex justify-between">
        <span>{{ $t('messages.shop.subtotal') }}</span>
        <span class="text-gray-700 tabular-nums" v-html="cart.subtotal" />
      </div>
      <div class="flex justify-between">
        <span>{{ $t('messages.general.shipping') }}</span>
        <span class="text-gray-700 tabular-nums"> {{ parseFloat(cart.shippingTotal) > 0 ? '+' : '' }} {{ cart.shippingTotal }} </span>
      </div>
      <transition name="scale-y" mode="out-in">
        <div v-if="cart && cart.appliedCoupons" class="flex justify-between">
          <span>{{ $t('messages.shop.discount') }}</span>
          <span class="text-primary tabular-nums">- <span v-html="cart.discountTotal" /></span>
        </div>
      </transition>
      <div class="flex justify-between mt-4">
        <span>{{ $t('messages.shop.total') }}</span>
        <span class="text-lg font-bold text-gray-700 tabular-nums" v-html="cart.total" />
      </div>
    </div>

    <slot></slot>

    <template #bottom>
      <div v-if="isUpdatingCart" class="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50">
        <LoadingIcon />
      </div>
    </template>
  </Aside>
</template>
