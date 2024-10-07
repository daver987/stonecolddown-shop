<script setup lang="ts">
import Slider from '@vueform/slider';

const { getFilter, setFilter, isFiltersActive } = useFiltering();
const runtimeConfig = useRuntimeConfig();
const maxPrice = runtimeConfig?.public?.MAX_PRICE || 1000;
const currencySymbol = runtimeConfig?.public?.CURRENCY_SYMBOL || '$';

const activeFilters = ref(getFilter('price'));
const price = activeFilters.value.length ? ref(activeFilters.value) : ref([0, maxPrice]);

const resetSlider = () => {
  price.value = [0, maxPrice];
};

const applyPrice = () => {
  //@ts-ignore
  setFilter('price', price.value);
};

watch(isFiltersActive, () => {
  if (!isFiltersActive.value) resetSlider();
});

const items = [
  {
    label: 'messages.shop.price',
    icon: 'i-heroicons-currency-dollar',
    defaultOpen: true,
    slot: 'content',
  },
];
</script>

<template>
  <UAccordion :items="items">
    <template #default="{ item, open }">
      <UButton :icon="open ? 'i-heroicons-chevron-up' : 'i-heroicons-chevron-down'" color="gray" variant="ghost" :label="$t(item.label)" />
    </template>
    <template #content>
      <div class="mt-3 grid gap-4 grid-cols-2">
        <UFormGroup name="minPrice" :label="$t('messages.shop.productResultCount.from')">
          <UInput id="price-from" v-model="price[0]" type="number" placeholder="From" min="0" />
        </UFormGroup>
        <UFormGroup name="maxPrice" :label="$t('messages.shop.productResultCount.to')">
          <UInput id="price-to" v-model="price[1]" type="number" placeholder="Up to" min="1" />
        </UFormGroup>
        <div class="mx-1 mt-1 col-span-full">
          <Slider
            v-model="price"
            :tooltips="false"
            :min="0"
            :max="maxPrice"
            ariaLabelledby="price-from price-to"
            @update="applyPrice"
            :classes="{
              connect:
                'absolute z-1 top-0 right-0 transform-origin-0 transform-style-flat h-full w-full bg-primary cursor-pointer tap:duration-300 tap:transition-transform disabled:bg-gray-400 disabled:cursor-not-allowed',
              handle:
                'absolute rounded-full bg-white border-0 shadow-slider cursor-grab focus:outline-none h:w-4 h:h-4 h:-top-1.5 h:-right-2 txt-rtl-h:-left-2 txt-rtl-h:right-auto v:w-4 v:h-4 v:-top-2 v:-right-1.25 disabled:cursor-not-allowed focus:ring focus:ring-primary focus:ring-opacity-30',
            }" />
        </div>
      </div>
    </template>
  </UAccordion>
</template>

<style lang="scss">
@import '@vueform/slider/themes/tailwind.scss';
</style>
