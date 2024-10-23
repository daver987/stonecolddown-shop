<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import LoginForm from './LoginForm.vue';
import RegisterForm from './RegisterForm.vue';
import ForgotPasswordForm from './ForgotPasswordForm.vue';

const { t } = useI18n();
const route = useRoute();
const router = useRouter();

const formView = ref('login');

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

const navigate = async (view: string) => {
  formView.value = view;
  try {
    if (view === 'forgotPassword') {
      await router.push({ query: { action: 'forgotPassword' } });
    } else if (view === 'register') {
      await router.push({ query: { action: 'register' } });
    } else {
      await router.push({ query: {} });
    }
  } catch (e) {
    console.error(e);
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
</script>

<template>
  <div class="mx-auto my-16 min-h-[600px] max-w-lg lg:my-24">
    <div class="flex flex-col items-center space-y-2">
      <Logo size="xl" text color="primary" />
      <h1 class="text-xl font-semibold lg:text-3xl">{{ formTitle }}</h1>
    </div>

    <LoginForm v-if="formView === 'login'" @navigate="navigate" />
    <RegisterForm v-else-if="formView === 'register'" @navigate="navigate" />
    <ForgotPasswordForm v-else-if="formView === 'forgotPassword'" @navigate="navigate" />
  </div>
</template>
