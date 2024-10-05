<script setup lang="ts">
import { z } from 'zod';
import type { FormSubmitEvent } from '#ui/types';

const ContactSchema = z.object({
  full_name: z.string().nonempty('Full Name is required'),
  email_address: z.string().email('Invalid email address'),
  phone_number: z
    .string()
    .regex(/^\\+?[1-9]\\d{1,14}$/, 'Invalid phone number')
    .nonempty('Phone Number is required'),
  message: z.string().max(500, 'Message must be less than 500 characters').nonempty('Message is required'),
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
  console.log('Form submitted', data);
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

const handleFileInput = (files: FileList | null) => {
  contactState.reference_images = files ? Array.from(files) : undefined;
};
</script>

<template>
  <UForm :schema="ContactSchema" @submit="onSubmit" :state="contactState">
    <div class="grid grid-cols-2 w-full max-w-xl gap-x-4">
      <UFormGroup name="full_name" label="Full Name" help="Please enter your full name" class="col-span-2 space-y-4">
        <UInput v-model="contactState.full_name" type="text" placeholder="Full Name" :disabled="isDisabled" />
      </UFormGroup>

      <UFormGroup name="email_address" label="Email Address" help="Please enter a valid email address" class="col-span-1">
        <UInput v-model="contactState.email_address" type="email" placeholder="Email Address" :disabled="isDisabled" />
      </UFormGroup>

      <UFormGroup name="phone_number" label="Phone Number" help="Please enter your phone number" class="col-span-1">
        <UInput v-model="contactState.phone_number" type="tel" placeholder="Phone Number" :disabled="isDisabled" />
      </UFormGroup>

      <UFormGroup name="message" label="Your Message" help="Please provide any details or questions you have." class="col-span-2">
        <UTextarea v-model="contactState.message" :rows="5" placeholder="Your Message" :disabled="isDisabled" />
      </UFormGroup>

      <UFormGroup
        name="reference_images"
        label="Reference Images"
        help="Upload images that inspire your tattoo design. You can upload multiple files."
        class="col-span-2">
        <UInput
          :model-value="contactState.reference_images?.map((file) => file.name).join(', ')"
          @update:model-value="handleFileInput"
          type="file"
          accept=".jpg,.jpeg,.png,.gif"
          multiple
          :disabled="isDisabled" />
      </UFormGroup>

      <div class="col-span-2">
        <UButton :loading="loading" type="submit" label="Send Inquiry" :disabled="isDisabled" />
      </div>
    </div>
  </UForm>
</template>
