<script setup>
const { updateShippingMethod } = useCart();
const runtimeConfig = useRuntimeConfig();
const currencySymbol = runtimeConfig?.public?.CURRENCY_SYMBOL || '$';
const props = defineProps({
  options: { type: Array, required: true },
  activeOption: { type: String, required: true },
});

const setActiveOption = async (id) => {
  await updateShippingMethod(id);
};
</script>

<template>
  <div class="grid gap-4 shipping-options">
    <div
      v-for="option in options"
      :key="option.id"
      class="flex items-center justify-between option"
      :class="{ 'active-option': option.id === activeOption }"
      @click="setActiveOption(option.id)">
      <div>
        <div class="text-sm leading-tight text-gray-500" v-html="option.label"></div>
        <div class="font-semibold text-gray-600">{{ currencySymbol }}{{ option.cost }}</div>
      </div>

      <icon name="ion:checkmark-circle" size="20" class="ml-auto text-primary checkmark opacity-0" />
    </div>
  </div>
</template>

<style scoped>
.shipping-options {
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}

.option {
  background-color: white;
  border: 1px solid;
  border-radius: 0.5rem;
  color: #4a5568;
  cursor: pointer;
  display: flex;
  flex: 1;
  font-size: 0.875rem;
  padding: 0.75rem 1rem;
  gap: 0.5rem;
  align-items: center;
}

.option:hover {
  border-color: #9f7aea;
}

.option.active-option {
  border-color: #3182ce;
  cursor: default;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  pointer-events: none;
}

.option.active-option .checkmark {
  opacity: 1;
}
</style>
