<script setup lang="ts">
import { z } from 'zod';
import type { FormSubmitEvent } from '#ui/types';

const { updateShippingLocation } = useCheckout();

const props = defineProps({
  modelValue: { type: Object, required: true },
});

const emit = defineEmits(['update:modelValue']);

const schema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  address1: z.string().min(1, 'Address is required'),
  address2: z.string().optional(),
  city: z.string().min(1, 'City is required'),
  state: z.string().optional(),
  country: z.string().min(1, 'Country is required'),
  postcode: z.string().min(1, 'Zip code is required'),
  phone: z.string().optional(),
});

type Schema = z.output<typeof schema>;

const state = reactive({ ...props.modelValue });

watch(
  state,
  (newValue) => {
    emit('update:modelValue', newValue);
  },
  { deep: true },
);

function onSubmit(event: FormSubmitEvent<Schema>) {
  // Handle form submission if needed
  console.log(event.data);
}
</script>

<template>
  <UForm :schema="schema" :state="state" class="grid w-full gap-4 lg:grid-cols-2" @submit="onSubmit">
    <UFormGroup :label="$t('messages.billing.firstName')" name="firstName">
      <UInput v-model="state.firstName" autocomplete="given-name" />
    </UFormGroup>

    <UFormGroup :label="$t('messages.billing.lastName')" name="lastName">
      <UInput v-model="state.lastName" autocomplete="family-name" />
    </UFormGroup>

    <UFormGroup :label="$t('messages.billing.address1')" name="address1" class="col-span-full">
      <UInput v-model="state.address1" autocomplete="street-address" />
    </UFormGroup>

    <UFormGroup :label="`${$t('messages.billing.address2')} (${$t('messages.general.optional')})`" name="address2" class="col-span-full">
      <UInput v-model="state.address2" autocomplete="address-line2" />
    </UFormGroup>

    <UFormGroup :label="$t('messages.billing.city')" name="city">
      <UInput v-model="state.city" autocomplete="locality" />
    </UFormGroup>

    <UFormGroup :label="`${$t('messages.billing.state')} (${$t('messages.general.optional')})`" name="state">
      <StateSelect v-model="state.state" :country-code="state.country" @change="updateShippingLocation" />
    </UFormGroup>

    <UFormGroup :label="$t('messages.billing.country')" name="country">
      <CountrySelect v-model="state.country" @change="updateShippingLocation" />
    </UFormGroup>

    <UFormGroup :label="$t('messages.billing.zip')" name="postcode">
      <UInput v-model="state.postcode" autocomplete="postal-code" />
    </UFormGroup>

    <UFormGroup :label="`${$t('messages.billing.phone')} (${$t('messages.general.optional')})`" name="phone" class="col-span-full">
      <UInput v-model="state.phone" autocomplete="tel" type="tel" />
    </UFormGroup>
  </UForm>
</template>
