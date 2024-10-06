<script setup lang="ts">
import { z } from 'zod';
import type { FormSubmitEvent, ButtonColor } from '#ui/types';
import { useI18n } from 'vue-i18n';

const { viewer, loginUser } = useAuth();
const { t } = useI18n();

const schema = z
  .object({
    newPassword: z.string().min(8, t('messages.error.passwordMinLength')),
    confirmPassword: z.string().min(8, t('messages.error.passwordMinLength')),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: t('messages.error.passwordMismatch'),
    path: ['confirmPassword'],
  });

const state = reactive({
  newPassword: '',
  confirmPassword: '',
});

const loading = ref<boolean>(false);
const button = ref<{ text: string; color: string }>({ text: t('messages.account.updatePassword'), color: 'bg-primary hover:bg-primary-dark' });
const errorMessage = ref<string>('');

async function onSubmit(event: FormSubmitEvent<typeof schema>) {
  errorMessage.value = '';
  loading.value = true;

  try {
    const { updateCustomer } = await GqlUpdateCustomer({ input: { id: viewer.value.id, password: state.newPassword } });
    if (updateCustomer) {
      button.value = { text: t('messages.account.updateSuccess'), color: 'bg-green-500' };
      const { success, error } = await loginUser({ username: viewer.value.username, password: state.newPassword });
      if (error) {
        errorMessage.value = error;
        button.value = { text: t('messages.account.failed'), color: 'bg-red-500' };
      }
      if (success) {
        state.newPassword = '';
        state.confirmPassword = '';
      }
    }
  } catch (error) {
    console.error(error);
    // @ts-ignore
    const gqlError = error?.graphQLErrors?.[0]?.message ?? error?.message ?? error?.toString();
    errorMessage.value = gqlError || 'An error occurred. Please try again.';
    button.value = { text: t('messages.account.failed'), color: 'bg-red-500' };
  }

  loading.value = false;

  setTimeout(() => {
    button.value = { text: t('messages.account.updatePassword'), color: 'bg-primary hover:bg-primary-dark' };
  }, 2000);
}
</script>

<template>
  <UCard>
    <template #header>
      <h3 class="text-xl font-semibold">{{ $t('messages.account.changePassword') }}</h3>
    </template>
    <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
      <div class="grid gap-4 md:grid-cols-2">
        <UFormGroup :label="$t('messages.account.newPassword')" name="newPassword" required>
          <UInput v-model="state.newPassword" type="password" placeholder="••••••••" />
        </UFormGroup>

        <UFormGroup :label="$t('messages.account.confirmNewPassword')" name="confirmPassword" required>
          <UInput v-model="state.confirmPassword" type="password" placeholder="••••••••" />
        </UFormGroup>
      </div>
      <UButton color="primary" :loading="loading" :label="button.text" block type="submit" />
    </UForm>
  </UCard>
</template>
