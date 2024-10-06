<script setup lang="ts">
const { getOrderQuery, setOrderQuery } = useSorting();
const { storeSettings } = useAppConfig();
const selectedOrder = ref(getOrderQuery());
const orderby = ref(selectedOrder.value.orderBy || 'date');
const order = ref(selectedOrder.value.order || 'DESC');

const options = [
  { label: 'Latest', value: 'date', icon: 'i-heroicons-calendar' },
  { label: 'Alphabetically', value: 'alphabetically', icon: 'i-heroicons-language' },
  { label: 'Price', value: 'price', icon: 'i-heroicons-currency-dollar' },
  { label: 'Discount', value: 'discount', icon: 'i-heroicons-tag' },
];

if (storeSettings.showReviews) {
  options.push({ label: 'Rating', value: 'rating', icon: 'i-heroicons-star' });
}

const toggleOrder = () => {
  order.value = order.value === 'ASC' ? 'DESC' : 'ASC';
};

watch(
  [orderby, order],
  () => {
    setOrderQuery(orderby.value, order.value);
  },
  { immediate: true },
);
</script>

<template>
  <UButtonGroup orientation="horizontal">
    <UButton color="gray" :icon="order === 'ASC' ? 'i-heroicons-arrow-up' : 'i-heroicons-arrow-down'" @click="toggleOrder" />
    <USelect v-model="orderby" :options="options" placeholder="Order by"> </USelect>
  </UButtonGroup>
</template>
