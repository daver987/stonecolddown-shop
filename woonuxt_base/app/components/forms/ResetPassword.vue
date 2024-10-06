<script setup lang="ts">
import { z } from 'zod';
import type { FormSubmitEvent } from '#ui/types';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const router = useRouter();
const route = useRoute();
const { viewer, resetPasswordWithKey, loginUser } = useAuth();

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

const isPending = ref(false);
const isInvalidLink = ref(false);

if (!route.query.key && !route.query.login) {
  router.push('/my-account?action=forgotPassword');
}

async function onSubmit(event: FormSubmitEvent<typeof schema>) {
  isPending.value = true;
  isInvalidLink.value = false;

  try {
    const userInfo = {
      key: route.query.key as string,
      login: route.query.login as string,
      password: state.newPassword,
    };

    if (!userInfo.key || !userInfo.login) {
      isInvalidLink.value = true;
      throw new Error(t('messages.error.invalidPasswordResetLink'));
    }

    const resetResult = await resetPasswordWithKey(userInfo);
    if (!resetResult.success) {
      isInvalidLink.value = true;
      throw new Error(resetResult.error);
    }

    if (viewer.value) {
      const loginResult = await loginUser({ username: userInfo.login, password: userInfo.password });
      if (!loginResult.success) {
        throw new Error(loginResult.error);
      }
    }

    router.push('/my-account');
  } catch (error: unknown) {
    console.error((error as Error).message || t('messages.error.general'));
  } finally {
    isPending.value = false;
  }
}

useHead({
  title: t('messages.account.resetPassword'),
});
</script>

<template>
  <div class="mx-auto my-16 min-h-[600px] max-w-lg lg:my-24">
    <div class="flex flex-col items-center">
      <Logo size="xl" text />
      <h1 class="text-xl font-semibold lg:text-3xl">{{ $t('messages.account.resetPassword') }}</h1>
    </div>

    <UForm :schema="schema" :state="state" class="mt-6 flex flex-col" @submit="onSubmit">
      <UFormGroup :label="$t('messages.account.newPassword')" name="newPassword" required>
        <UInput size="sm" v-model="state.newPassword" type="password" placeholder="New Password" />
      </UFormGroup>

      <UFormGroup :label="$t('messages.account.confirmNewPassword')" name="confirmPassword" required>
        <UInput size="sm" v-model="state.confirmPassword" type="password" placeholder="Confirm Password" />
      </UFormGroup>

      <Transition name="scale-y" mode="out-in">
        <div v-if="isInvalidLink" class="mb-4 text-sm">
          <span class="text-red-500">{{ $t('messages.error.invalidPasswordResetLink') }}</span>
          <NuxtLink class="cursor-pointer pl-1 underline" to="/my-account?action=forgotPassword">{{ $t('messages.account.requestNewLink') }}</NuxtLink>
        </div>
      </Transition>

      <UButton class="mt-4" :label="$t('messages.account.resetPassword')" :loading="isPending" color="primary" variant="solid" />
    </UForm>

    <div class="my-8 cursor-pointer text-center">
      <NuxtLink to="/my-account">{{ $t('messages.account.backToLogin') }}</NuxtLink>
    </div>
  </div>
</template>
