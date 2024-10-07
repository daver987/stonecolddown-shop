<script setup lang="ts">
import type { DownloadableItem } from '../types';

const { formatDate } = useHelpers();

const props = defineProps({
  downloadableItems: { type: Object as PropType<DownloadableItem[]>, default: [] },
});
</script>

<template>
  <table class="w-full text-left table-auto" aria-label="Download List">
    <thead>
      <tr>
        <th>{{ $t('messages.general.product') }}</th>
        <th>{{ $t('messages.shop.downloadsRemaining') }}</th>
        <th>{{ $t('messages.shop.expires') }}</th>
        <th>{{ $t('messages.general.download') }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in props.downloadableItems" :key="item.id">
        <td class="rounded-l-lg">
          <NuxtLink v-if="item.product" :to="`/product/${item.product.slug}`" class="hover:underline">{{ item.product.name }}</NuxtLink>
        </td>
        <td>{{ item.downloadsRemaining || '∞' }}</td>
        <td>{{ item.accessExpires ? formatDate(item.accessExpires) : 'Never' }}</td>
        <td v-if="item.url">
          <a :href="item.url" :download="item.name" class="text-primary hover:text-primary-dark hover:underline">{{ item.name }}</a>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
tbody tr:nth-child(odd) {
  background-color: #fafafa;
}

thead tr {
  font-size: 0.75rem;
}

@media (min-width: 640px) {
  thead tr {
    font-size: 1rem;
  }
}

tbody tr {
  font-size: 0.75rem;
  color: #6b7280;
}

@media (min-width: 640px) {
  tbody tr {
    font-size: 0.875rem;
  }
}

td,
th {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-left: 0.75rem;
  padding-right: 0.75rem;
}
</style>
