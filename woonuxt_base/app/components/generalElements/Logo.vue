<script setup lang="ts">
const { siteName } = useAppConfig();
const {
  size = 'md',
  text = false,
  color = 'white',
} = defineProps<{
  size?: 'sm' | 'md' | 'lg' | 'xl';
  text?: boolean;
  color?: string;
}>();

const sizeClasses = {
  sm: 'w-16 h-16',
  md: 'w-24 h-24',
  lg: 'w-32 h-32',
  xl: 'w-40 h-40',
};

const textClasses = {
  sm: 'text-xl',
  md: 'text-2xl',
  lg: 'text-3xl',
  xl: 'text-3xl',
};

const logoId = useId();
</script>

<template>
  <NuxtLink :id="logoId" to="/" class="no-underline">
    <div v-if="!text" :class="sizeClasses[size]">
      <NuxtImg src="/images/scd_logo.jpg" alt="Stone Cold Down" />
    </div>
    <div v-if="text">
      <span class="font-heading no-underline" :class="[textClasses[size], `text-${color}`]"> Stone Cold Down </span>
    </div>
    <span class="sr-only">{{ siteName }}</span>
  </NuxtLink>
</template>
