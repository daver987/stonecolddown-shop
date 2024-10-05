<script setup lang="ts">
import { loadStripe } from '@stripe/stripe-js';
import type { Stripe, StripeElements, CreateSourceData, StripeCardElement } from '@stripe/stripe-js';
import { useI18n } from 'vue-i18n';
import { useRoute, useRuntimeConfig } from '#app';
import { z } from 'zod';

const { t } = useI18n();
const { query } = useRoute();
const { cart, isUpdatingCart, paymentGateways } = useCart();
const { customer, viewer } = useAuth();
const { orderInput, isProcessingOrder, proccessCheckout } = useCheckout();
const runtimeConfig = useRuntimeConfig();
const stripeKey = runtimeConfig.public?.STRIPE_PUBLISHABLE_KEY || null;

const buttonText = ref<string>(isProcessingOrder.value ? t('messages.general.processing') : t('messages.shop.checkoutButton'));
const isCheckoutDisabled = computed<boolean>(() => isProcessingOrder.value || isUpdatingCart.value || !orderInput.value.paymentMethod);

const isInvalidEmail = ref<boolean>(false);
const stripe: Stripe | null = stripeKey ? await loadStripe(stripeKey as string) : null;
const elements = ref();
const isPaid = ref<boolean>(false);

const CheckoutSchema = z.object({
  email: z.string().email(t('messages.billing.enterValidEmail')),
  username: z.string().optional(),
  password: z.string().min(6, t('messages.account.enterPassword')).optional(),
  createAccount: z.boolean().optional(),
  shipToDifferentAddress: z.boolean().optional(),
  customerNote: z.string().optional(),
});

type Checkout = z.infer<typeof CheckoutSchema>;

const state = ref<Checkout>({
  email: customer.value.billing?.email || '',
  username: orderInput.value.username || '',
  password: orderInput.value.password || '',
  createAccount: orderInput.value.createAccount || false,
  shipToDifferentAddress: orderInput.value.shipToDifferentAddress || false,
  customerNote: orderInput.value.customerNote || '',
});

onBeforeMount(async () => {
  if (query.cancel_order) window.close();
});

const payNow = async () => {
  buttonText.value = t('messages.general.processing');

  const { stripePaymentIntent } = await GqlGetStripePaymentIntent();
  const clientSecret = stripePaymentIntent?.clientSecret || '';

  try {
    if (orderInput.value.paymentMethod.id === 'stripe' && stripe && elements.value) {
      const cardElement = elements.value.getElement('card') as StripeCardElement;
      const { setupIntent } = await stripe.confirmCardSetup(clientSecret, { payment_method: { card: cardElement } });
      const { source } = await stripe.createSource(cardElement as CreateSourceData);

      if (source) orderInput.value.metaData.push({ key: '_stripe_source_id', value: source.id });
      if (setupIntent) orderInput.value.metaData.push({ key: '_stripe_intent_id', value: setupIntent.id });

      isPaid.value = setupIntent?.status === 'succeeded' || false;
      orderInput.value.transactionId = source?.created?.toString() || new Date().getTime().toString();
    }
  } catch (error) {
    console.error(error);
    buttonText.value = t('messages.shop.placeOrder');
  }

  proccessCheckout(isPaid.value);
};

const handleStripeElement = (stripeElements: StripeElements): void => {
  elements.value = stripeElements;
};

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

const checkEmailOnBlur = (email?: string | null): void => {
  if (email) isInvalidEmail.value = !emailRegex.test(email);
};

const checkEmailOnInput = (email?: string | null): void => {
  if (email && isInvalidEmail.value) isInvalidEmail.value = !emailRegex.test(email);
};

useSeoMeta({
  title: t('messages.shop.checkout'),
});
</script>

