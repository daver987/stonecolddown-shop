<script setup lang="ts">
import type { VariationAttributeFragment } from '#gql';
import type { VariationAttribute } from '../../types';

interface Props {
  attributes: any[];
  defaultAttributes?: { nodes: VariationAttribute[] };
}

const { attributes, defaultAttributes } = defineProps<Props>();
const emit = defineEmits(['attrs-changed']);

const activeVariations = ref<VariationAttribute[]>([]);

const getSelectedName = (attr: any, activeVariation: VariationAttribute) => {
  if (attr?.terms?.nodes) {
    return attr.terms.nodes.find((node: { slug: string }) => node.slug === activeVariation.value)?.name;
  }

  return activeVariation.value || '';
};

const updateAttrs = () => {
  const selectedVariations = attributes.map((row): VariationAttribute => {
    const radioValue = document.querySelector(`.name-${row.name.toLowerCase()}:checked`) as HTMLInputElement;
    const dropdownValue = document.querySelector(`#${row.name}`) as HTMLSelectElement;
    const name = row.name.charAt(0).toLowerCase() + row.name.slice(1);
    const value = radioValue?.value ?? dropdownValue?.value ?? '';
    return { name, value };
  });

  activeVariations.value = selectedVariations;
  emit('attrs-changed', selectedVariations);
};

const setDefaultAttributes = () => {
  if (defaultAttributes?.nodes) {
    defaultAttributes?.nodes.forEach((attr: VariationAttribute) => {
      const radio = document.querySelector(`.name-${attr.name?.toLowerCase()}[value="${attr.value}"]`) as HTMLInputElement;
      if (radio) radio.checked = true;
      const dropdown = document.querySelector(`#${attr.name}`) as HTMLSelectElement;
      if (dropdown) dropdown.value = attr.value || '';
    });
  }
};

const className = (name: string) => `name-${name.toLowerCase()}`;

onBeforeMount(() => {
  setDefaultAttributes();
  updateAttrs();
});
</script>

<template>
  <div class="flex flex-col gap-1 justify-between" v-if="attributes">
    <div v-for="(attr, i) in attributes" :key="i" class="flex flex-wrap py-2 relative justify-between">
      <!-- LOCAL -->
      <div v-if="attr.scope == 'LOCAL'" class="grid gap-2">
        <div class="text-sm">
          {{ attr.label }}
          <span v-if="activeVariations.length && activeVariations[i]" class="text-gray-400">: {{ getSelectedName(attr, activeVariations[i] ?? {}) }}</span>
        </div>
        <div class="flex gap-2">
          <span v-for="(option, index) in attr.options" :key="index">
            <label :for="`${option}_${index}`">
              <input
                :id="`${option}_${index}`"
                :ref="attr.name"
                class="hidden"
                :checked="index == 0"
                type="radio"
                :class="`name-${attr.name.toLowerCase()}`"
                :name="attr.name"
                :value="option"
                @change="updateAttrs" />
              <span class="radio-button" :class="`picker-${option}`" :title="`${attr.name}: ${option}`">{{ option }}</span>
            </label>
          </span>
        </div>
      </div>

      <!-- COLOR SWATCHES -->
      <div v-else-if="attr.name == 'pa_color' || attr.name == 'color'" class="grid gap-2">
        <div class="text-sm">
          {{ $t('messages.general.color') }}
          <span v-if="activeVariations.length && activeVariations[i]" class="text-gray-400">{{ getSelectedName(attr, activeVariations[i]) }}</span>
        </div>
        <div class="flex gap-2">
          <span v-for="(term, termIndex) in attr.terms.nodes" :key="termIndex">
            <Tooltip :text="term.name">
              <label :for="`${term.slug}_${termIndex}`">
                <input
                  :id="`${term.slug}_${termIndex}`"
                  :ref="attr.name"
                  class="hidden"
                  :checked="termIndex == 0"
                  type="radio"
                  :class="className(attr.name)"
                  :name="attr.name"
                  :value="term.slug"
                  @change="updateAttrs" />
                <span class="color-button" :class="`color-${term.slug}`" :title="`${attr.name}: ${term}`"></span>
              </label>
            </Tooltip>
          </span>
        </div>
      </div>

      <!-- DROPDOWN -->
      <div v-else-if="attr.terms.nodes && attr.terms.nodes?.length > 8" class="grid gap-2">
        <div class="text-sm">
          {{ attr.label }}
          <span v-if="activeVariations.length" class="text-gray-400">{{ getSelectedName(attr, activeVariations[i] as VariationAttributeFragment) }}</span>
        </div>
        <select :id="attr.name" :ref="attr.name" :name="attr.name" required class="border-white shadow" @change="updateAttrs">
          <option disabled hidden>{{ $t('messages.general.choose') }} {{ decodeURIComponent(attr.label) }}</option>
          <option v-for="(term, dropdownIndex) in attr.terms.nodes" :key="dropdownIndex" :value="term.slug" v-html="term.name" :selected="dropdownIndex == 0" />
        </select>
      </div>

      <!-- CHECKBOXES -->
      <div v-else class="grid gap-2">
        <div class="text-sm">
          {{ attr.label }}
          <span v-if="activeVariations.length" class="text-gray-400">: {{ getSelectedName(attr, activeVariations[i] as VariationAttributeFragment) }}</span>
        </div>
        <div class="flex gap-2">
          <span v-for="(term, index) in attr.terms.nodes" :key="index">
            <label :for="`${term.slug}_${index}`">
              <input
                :id="`${term.slug}_${index}`"
                :ref="attr.name"
                class="hidden"
                :checked="index == 0"
                type="radio"
                :class="className(attr.name)"
                :name="attr.name"
                :value="term.slug"
                @change="updateAttrs" />
              <span class="radio-button" :class="`picker-${term.slug}`" :title="`${attr.name}: ${term.slug}`">{{ term.name }}</span>
            </label>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.radio-button {
  border-color: transparent;
  border-width: 2px;
  border-radius: 0.5rem;
  cursor: pointer;
  outline: 2px solid;
  outline-color: #f3f4f6;
  background-color: #f9fafb;
  font-size: 0.875rem;
  text-align: center;
  padding: 0.375rem 0.75rem;
  transition: all 0.2s;
  color: #1f2937;
  display: inline-block;
}
.radio-button:hover {
  outline-color: #6b7280;
}

.color-button {
  border-color: transparent;
  border-width: 2px;
  border-radius: 1rem;
  cursor: pointer;
  outline: 2px solid;
  outline-color: #f3f4f6;
  background-color: #f9fafb;
  font-size: 0.875rem;
  text-align: center;
  transition: all 0.2s;
  color: #1f2937;
  display: inline-block;
  width: 2rem;
  height: 2rem;
}
.color-button:hover {
  outline-color: #6b7280;
}

.color-green {
  background-color: #10b981;
}

.color-blue {
  background-color: #3b82f6;
}

.color-red {
  background-color: #ef4444;
}

.color-yellow {
  background-color: #f59e0b;
}

.color-orange {
  background-color: #f97316;
}

.color-purple {
  background-color: #8b5cf6;
}

.color-black {
  background-color: #000000;
}

input[type='radio']:checked ~ span {
  outline: 2px solid;
  outline-color: #6b7280;
}
</style>
