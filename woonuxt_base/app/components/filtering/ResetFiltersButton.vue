<script setup>
const { resetFilter } = useFiltering();
</script>

<template>
  <UButton color="primary" class="mt-8" block @click="resetFilter">
    {{ $t('messages.general.clearFilters') }}
  </UButton>
</template>
