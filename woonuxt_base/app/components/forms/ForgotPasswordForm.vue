<script setup lang="ts">
import { z } from 'zod';
import { useI18n } from 'vue-i18n';
import type { FormSubmitEvent } from '#ui/types';

const { t } = useI18n();
const { sendResetPasswordEmail } = useAuth();
const loading = ref(false);
const message = ref('');
const errorMessage = ref('');

const schema = z.object({
  email: z.string().email(t('messages.error.invalidEmail')),
});

type Schema = z.output<typeof schema>;

const state = reactive<Schema>({
  email: '',
});

const handleFormSubmit = async (event: FormSubmitEvent<Schema>) => {
  loading.value = true;
  const userInfo = event.data;
  try {
    const { success, error } = await sendResetPasswordEmail(userInfo.email);
    if (success) {
      errorMessage.value = '';
      message.value = t('messages.account.ifRegistered');
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
    <UForm :schema="schema" :state="state" class="mt-6" @submit="handleFormSubmit">
      <UFormGroup :label="t('messages.billing.email')" name="email" required>
        <UInput v-model="state.email" type="email" placeholder="johndoe@email.com" autocomplete="email" @keyup.enter="submitForm" />
      </UFormGroup>
      <Transition name="scale-y" mode="out-in">
        <div v-if="message" class="my-4 text-sm text-green-500" v-html="message"></div>
      </Transition>
      <Transition name="scale-y" mode="out-in">
        <div v-if="errorMessage" class="my-4 text-sm text-red-500" v-html="errorMessage"></div>
      </Transition>
      <UButton block class="mt-4" type="submit" :label="t('messages.account.sendPasswordResetEmail')" :loading="loading" color="primary" variant="solid" />
    </UForm>
    <div class="my-8 cursor-pointer text-center" @click.prevent="navigateToLogin">
      {{ $t('messages.account.backToLogin') }}
    </div>
  </div>
</template>
