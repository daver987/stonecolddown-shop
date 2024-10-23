<script setup lang="ts">
const { getAllowedCountries, countriesToShow } = useCountry();

const selected = defineModel<string>();

onMounted(async () => {
  await getAllowedCountries();
});
const countriesArray = computed(() => countriesToShow.value.map((country) => country.name));
</script>

<template>
  <USelectMenu :options="countriesArray" v-model="selected" placeholder="Select a country" required />
</template>
