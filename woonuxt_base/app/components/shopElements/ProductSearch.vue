<script setup lang="ts">
import { z } from 'zod';
import type { FormSubmitEvent } from '#ui/types';

const { getSearchQuery, setSearchQuery, clearSearchQuery } = useSearching();

const schema = z.object({
  searchQuery: z.string().optional(),
});

type Schema = z.output<typeof schema>;

const state = reactive({
  searchQuery: getSearchQuery(),
});

const reset = () => {
  clearSearchQuery();
  state.searchQuery = '';
};

watch(getSearchQuery, (value) => {
  if (!value) reset();
});

function onSubmit(event: FormSubmitEvent<Schema>) {
  setSearchQuery(event.data.searchQuery || '');
}
</script>

<template>
  <UForm :schema="schema" :state="state" @submit="onSubmit">
    <UFormGroup name="searchQuery" class="relative">
      <UButtonGroup>
        <UInput prefix-icon="ion:search-outline" v-model="state.searchQuery" :placeholder="$t('messages.shop.searchProducts')" class="pl-10" />
        <template #suffix v-if="state.searchQuery">
          <UButton color="gray" variant="ghost" icon="i-ion-close-outline" @click="reset" :aria-label="$t('messages.general.clear')" />
        </template>
      </UButtonGroup>
    </UFormGroup>
  </UForm>
</template>
