<script setup lang="ts">
import { z } from 'zod';
import type { FormSubmitEvent } from '#ui/types';

const ContactSchema = z.object({
  full_name: z.string().min(1, 'Full name is required'),
  email_address: z.string().email('Invalid email address'),
  phone_number: z
    .string()
    .regex(/^\\+?[1-9]\\d{1,14}$/, 'Invalid phone number')
    .min(1, 'Phone number is required'),
  message: z.string().max(500, 'Message must be less than 500 characters').min(10, 'Message must be at least 10 characters'),
  reference_images: z.array(z.instanceof(File)).optional(),
});

type ContactForm = z.infer<typeof ContactSchema>;

const contactState = reactive<ContactForm>({
  full_name: '',
  email_address: '',
  phone_number: '',
  message: '',
  reference_images: [],
});

const loading = ref(false);
const isDisabled = ref(false);
const toast = useToast();

const onSubmit = (data: FormSubmitEvent<ContactForm>) => {
  loading.value = true;
  isDisabled.value = true;
  setTimeout(() => {
    loading.value = false;
    isDisabled.value = false;
    contactState.full_name = '';
    contactState.email_address = '';
    contactState.phone_number = '';
    contactState.message = '';
    contactState.reference_images = [];
    toast.add({ title: 'Thank you for your inquiry!' });
  }, 1000);
};

const fileNames = computed(() => contactState.reference_images?.map((file) => file.name).join(', ') || '');

const handleFileInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  contactState.reference_images = target.files ? Array.from(target.files) : [];
};
</script>

<template>
  <UForm :schema="ContactSchema" @submit="onSubmit" :state="contactState">
    <div class="grid w-full max-w-2xl grid-cols-2 gap-x-4 space-y-2">
      <div class="col-span-2">
        <UFormGroup name="full_name" label="Full Name" help="Please enter your full name">
          <UInput v-model="contactState.full_name" type="text" placeholder="Full Name" :disabled="isDisabled" />
        </UFormGroup>
      </div>
      <div class="col-span-2 md:col-span-1">
        <UFormGroup name="email_address" label="Email Address" help="Please enter a valid email address">
          <UInput v-model="contactState.email_address" type="email" placeholder="Email Address" />
        </UFormGroup>
      </div>
      <div class="col-span-2 md:col-span-1">
        <UFormGroup name="phone_number" label="Phone Number" help="Please enter your phone number">
          <UInput v-model="contactState.phone_number" type="tel" placeholder="Phone Number" />
        </UFormGroup>
      </div>
      <div class="col-span-2">
        <UFormGroup name="reference_images" label="Reference Images" help="Upload images that inspire your tattoo design. You can upload multiple files.">
          <UInput multiple :model-value="fileNames" @input="handleFileInput" type="file" accept=".jpg,.jpeg,.png,.gif" icon="i-heroicons-folder" />
        </UFormGroup>
      </div>
      <div class="col-span-2">
        <UFormGroup name="message" label="Your Message" help="Please provide any details or questions you have.">
          <UTextarea v-model="contactState.message" :rows="5" placeholder="Your Message" />
        </UFormGroup>
      </div>
      <div class="col-span-2 mt-2">
        <UButton :loading="loading" type="submit" label="Send Inquiry" />
      </div>
    </div>
  </UForm>
</template>