<template>
  <div class="flex min-h-[600px] flex-col">
    <template v-if="cart && customer">
      <div v-if="cart.isEmpty" class="mb-12 flex flex-1 flex-col items-center justify-center">
        <UIcon name="ion:cart-outline" size="156" class="mb-5 opacity-25" />
        <h2 class="mb-2 text-2xl font-bold">{{ $t('messages.shop.cartEmpty') }}</h2>
        <span class="mb-4 text-gray-400">{{ $t('messages.shop.addProductsInYourCart') }}</span>
        <ULink
          to="/products"
          class="mt-4 flex items-center justify-center gap-3 rounded-lg bg-primary p-2 px-3 text-center font-semibold text-white shadow-md hover:bg-primary-dark">
          {{ $t('messages.shop.browseOurProducts') }}
        </ULink>
      </div>

      <UForm :state="state" :schema="CheckoutSchema" class="container my-16 flex flex-wrap items-start justify-evenly gap-8 lg:gap-20" @submit.prevent="payNow">
        <div class="checkout-form grid w-full max-w-2xl gap-8 md:flex-1">
          <!-- Customer details -->
          <div v-if="!viewer && customer.billing" class="space-y-2">
            <h2 class="mb-2 w-full text-2xl font-semibold leading-none">Contact Information</h2>
            <p class="mt-1 text-sm text-gray-500">Already have an account? <ULink to="/my-account" class="text-semibold text-primary">Log in</ULink>.</p>
            <UFormGroup name="email" :label="$t('messages.billing.email')" required>
              <UInput
                v-model="state.email"
                placeholder="example@email.com"
                autocomplete="email"
                type="email"
                :class="{ 'has-error': isInvalidEmail }"
                @blur="checkEmailOnBlur(state.email)"
                @input="checkEmailOnInput(state.email)" />
              <Transition name="scale-y" mode="out-in">
                <div v-if="isInvalidEmail" class="mt-1 text-sm text-red-500">Invalid email address</div>
              </Transition>
            </UFormGroup>
            <template v-if="state.createAccount">
              <UFormGroup name="username" :label="$t('messages.account.username')" required>
                <UInput v-model="state.username" placeholder="johndoe" type="text" />
              </UFormGroup>
              <UFormGroup name="password" :label="$t('messages.account.password')" required>
                <UInput type="password" v-model="state.password" placeholder="••••••••" />
              </UFormGroup>
            </template>
            <UFormGroup>
              <UCheckbox v-model="state.createAccount" label="Create an account?" />
            </UFormGroup>
          </div>

          <div>
            <h2 class="mb-3 w-full text-2xl font-semibold">{{ $t('messages.billing.billingDetails') }}</h2>
            <BillingDetails v-model="customer.billing" />
          </div>

          <UFormGroup v-if="cart.availableShippingMethods.length > 0" name="shipToDifferentAddress">
            <UCheckbox v-model="state.shipToDifferentAddress" label="{{ $t('messages.billing.differentAddress') }}" />
          </UFormGroup>

          <Transition name="scale-y" mode="out-in">
            <div v-if="state.shipToDifferentAddress">
              <h2 class="mb-4 text-xl font-semibold">{{ $t('messages.general.shippingDetails') }}</h2>
              <ShippingDetails v-model="customer.shipping" />
            </div>
          </Transition>

          <!-- Shipping methods -->
          <div v-if="cart.availableShippingMethods.length">
            <h3 class="mb-4 text-xl font-semibold">{{ $t('messages.general.shippingSelect') }}</h3>
            <ShippingOptions :options="cart.availableShippingMethods[0].rates" :active-option="cart.chosenShippingMethods[0]" />
          </div>

          <!-- Pay methods -->
          <div v-if="paymentGateways?.nodes.length" class="col-span-full mt-2">
            <h2 class="mb-4 text-xl font-semibold">{{ $t('messages.billing.paymentOptions') }}</h2>
            <PaymentOptions v-model="orderInput.paymentMethod" class="mb-4" :paymentGateways />
            <StripeElement v-if="stripe" v-show="orderInput.paymentMethod.id == 'stripe'" :stripe @updateElement="handleStripeElement" />
          </div>

          <!-- Order note -->
          <UFormGroup name="orderNote" :label="$t('messages.shop.orderNote') + ' (' + $t('messages.general.optional') + ')'">
            <UTextarea v-model="state.customerNote" name="order-note" :rows="4" :placeholder="$t('messages.shop.orderNotePlaceholder')" size="md" />
          </UFormGroup>
        </div>

        <OrderSummary>
          <UButton class="w-full" :loading="isProcessingOrder" :disabled="isCheckoutDisabled" :label="buttonText" color="primary" size="lg" />
        </OrderSummary>
      </UForm>
    </template>
    <LoadingIcon v-else class="m-auto" />
  </div>
</template>

<style scoped>
.checkout-form .has-error {
  border-color: #f87171;
}
</style>
