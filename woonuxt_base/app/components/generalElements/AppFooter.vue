<script setup lang="ts">
import { z } from 'zod';
import type { FormSubmitEvent } from '#ui/types';

const SubscribeSchema = z.object({
  email: z.string().email(),
});

type Subscribe = z.infer<typeof SubscribeSchema>;

const subscribeState = reactive({
  email: undefined,
});
const loading = ref(false);
const isDisabled = ref(false);

const toast = useToast();
const subscribeToNewsletter = (data: FormSubmitEvent<Subscribe>) => {
  loading.value = true;
  isDisabled.value = true;
  console.log('Subscribe to newsletter', data);
  setTimeout(() => {
    loading.value = false;
    subscribeState.email = undefined;
    toast.add({ title: 'Thank you for subscribing!' });
    isDisabled.value = false;
  }, 2000);
};

const footerLinks = [
  {
    label: 'Tattoos',
    children: [
      {
        label: 'Custom Tattoos',
        to: '/tattoos',
      },
      {
        label: 'Flash Designs',
        to: '/product-category/flash-designs',
      },
    ],
  },
  {
    label: 'Shop',
    children: [
      {
        label: 'Prints',
        to: '/product-category/prints',
      },
      {
        label: 'Merch',
        to: '/product-category/merch',
      },
      {
        label: 'All Products',
        to: '/products',
      },
    ],
  },
  {
    label: 'Information',
    children: [
      {
        label: 'Portfolio',
        to: '/portfolio',
      },
      {
        label: 'About',
        to: '/about',
      },
      {
        label: 'Contact',
        to: '/contact',
      },
      {
        label: 'My Account',
        to: '/my-account',
      },
    ],
  },
];
</script>

<template>
  <Footer class="bg-black">
    <template #top>
      <FooterColumns :links="footerLinks">
        <template #right>
          <div class="space-y-2">
            <Logo size="md" text />
            <UForm :schema="SubscribeSchema" @submit="subscribeToNewsletter" :state="subscribeState">
              <UFormGroup name="email" label="Subscribe to my newsletter" size="lg">
                <UInput v-model="subscribeState.email" type="email" :ui="{ icon: { trailing: { pointer: '' } } }" :disabled="isDisabled">
                  <template #trailing>
                    <UButton
                      :loading="loading"
                      type="submit"
                      size="2xs"
                      label="Subscribe"
                      :ui="{
                        rounded: 'rounded-md',
                        base: 'text-amber-500 hover:text-amber-600',
                      }" />
                  </template>
                </UInput>
              </UFormGroup>
            </UForm>
          </div>
        </template>
      </FooterColumns>
    </template>
    <template #center>
      <p class="text-xs text-gray-500 font-light">© {{ new Date().getFullYear() }} Stone Cold Down by Natasha Smith. All Rights Reserved.</p>
    </template>
  </Footer>
</template>
