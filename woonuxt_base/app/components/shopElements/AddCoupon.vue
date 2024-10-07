<script setup lang="ts">
import { z } from 'zod';
import type { FormSubmitEvent } from '#ui/types';

const { cart, isUpdatingCoupon, applyCoupon, removeCoupon } = useCart();
const errorMessage = ref<string>('');

const schema = z.object({
  couponCode: z.string().min(1, 'Coupon code is required'),
});

type Schema = z.output<typeof schema>;

const state = reactive({
  couponCode: '',
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
  const { message } = await applyCoupon(event.data.couponCode);
  if (message) {
    errorMessage.value = message;
  } else {
    state.couponCode = '';
    errorMessage.value = '';
  }
}
</script>

<template>
  <div>
    <UForm :schema="schema" :state="state" @submit="onSubmit">
      <UFormGroup name="couponCode">
        <UButtonGroup>
          <UInput size="lg" v-model="state.couponCode" :placeholder="$t('messages.shop.couponCode')" class="flex-grow md:w-[450px]" />
          <UButton type="submit" color="gray" :loading="isUpdatingCoupon" size="lg">
            {{ $t('messages.general.apply') }}
          </UButton>
        </UButtonGroup>
      </UFormGroup>
    </UForm>

    <transition name="fade" mode="out-in">
      <p v-if="errorMessage" class="mt-2 text-xs text-red-600" v-html="errorMessage"></p>
    </transition>

    <transition name="fade" mode="out-in">
      <div v-if="cart && cart.appliedCoupons" class="text-xs font-semibold uppercase flex flex-wrap gap-2">
        <div v-for="(coupon, index) in cart.appliedCoupons" :key="coupon?.code || index" class="flex flex-wrap mt-2 flex-2">
          <UBadge v-if="coupon?.code" :label="coupon.code" color="primary" variant="subtle" class="p-1.5">
            <template #end>
              <UButton color="primary" variant="ghost" icon="i-ion-close" size="2xs" @click="removeCoupon(coupon.code)" />
            </template>
          </UBadge>
        </div>
      </div>
    </transition>
  </div>
</template>
