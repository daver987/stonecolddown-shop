<script setup lang="ts">
import type { CountriesEnum } from '#gql/default';

const { getStatesForCountry, countryStatesDict } = useCountry();
const stateName = defineModel<string>('stateName');
const countryCode = defineModel<string>('countryCode');

async function updateState() {
  if (countryCode.value) {
    await getStatesForCountry(countryCode.value as CountriesEnum);
  }
}

onMounted(() => {
  updateState();
});

watch(
  () => countryCode,
  () => {
    updateState();
  },
);
</script>

<template>
  <div>
    <USelectMenu
      v-if="countryStatesDict[countryCode as string]?.length"
      :options="countryStatesDict[countryCode as string]!.map((state) => state.name)"
      v-model="stateName"
      placeholder="Select a state" />
    <UInput v-else type="text" v-model="stateName" placeholder="Select a state" />
  </div>
</template>
