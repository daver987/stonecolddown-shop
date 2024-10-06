<script setup lang="ts">
import { z } from 'zod';
import { useI18n } from 'vue-i18n';
import type { FormSubmitEvent } from '#ui/types';
import type { RegisterCustomerInput } from '#gql';

const { t } = useI18n();
const { registerUser, loginUser } = useAuth();
const loading = ref(false);
const message = ref('');
const errorMessage = ref('');

const schema = z.object({
  email: z.string().email(t('messages.error.invalidEmail')),
  username: z.string().min(1, t('messages.error.fieldRequired')),
  password: z.string().min(8, t('messages.error.passwordMinLength')),
});

type Schema = z.output<typeof schema>;

const state = reactive<Schema>({
  email: '',
  username: '',
  password: '',
});

const handleFormSubmit = async (event: FormSubmitEvent<Schema>) => {
  loading.value = true;
  const userInfo = event.data;
  try {
    const { success, error } = await registerUser(userInfo as RegisterCustomerInput);
    if (success) {
      errorMessage.value = '';
      message.value = `${t('messages.account.accountCreated')} ${t('messages.account.loggingIn')}`;
      setTimeout(async () => {
        await loginUser({
          username: userInfo.username,
          password: userInfo.password,
        });
      }, 1500);
    } else {
      errorMessage.value = error;
    }
  } catch (e) {
    console.error(e);
    errorMessage.value = t('messages.error.unknownError');
  } finally {
    loading.value = false;
  }
};

const emit = defineEmits(['navigate']);

const navigateToLogin = () => emit('navigate', 'login');

const submitForm = () => {
  if (!loading.value) {
    handleFormSubmit({ preventDefault: () => {}, data: state } as FormSubmitEvent<Schema>);
  }
};
</script>

<template>
  <div>
    <div class="my-2 text-center">
      {{ $t('messages.account.hasAccount') }}
      <NuxtLink class="cursor-pointer font-semibold text-primary" @click.prevent="navigateToLogin">
        {{ $t('messages.general.please') }} {{ $t('messages.account.accountLogin') }}
      </NuxtLink>
      .
    </div>

    <UForm :schema="schema" :state="state" class="mt-6" @submit="handleFormSubmit">
      <UFormGroup :label="t('messages.billing.email')" name="email" required>
        <UInput v-model="state.email" type="email" placeholder="johndoe@email.com" autocomplete="email" @keyup.enter="submitForm" />
      </UFormGroup>
      <UFormGroup :label="t('messages.account.username')" name="username" required>
        <UInput v-model="state.username" type="text" placeholder="johndoe" autocomplete="username" @keyup.enter="submitForm" />
      </UFormGroup>
      <UFormGroup :label="t('messages.account.password')" name="password" required>
        <UInput v-model="state.password" type="password" placeholder="********" autocomplete="new-password" @keyup.enter="submitForm" />
      </UFormGroup>
      <Transition name="scale-y" mode="out-in">
        <div v-if="message" class="my-4 text-sm text-green-500" v-html="message"></div>
      </Transition>
      <Transition name="scale-y" mode="out-in">
        <div v-if="errorMessage" class="my-4 text-sm text-red-500" v-html="errorMessage"></div>
      </Transition>
      <UButton block class="mt-4" type="submit" :label="t('messages.account.register')" :loading="loading" color="primary" variant="solid" />
    </UForm>
  </div>
</template>
