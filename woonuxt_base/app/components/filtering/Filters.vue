<script setup lang="ts">
import { TaxonomyEnum } from '#woo';

const { isFiltersActive } = useFiltering();
const { removeBodyClass } = useHelpers();
const runtimeConfig = useRuntimeConfig();
const { storeSettings } = useAppConfig();

// hide-categories prop is used to hide the category filter on the product category page
const { hideCategories } = defineProps({ hideCategories: { type: Boolean, default: false } });

const globalProductAttributes = (runtimeConfig?.public?.GLOBAL_PRODUCT_ATTRIBUTES as WooNuxtFilter[]) || [];
const taxonomies = globalProductAttributes.map((attr) => attr?.slug?.toUpperCase().replace('_', '')) as TaxonomyEnum[];
const { data } = await useAsyncGql('getAllTerms', { taxonomies: [...taxonomies, TaxonomyEnum.PRODUCTCATEGORY] });
const terms = data.value?.terms?.nodes || [];

// Filter out the product category terms and the global product attributes with their terms
const productCategoryTerms = terms.filter((term) => term.taxonomyName === 'product_cat');

// Filter out the color attribute and the rest of the global product attributes
const attributesWithTerms = globalProductAttributes.map((attr) => ({ ...attr, terms: terms.filter((term) => term.taxonomyName === attr.slug) }));
</script>

<template>
  <aside id="filters">
    <OrderByDropdown class="block w-full md:hidden" />
    <div class="relative z-30 grid mb-12 space-y-8 divide-y">
      <PriceFilter />
      <CategoryFilter v-if="!hideCategories" :terms="productCategoryTerms" />
      <div v-for="attribute in attributesWithTerms" :key="attribute.slug">
        <ColorFilter v-if="attribute.slug == 'pa_color' || attribute.slug == 'pa_colour'" :attribute />
        <GlobalFilter v-else :attribute />
      </div>
      <OnSaleFilter />
      <LazyStarRatingFilter v-if="storeSettings.showReviews" />
      <LazyResetFiltersButton v-if="isFiltersActive" />
    </div>
  </aside>
  <div class="fixed inset-0 z-50 hidden bg-black opacity-25 filter-overlay" @click="removeBodyClass('show-filters')"></div>
</template>

<style scoped>
.show-filters .filter-overlay {
  display: block;
}
.show-filters {
  overflow: hidden;
}

#filters {
  width: 280px;
}

#filters .slider-connect {
  background-color: var(--tw-bg-primary);
}

#filters::-webkit-scrollbar {
  display: none;
}

input[type='checkbox'],
input[type='radio'] {
  background-color: white;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  cursor: pointer;
  font-family: sans-serif;
  outline: none;
  width: 100%;
  padding: 0.75rem;
  transition: all 0.15s;
  appearance: none;
  width: 1em;
  height: 1em;
  position: relative;
  padding: 0;
}

input[type='radio']:hover {
  border-color: #3b82f6;
}

input[type='radio'] {
  border-radius: 50%;
}

input[type='checkbox']:after,
input[type='radio']:after {
  content: '';
  display: block;
  opacity: 0;
  transition: all 250ms cubic-bezier(0.65, -0.43, 0.4, 1.71);
}

input[type='checkbox']:after {
  width: 5px;
  height: 9px;
  border: 2px solid #fff;
  border-top: 0;
  border-left: 0;
  transform: rotate(0deg) translate(-1px, 1px) scale(0.75);
  position: absolute;
  top: 3px;
  left: 6.5px;
}

input[type='radio']:after {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  transform: scale(0);
  position: absolute;
  background: #fff;
  top: 4px;
  left: 4px;
}

input[type='checkbox']:checked:after,
input[type='checkbox'] + label,
input[type='radio'] + label {
  cursor: pointer;
  color: #4b5563;
  &:hover {
    color: var(--tw-text-primary);
  }
}

input[type='checkbox']:checked + label,
input[type='radio']:checked + label {
  color: #1f2937;
  &:hover {
    color: var(--tw-text-primary-dark);
  }
}

input[type='checkbox']:checked,
input[type='radio']:checked {
  background-color: var(--tw-bg-primary);
  border: 0;
}

input[type='checkbox']:checked:after {
  opacity: 1;
  transform: rotate(45deg) translate(-1px, 1px) scale(1);
}

input[type='radio']:checked:after {
  opacity: 1;
  transform: scale(1);
}

.price-input {
  border: 1px solid #d1d5db;
  border-radius: 0.75rem;
  outline: none;
  line-height: 1.25;
  width: 100%;
  padding: 0.5rem;
}

.price-input.active {
  border-color: #9ca3af;
  padding-left: 1.5rem;
}

@media (max-width: 768px) {
  #filters {
    background-color: white;
    height: 100%;
    padding: 2rem;
    transform: translateX(-110vw);
    transition: all 0.3s ease-in-out;
    bottom: 0;
    left: 1rem;
    overflow: auto;
    position: fixed;
    box-shadow:
      -100px 0 0 white,
      -200px 0 0 white,
      -300px 0 0 white;
    z-index: 60;
  }

  .show-filters #filters {
    transform: none;
  }
}
</style>
