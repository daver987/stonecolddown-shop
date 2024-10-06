<script setup lang="ts">
import { z } from 'zod';
import { useI18n } from 'vue-i18n';
import type { FormSubmitEvent } from '#ui/types';

const { t } = useI18n();
const { loginUser } = useAuth();
const loading = ref(false);
const message = ref('');
const errorMessage = ref('');

const schema = z.object({
  emailOrUsername: z.string().min(1, t('messages.error.fieldRequired')),
  password: z.string().min(8, t('messages.error.passwordMinLength')),
});

type Schema = z.output<typeof schema>;

const state = reactive<Schema>({
  emailOrUsername: '',
  password: '',
});

const handleFormSubmit = async (event: FormSubmitEvent<Schema>) => {
  loading.value = true;
  const userInfo = event.data;
  try {
    const { success, error } = await loginUser({
      username: userInfo.emailOrUsername,
      password: userInfo.password,
    });
    if (error) {
      errorMessage.value = t(`messages.error.${error}`) || error;
    }
    if (success) {
      errorMessage.value = '';
      message.value = t('messages.account.loggingIn');
    }
  } catch (e) {
    console.error(e);
    errorMessage.value = t('messages.error.unknownError');
  } finally {
    loading.value = false;
  }
};

const emit = defineEmits(['navigate']);

const navigateToRegister = () => emit('navigate', 'register');
const navigateToForgotPassword = () => emit('navigate', 'forgotPassword');

const submitForm = () => {
  if (!loading.value) {
    handleFormSubmit({ preventDefault: () => {}, data: state } as FormSubmitEvent<Schema>);
  }
};
</script>

<template>
  <div>
    <div class="my-2 text-center">
      {{ $t('messages.account.noAccount') }}
      <NuxtLink class="cursor-pointer font-semibold text-primary" @click.prevent="navigateToRegister">
        {{ $t('messages.account.accountRegister') }}
      </NuxtLink>
      .
    </div>

    <UForm :schema="schema" :state="state" class="mt-6" @submit="handleFormSubmit">
      <UFormGroup :label="t('messages.account.emailOrUsername')" name="emailOrUsername" required>
        <UInput v-model="state.emailOrUsername" type="text" placeholder="johndoe@email.com or johndoe" autocomplete="username" @keyup.enter="submitForm" />
      </UFormGroup>
      <UFormGroup :label="t('messages.account.password')" name="password" required>
        <UInput v-model="state.password" type="password" placeholder="********" autocomplete="current-password" @keyup.enter="submitForm" />
      </UFormGroup>
      <Transition name="scale-y" mode="out-in">
        <div v-if="message" class="my-4 text-sm text-green-500" v-html="message"></div>
      </Transition>
      <Transition name="scale-y" mode="out-in">
        <div v-if="errorMessage" class="my-4 text-sm text-red-500" v-html="errorMessage"></div>
      </Transition>
      <UButton block class="mt-4" type="submit" :label="t('messages.account.login')" :loading="loading" color="primary" variant="solid" />
    </UForm>
    <div class="my-8 cursor-pointer text-center" @click.prevent="navigateToForgotPassword">
      {{ $t('messages.account.forgotPassword') }}
    </div>
  </div>
</template>
