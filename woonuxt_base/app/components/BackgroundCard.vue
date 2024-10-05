<script setup lang="ts">
import { ref } from 'vue';

interface Props {
  type: 'background' | 'product';
  image: string;
  title: string;
  description: string;
  price?: string;
  sku?: string;
  to?: string;
  buttonLabel?: string;
}

const props = defineProps<Props>();
const showModal = ref(false);

const openModal = () => {
  if (props.type === 'product') {
    showModal.value = true;
  }
};
</script>

<template>
  <div class="relative overflow-hidden rounded-none shadow-md">
    <!-- Background Image Card -->
    <div class="bg-cover bg-center h-96" v-if="type === 'background'" :style="`background-image: url(${image})`">
      <div class="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center text-white p-4">
        <h3 class="text-4xl font-heading mb-2">{{ title }}</h3>
        <p class="text-sm mb-4 text-balance text-center">{{ description }}</p>
        <UButton v-if="to" :to="to" color="white" variant="outline" :label="buttonLabel" />
      </div>
    </div>

    <!-- Product Card -->
    <div class="group" v-else>
      <NuxtImg class="w-full h-64 object-cover" :src="image" :alt="title" />
      <div class="p-4">
        <h3 class="text-lg font-semibold">{{ title }}</h3>
        <p class="text-sm text-gray-600">{{ description }}</p>
        <p class="text-lg font-bold mt-2">{{ price }}</p>
      </div>
      <div class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <UButton color="white" @click="openModal">Quick View</UButton>
      </div>
    </div>

    <!-- Modal -->
    <UModal v-model="showModal">
      <UCard>
        <div class="flex p-4">
          <div class="w-1/2">
            <NuxtImg class="w-full h-auto" :src="image" :alt="title" />
          </div>
          <div class="w-1/2 p-6">
            <h2 class="text-2xl font-bold mb-2">{{ title }}</h2>
            <p class="text-gray-600 mb-4">{{ description }}</p>
            <p class="text-lg font-bold mb-4">{{ price }}</p>
            <p class="text-sm text-gray-500 mb-4">SKU: {{ sku }}</p>
            <UButton block color="primary" label="Add to Cart" />
            <NuxtLink class="block text-center mt-4 text-primary-600 hover:underline" :to="to">View Full Details </NuxtLink>
          </div>
        </div>
      </UCard>
    </UModal>
  </div>
</template>
