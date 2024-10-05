<script setup lang="ts">
import { z } from 'zod';

const { loginUser, registerUser } = useAuth();

const activeTab = ref('login');

const LoginSchema = z.object({
  email: z.string().email('Please enter a valid email.'),
  password: z.string().min(6, 'Password must be at least 6 characters.'),
});

const RegisterSchema = z
  .object({
    email: z.string().email('Please enter a valid email.'),
    password: z.string().min(6, 'Password must be at least 6 characters.'),
    confirmPassword: z.string().min(6, 'Password must be at least 6 characters.'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword'],
  });

const loginState = ref({ email: '', password: '' });
const registerState = ref({ email: '', password: '', confirmPassword: '' });

const loginError = ref('');
const registerError = ref('');
const isLoggingIn = ref(false);
const isRegistering = ref(false);

const handleLogin = async () => {
  try {
    LoginSchema.parse(loginState.value);
    isLoggingIn.value = true;
    loginError.value = '';
    await loginUser({
      ...loginState.value,
      username: loginState.value.email, // Assuming username is the same as email
    });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      loginError.value = error.errors[0]?.message || 'Validation failed.';
    } else if (error instanceof Error) {
      loginError.value = error.message || 'An error occurred during login.';
    } else {
      loginError.value = 'An unexpected error occurred during login.';
    }
  } finally {
    isLoggingIn.value = false;
  }
};

const handleRegister = async () => {
  try {
    RegisterSchema.parse(registerState.value);
    isRegistering.value = true;
    registerError.value = '';
    await registerUser({
      email: registerState.value.email,
      password: registerState.value.password,
    });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      registerError.value = error.errors[0]?.message || 'Validation failed.';
    } else if (error instanceof Error) {
      registerError.value = error.message || 'An error occurred during registration.';
    } else {
      registerError.value = 'An unexpected error occurred during registration.';
    }
  } finally {
    isRegistering.value = false;
  }
};
</script>

<template>
  <UCard class="mx-auto max-w-md p-6">
    <UTabGroup v-model:active="activeTab" class="w-full">
      <UTabList>
        <UTab name="login">{{ $t('messages.account.login') }}</UTab>
        <UTab name="register">{{ $t('messages.account.register') }}</UTab>
      </UTabList>
      <UTabPanels>
        <UTabPanel name="login">
          <UForm :state="loginState" :schema="LoginSchema" @submit.prevent="handleLogin" class="mt-4 space-y-4">
            <UFormGroup name="email" label="Email" required>
              <UInput v-model="loginState.email" placeholder="Enter your email" type="email" />
            </UFormGroup>
            <UFormGroup name="password" label="Password" required>
              <UInput v-model="loginState.password" placeholder="Enter your password" type="password" />
            </UFormGroup>
            <UAlert v-if="loginError" type="error" class="mb-4">
              {{ loginError }}
            </UAlert>
            <UButton type="submit" color="primary" :loading="isLoggingIn" block>
              {{ $t('messages.account.login') }}
            </UButton>
          </UForm>
        </UTabPanel>
        <UTabPanel name="register">
          <UForm :state="registerState" :schema="RegisterSchema" @submit.prevent="handleRegister" class="mt-4 space-y-4">
            <UFormGroup name="email" label="Email" required>
              <UInput v-model="registerState.email" placeholder="Enter your email" type="email" />
            </UFormGroup>
            <UFormGroup name="password" label="Password" required>
              <UInput v-model="registerState.password" placeholder="Enter your password" type="password" />
            </UFormGroup>
            <UFormGroup name="confirmPassword" label="Confirm Password" required>
              <UInput v-model="registerState.confirmPassword" placeholder="Confirm your password" type="password" />
            </UFormGroup>
            <UAlert v-if="registerError" type="error" class="mb-4">
              {{ registerError }}
            </UAlert>
            <UButton type="submit" color="primary" :loading="isRegistering" block>
              {{ $t('messages.account.register') }}
            </UButton>
          </UForm>
        </UTabPanel>
      </UTabPanels>
    </UTabGroup>
  </UCard>
</template>
