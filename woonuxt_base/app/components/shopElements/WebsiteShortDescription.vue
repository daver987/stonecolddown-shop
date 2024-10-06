<script setup lang="ts">
const { description } = useAppConfig();
</script>

<template>
  <p class="mt-4 text-sm text-balance xl:max-w-md">{{ description }}</p>
</template>
