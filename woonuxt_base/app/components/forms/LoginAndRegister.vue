<script setup lang="ts">
import { z } from 'zod';
import type { RegisterCustomerInput } from '#gql';
import { useI18n } from 'vue-i18n';
import type { FormSubmitEvent } from '#ui/types';

const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const { loginUser, isPending, registerUser, sendResetPasswordEmail } = useAuth();
const loading = ref<boolean>(false);

const schema = z.object({
  emailOrUsername: z.string().min(1, t('messages.error.fieldRequired')),
  password: z.string().min(8, t('messages.error.passwordMinLength')),
  email: z.string().email(t('messages.error.invalidEmail')).optional(),
  username: z.string().optional(),
});

type Schema = z.output<typeof schema>;

const state = reactive<Schema>({
  emailOrUsername: '',
  password: '',
  email: '',
  username: '',
});

const formView = ref('login');
const message = ref('');
const errorMessage = ref('');

const updateFormView = () => {
  if (route.query.action === 'forgotPassword') {
    formView.value = 'forgotPassword';
  } else if (route.query.action === 'register') {
    formView.value = 'register';
  } else {
    formView.value = 'login';
  }
};
watch(route, updateFormView, { immediate: true });

const login = async (userInfo: { username: string; password: string }) => {
  loading.value = true;
  const { success, error } = await loginUser({
    username: userInfo.username,
    password: userInfo.password,
  });
  if (error) {
    errorMessage.value = t(`messages.error.${error}`) || error;
  }
  if (success) {
    errorMessage.value = '';
    message.value = t('messages.account.loggingIn');
  }
  loading.value = false;
};

const handleFormSubmit = async (event: FormSubmitEvent<Schema>) => {
  loading.value = true;
  const userInfo = event.data;
  if (formView.value === 'register') {
    const { success, error } = await registerUser(userInfo as RegisterCustomerInput);
    if (success) {
      errorMessage.value = '';
      message.value = `${t('messages.account.accountCreated')} ${t('messages.account.loggingIn')}`;
      setTimeout(async () => {
        await login(userInfo as { username: string; password: string });
      }, 1500);
    } else {
      errorMessage.value = error;
    }
  } else if (formView.value === 'forgotPassword') {
    await resetPassword({ email: userInfo.email as string });
  } else {
    await login({
      username: userInfo.emailOrUsername,
      password: userInfo.password,
    });
  }
  loading.value = false;
};

const resetPassword = async (userInfo: { email: string }) => {
  loading.value = true;
  const { success, error } = await sendResetPasswordEmail(userInfo.email);
  if (success) {
    errorMessage.value = '';
    message.value = t('messages.account.ifRegistered');
    loading.value = false;
    return;
  }
  errorMessage.value = error;
  loading.value = false;
};

const navigate = async (view: string) => {
  formView.value = view;
  if (view === 'forgotPassword') {
    await navigateTo({ query: { action: 'forgotPassword' } });
  } else if (view === 'register') {
    await navigateTo({ query: { action: 'register' } });
  } else {
    await navigateTo({ query: {} });
  }
};

const formTitle = computed(() => {
  if (formView.value === 'login') {
    return t('messages.account.loginToAccount');
  }
  if (formView.value === 'register') {
    return t('messages.account.accountRegister');
  }
  if (formView.value === 'forgotPassword') {
    return t('messages.account.forgotPassword');
  }
  return '';
});

const buttonText = computed(() => {
  if (formView.value === 'login') {
    return t('messages.account.login');
  }
  if (formView.value === 'register') {
    return t('messages.account.register');
  }
  if (formView.value === 'forgotPassword') {
    return t('messages.account.sendPasswordResetEmail');
  }
  return '';
});

const emailLabel = computed(() => (formView.value === 'register' ? t('messages.billing.email') : t('messages.account.emailOrUsername')));
const usernameLabel = computed(() => (formView.value === 'login' ? t('messages.account.emailOrUsername') : t('messages.account.username')));
const passwordLabel = computed(() => t('messages.account.password'));

const inputPlaceholder = computed(() => ({
  emailOrUsername: 'johndoe@email.com or johndoe',
  email: 'johndoe@email.com',
  username: 'johndoe',
  password: '********',
}));
</script>

<template>
  <div class="mx-auto my-16 min-h-[600px] max-w-lg lg:my-24">
    <div class="flex flex-col items-center space-y-2">
      <Logo size="xl" text color="primary" />
      <h1 class="text-xl font-semibold lg:text-3xl">{{ formTitle }}</h1>
      <div v-if="formView === 'login'" class="my-2 text-center">
        {{ $t('messages.account.noAccount') }}
        <NuxtLink class="cursor-pointer font-semibold text-primary" @click="navigate('register')"> {{ $t('messages.account.accountRegister') }} </NuxtLink>.
      </div>
      <div v-if="formView === 'register'" class="my-2 text-center">
        {{ $t('messages.account.hasAccount') }}
        <NuxtLink class="cursor-pointer font-semibold text-primary" @click="navigate('login')">
          {{ $t('messages.general.please') }} {{ $t('messages.account.accountLogin') }}
        </NuxtLink>
        .
      </div>
    </div>

    <UForm :schema="schema" :state="state" class="mt-6" @submit="handleFormSubmit">
      <UFormGroup v-if="formView === 'login'" :label="t('messages.account.emailOrUsername')" name="emailOrUsername" required>
        <UInput v-model="state.emailOrUsername" type="text" :placeholder="inputPlaceholder.emailOrUsername" autocomplete="username" />
      </UFormGroup>
      <UFormGroup v-if="formView === 'register' || formView === 'forgotPassword'" :label="t('messages.billing.email')" name="email" required>
        <UInput v-model="state.email" type="email" :placeholder="inputPlaceholder.email" autocomplete="email" />
      </UFormGroup>
      <UFormGroup v-if="formView === 'register'" :label="t('messages.account.username')" name="username" required>
        <UInput v-model="state.username" type="text" :placeholder="inputPlaceholder.username" autocomplete="username" />
      </UFormGroup>
      <UFormGroup v-if="formView !== 'forgotPassword'" :label="t('messages.account.password')" name="password" required>
        <UInput
          v-model="state.password"
          type="password"
          :placeholder="inputPlaceholder.password"
          :autocomplete="formView === 'login' ? 'current-password' : 'new-password'" />
      </UFormGroup>
      <Transition name="scale-y" mode="out-in">
        <div v-if="message" class="my-4 text-sm text-green-500" v-html="message"></div>
      </Transition>
      <Transition name="scale-y" mode="out-in">
        <div v-if="errorMessage" class="my-4 text-sm text-red-500" v-html="errorMessage"></div>
      </Transition>
      <UButton block class="mt-4" type="submit" :label="buttonText" :loading="loading" color="primary" variant="solid" />
    </UForm>
    <div class="my-8 cursor-pointer text-center" @click="navigate('forgotPassword')" v-if="formView === 'login'">
      {{ $t('messages.account.forgotPassword') }}
    </div>
    <div class="my-8 cursor-pointer text-center" @click="navigate('login')" v-if="formView === 'forgotPassword'">{{ $t('messages.account.backToLogin') }}</div>
  </div>
</template>
