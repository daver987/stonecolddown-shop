<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import type { ButtonColor, FormSubmitEvent } from '#ui/types';
import { z } from 'zod';

const { viewer, customer } = useAuth();
const { t } = useI18n();

const loading = ref<boolean>(false);
const button = ref<{ text: string; color: ButtonColor }>({ text: t('messages.account.updateDetails'), color: 'primary' });

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
      button.value = { text: t('messages.account.updateSuccess'), color: 'green' };
    }
  } catch (error) {
    button.value = { text: t('messages.account.failed'), color: 'red' };
  }
  loading.value = false;
  setTimeout(() => {
    button.value = { text: t('messages.account.updateDetails'), color: 'primary' };
  }, 2000);
}
</script>

<template>
  <UCard>
    <template #header>
      <h3 class="text-xl font-semibold">{{ $t('messages.billing.billingDetails') }}</h3>
    </template>

    <UForm :state="state" :schema="BillingSchema" @submit="onSubmit" class="space-y-4">
      <div class="grid grid-cols-1 gap-x-4 md:grid-cols-2">
        <UFormGroup name="firstName" :label="$t('messages.billing.firstName')" required>
          <UInput v-model="state.firstName" autocomplete="given-name" />
        </UFormGroup>

        <UFormGroup name="lastName" :label="$t('messages.billing.lastName')" required>
          <UInput v-model="state.lastName" autocomplete="family-name" />
        </UFormGroup>
      </div>

      <div class="grid grid-cols-1 gap-x-4 md:grid-cols-2">
        <UFormGroup name="phone" :label="$t('messages.billing.phone')">
          <UInput v-model="state.phone" autocomplete="tel" type="tel" />
        </UFormGroup>

        <UFormGroup name="company" :label="$t('messages.billing.company') + ' (' + $t('messages.general.optional') + ')'">
          <UInput v-model="state.company" autocomplete="organization" />
        </UFormGroup>
      </div>

      <UFormGroup name="address1" :label="$t('messages.billing.address1')" required>
        <UInput v-model="state.address1" autocomplete="address-line1" />
      </UFormGroup>

      <UFormGroup name="address2" :label="$t('messages.billing.address2') + ' (' + $t('messages.general.optional') + ')'">
        <UInput v-model="state.address2" autocomplete="address-line2" />
      </UFormGroup>

      <div class="grid grid-cols-1 gap-x-4 md:grid-cols-2">
        <UFormGroup name="city" :label="$t('messages.billing.city')" required>
          <UInput v-model="state.city" autocomplete="address-level2" />
        </UFormGroup>
        <UFormGroup name="state" :label="$t('messages.billing.state') + ' (' + $t('messages.general.optional') + ')'">
          <StateSelect v-model="state.state" :country-code="state.country" />
        </UFormGroup>
      </div>

      <div class="grid grid-cols-1 gap-x-4 md:grid-cols-2">
        <UFormGroup name="country" :label="$t('messages.billing.country')" required>
          <CountrySelect v-model="state.country" />
        </UFormGroup>

        <UFormGroup name="postcode" :label="$t('messages.billing.zip')" required>
          <UInput v-model="state.postcode" autocomplete="postal-code" />
        </UFormGroup>
      </div>

      <UFormGroup name="email" :label="$t('messages.billing.email')" required>
        <UInput v-model="state.email" autocomplete="email" type="email" />
      </UFormGroup>

      <div class="flex justify-end">
        <UButton type="submit" :loading="loading" :color="button.color" :disabled="loading">
          {{ button.text }}
        </UButton>
      </div>
    </UForm>
  </UCard>
</template>
