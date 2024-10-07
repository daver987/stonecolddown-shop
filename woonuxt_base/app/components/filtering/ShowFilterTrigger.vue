<script setup>
const { toggleBodyClass, removeBodyClass } = useHelpers();
const { isFiltersActive } = await useFiltering();
onBeforeUnmount(() => {
  removeBodyClass('show-filters');
});
</script>

<template>
  <div class="relative inline-flex -space-x-px shadow-sm rounded-m isolate">
    <UButton
      class="relative focus:z-20"
      aria-label="Show filters"
      @click.prevent="toggleBodyClass('show-filters')"
      label="Show filters"
      trailing-icon="ion:funnel-outline">
    </UButton>
    <span class="absolute z-20 w-2.5 h-2.5 rounded-full bg-primary -top-1 -right-1" v-if="isFiltersActive" />
  </div>
</template>
