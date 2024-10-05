<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import type { ButtonColor, FormSubmitEvent } from '#ui/types';
import { z } from 'zod';

const { viewer, customer } = useAuth();
const { t } = useI18n();

const loading = ref<boolean>(false);
const button = ref<{ text: string; color: string }>({ text: t('messages.account.updateDetails'), color: 'bg-primary hover:bg-primary-dark' });

const BillingSchema = z.object({
  firstName: z.string().min(1, t('messages.billing.enterFirstName')),
  lastName: z.string().min(1, t('messages.billing.enterLastName')),
  phone: z.string().optional(),
  company: z.string().optional(),
  address1: z.string().min(1, t('messages.billing.enterAddress')),
  address2: z.string().optional(),
  city: z.string().min(1, t('messages.billing.enterCity')),
  state: z.string().optional(),
  country: z.string().min(1, t('messages.billing.enterCountry')),
  postcode: z.string().min(1, t('messages.billing.enterZip')),
  email: z.string().email(t('messages.billing.enterValidEmail')),
});

type Billing = z.infer<typeof BillingSchema>;

const state = ref({ ...customer.value.billing });

async function onSubmit(event: FormSubmitEvent<Billing>) {
  loading.value = true;
  button.value.text = t('messages.account.updating');
  try {
    const { updateCustomer } = await GqlUpdateCustomer({ input: { id: viewer.value?.id, billing: state.value } });
    if (updateCustomer) {
      button.value = { text: t('messages.account.updateSuccess'), color: 'bg-green-500' };
    }
  } catch (error) {
    button.value = { text: t('messages.account.failed'), color: 'bg-red-500' };
  }
  loading.value = false;
  setTimeout(() => {
    button.value = { text: t('messages.account.updateDetails'), color: 'bg-primary hover:bg-primary-dark' };
  }, 2000);
}
</script>

<template>
  <UForm :state="state" :schema="BillingSchema" @submit="onSubmit" class="space-y-2">
    <template #links>
      <UButton :loading="loading" type="submit" :label="button.text" :color="button.color as ButtonColor" />
    </template>

    <div class="grid grid-cols-1 gap-x-4 md:grid-cols-2">
      <UFormGroup name="firstName" :label="$t('messages.billing.firstName')" required :ui="{ container: '' }">
        <UInput v-model="state.firstName" autocomplete="given-name" size="md" />
      </UFormGroup>

      <UFormGroup name="lastName" :label="$t('messages.billing.lastName')" required :ui="{ container: '' }">
        <UInput v-model="state.lastName" autocomplete="family-name" size="md" />
      </UFormGroup>
    </div>

    <div class="grid grid-cols-1 gap-x-4 md:grid-cols-2">
      <UFormGroup name="phone" :label="$t('messages.billing.phone')" :ui="{ container: '' }">
        <UInput v-model="state.phone" autocomplete="tel" type="tel" size="md" />
      </UFormGroup>

      <UFormGroup name="company" :label="$t('messages.billing.company') + ' (' + $t('messages.general.optional') + ')'" :ui="{ container: '' }">
        <UInput v-model="state.company" autocomplete="organization" size="md" />
      </UFormGroup>
    </div>

    <div>
      <UFormGroup name="address1" :label="$t('messages.billing.address1')" required :ui="{ container: '' }">
        <UInput v-model="state.address1" autocomplete="address-line1" size="md" />
      </UFormGroup>
    </div>
    <div>
      <UFormGroup name="address2" :label="$t('messages.billing.address2') + ' (' + $t('messages.general.optional') + ')'" :ui="{ container: '' }">
        <UInput v-model="state.address2" autocomplete="address-line2" size="md" />
      </UFormGroup>
    </div>

    <div class="grid grid-cols-1 gap-x-4 md:grid-cols-2">
      <UFormGroup name="city" :label="$t('messages.billing.city')" required :ui="{ container: '' }">
        <UInput v-model="state.city" autocomplete="address-level2" size="md" />
      </UFormGroup>
      <UFormGroup name="state" :label="$t('messages.billing.state') + ' (' + $t('messages.general.optional') + ')'" :ui="{ container: '' }">
        <StateSelect v-model="state.state" :country-code="state.country" />
      </UFormGroup>
    </div>

    <div class="grid grid-cols-1 gap-x-4 md:grid-cols-2">
      <UFormGroup name="country" :label="$t('messages.billing.country')" required :ui="{ container: '' }">
        <CountrySelect v-model="state.country" />
      </UFormGroup>

      <UFormGroup name="postcode" :label="$t('messages.billing.zip')" required :ui="{ container: '' }">
        <UInput v-model="state.postcode" autocomplete="postal-code" size="md" />
      </UFormGroup>
    </div>

    <div>
      <UFormGroup name="email" :label="$t('messages.billing.email')" required :ui="{ container: '' }">
        <UInput v-model="state.email" autocomplete="email" type="email" size="md" />
      </UFormGroup>
    </div>
  </UForm>
</template>
