<script setup lang="ts">
const { getFilter, setFilter, isFiltersActive } = useFiltering()
const selectedTerms = ref(getFilter('sale') || [])

watch(isFiltersActive, () => {
  // uncheck all checkboxes when filters are cleared
  if (!isFiltersActive.value) selectedTerms.value = []
})

const checkboxClicked = (value: boolean) => {
  if (value) {
    selectedTerms.value = ['true']
    setFilter('sale', ['true'])
  } else {
    selectedTerms.value = []
    setFilter('sale', [])
  }
}

const items = [
  {
    label: 'Sale Products Only',
    defaultOpen: true,
    slot: 'content',
  },
]
</script>

<template>
  <UAccordion :items="items">
    <template #default="{ item, open }">
      <UButton :icon="open ? 'i-heroicons-chevron-up' : 'i-heroicons-chevron-down'" color="gray" variant="ghost" :label="item.label" />
    </template>
    <template #content>
      <div class="mt-3 px-2">
        <UCheckbox :model-value="selectedTerms.length > 0" label="Only show products on sale" name="sale" @update:model-value="checkboxClicked" />
      </div>
    </template>
  </UAccordion>
</template>
