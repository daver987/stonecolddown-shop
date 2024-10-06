<script setup lang="ts">
import type { FormSubmitEvent } from '#ui/types';
import { z } from 'zod';
import { useI18n } from 'vue-i18n';

const { updateShippingLocation } = useCheckout();
const { isBillingAddressEnabled } = useCart();
const { t } = useI18n();

const BillingSchema = z.object({
  firstName: z.string().min(1, t('messages.validation.required')),
  lastName: z.string().min(1, t('messages.validation.required')),
  address1: z.string().min(1, t('messages.validation.required')).optional(),
  address2: z.string().optional(),
  city: z.string().min(1, t('messages.validation.required')).optional(),
  state: z.string().optional(),
  country: z.string().min(1, t('messages.validation.required')).optional(),
  postcode: z.string().min(1, t('messages.validation.required')).optional(),
  phone: z.string().optional(),
});

type BillingDetails = z.infer<typeof BillingSchema>;

const props = defineProps({
  modelValue: { type: Object as () => BillingDetails, required: true },
});

const emit = defineEmits(['update:modelValue']);

const billing = reactive({ ...props.modelValue });

watch(
  () => billing,
  (newVal) => {
    emit('update:modelValue', newVal);
  },
  { deep: true },
);

function onSubmit(event: FormSubmitEvent<BillingDetails>) {
  // Handle form submission if necessary
}
</script>

<template>
  <UForm :state="billing" :schema="BillingSchema" @submit="onSubmit" class="space-y-2">
    <template #links>
      <UButton type="submit" :label="t('messages.general.submit')" color="black" />
    </template>

    <div class="mb-2 grid grid-cols-1 gap-4 md:grid-cols-2">
      <UFormGroup name="firstName" :label="t('messages.billing.firstName')" required>
        <UInput v-model="billing.firstName" placeholder="John" autocomplete="given-name" type="text" required />
      </UFormGroup>

      <UFormGroup name="lastName" :label="t('messages.billing.lastName')" required>
        <UInput v-model="billing.lastName" placeholder="Doe" autocomplete="family-name" type="text" required />
      </UFormGroup>
    </div>

    <div v-if="isBillingAddressEnabled">
      <div class="mb-2">
        <UFormGroup name="address1" :label="t('messages.billing.address1')" required>
          <UInput v-model="billing.address1" placeholder="O'Connell Street 47" autocomplete="street-address" type="text" required />
        </UFormGroup>
      </div>
      <div class="mb-2">
        <UFormGroup name="address2" :label="`${t('messages.billing.address2')} (${t('messages.general.optional')})`">
          <UInput v-model="billing.address2" placeholder="Apartment, studio, or floor" autocomplete="address-line2" type="text" />
        </UFormGroup>
      </div>
      <div class="mb-2 grid grid-cols-1 gap-x-4 md:grid-cols-2">
        <UFormGroup name="city" :label="t('messages.billing.city')" required>
          <UInput v-model="billing.city" placeholder="New York" autocomplete="locality" type="text" required />
        </UFormGroup>

        <UFormGroup name="state" :label="`${t('messages.billing.state')} (${t('messages.general.optional')})`">
          <StateSelect
            v-model:state-name="billing.state"
            v-model:country-code="billing.country"
            :default-value="billing.state"
            @change="updateShippingLocation"
            autocomplete="address-level1" />
        </UFormGroup>
      </div>

      <div class="mb-2 grid grid-cols-1 gap-4 md:grid-cols-2">
        <UFormGroup name="country" :label="t('messages.billing.country')" required>
          <CountrySelect v-model="billing.country" :default-value="billing.country" @change="updateShippingLocation" autocomplete="country" />
        </UFormGroup>

        <UFormGroup name="postcode" :label="t('messages.billing.zip')" required>
          <UInput v-model="billing.postcode" placeholder="10001" autocomplete="postal-code" type="text" required />
        </UFormGroup>
      </div>
      <div class="mb-2">
        <UFormGroup name="phone" :label="`${t('messages.billing.phone')} (${t('messages.general.optional')})`">
          <UInput v-model="billing.phone" placeholder="+1 234 567 8901" autocomplete="tel" type="tel" />
        </UFormGroup>
      </div>
    </div>
  </UForm>
</template>
