<script setup lang="ts">
import { z } from 'zod';
import type { FormSubmitEvent } from '#ui/types';

const { viewer, customer } = useAuth();
const { t } = useI18n();

const loading = ref<boolean>(false);
const buttonState = ref<{ text: string; color: 'primary' | 'green' | 'red' }>({ text: t('messages.account.updateDetails'), color: 'primary' });

const schema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email'),
});

type Schema = z.output<typeof schema>;

const state = reactive({
  firstName: customer.value?.firstName || '',
  lastName: customer.value?.lastName || '',
  email: customer.value?.email || '',
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
  loading.value = true;
  buttonState.value = { text: t('messages.account.updating'), color: 'primary' };

  try {
    const { updateCustomer } = await GqlUpdateCustomer({
      input: {
        id: viewer.value?.id,
        firstName: event.data.firstName,
        lastName: event.data.lastName,
        email: event.data.email,
      },
    });

    if (updateCustomer) {
      buttonState.value = { text: t('messages.account.updateSuccess'), color: 'green' };
    }
  } catch (error) {
    buttonState.value = { text: t('messages.account.failed'), color: 'red' };
  }

  loading.value = false;

  setTimeout(() => {
    buttonState.value = { text: t('messages.account.updateDetails'), color: 'primary' };
  }, 2000);
}
</script>

<template>
  <UCard v-if="customer">
    <template #header>
      <h3 class="text-xl font-semibold">{{ $t('messages.account.personalInfo') }}</h3>
    </template>

    <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
      <div class="grid grid-cols-1 gap-x-4 md:grid-cols-2">
        <UFormGroup :label="$t('messages.billing.firstName')" name="firstName">
          <UInput v-model="state.firstName" autocomplete="given-name" />
        </UFormGroup>

        <UFormGroup :label="$t('messages.billing.lastName')" name="lastName">
          <UInput v-model="state.lastName" autocomplete="family-name" />
        </UFormGroup>
      </div>
      <div class="grid grid-cols-1 gap-x-4 md:grid-cols-2">
        <UFormGroup :label="$t('messages.account.username')" name="username">
          <UInput :model-value="customer.username" autocomplete="username" readonly />
        </UFormGroup>

        <UFormGroup :label="$t('messages.billing.email')" name="email">
          <UInput v-model="state.email" autocomplete="email" type="email" />
        </UFormGroup>
      </div>
      <div class="flex justify-end">
        <UButton type="submit" :loading="loading" :color="buttonState.color" :disabled="loading">
          {{ buttonState.text }}
        </UButton>
      </div>
    </UForm>
  </UCard>
</template>
