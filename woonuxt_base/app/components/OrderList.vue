<script setup lang="ts">
const router = useRouter();
const { formatDate, scrollToTop } = useHelpers();
const { getOrders, orders } = useAuth();

if (orders.value === null) getOrders();

const refresh = () => {
  orders.value = null;
  scrollToTop();
  getOrders();
};

const goToOrder = (orderNumber: string): void => {
  router.push(`/order-summary/${orderNumber}`);
};
</script>

<template>
  <UCard class="min-h-[250px]">
    <template v-if="orders && orders.length">
      <UTable
        :rows="orders"
        :columns="[
          { key: 'orderNumber', label: $t('messages.shop.order') },
          { key: 'date', label: $t('messages.general.date') },
          { key: 'status', label: $t('messages.general.status') },
          { key: 'total', label: $t('messages.shop.total') },
        ]">
        <template #orderNumber-data="{ row }">
          <UButton variant="link" @click="goToOrder(row.orderNumber)">
            {{ row.orderNumber }}
          </UButton>
        </template>
        <template #date-data="{ row }">
          {{ formatDate(row.date) }}
        </template>
        <template #status-data="{ row }">
          <OrderStatusLabel v-if="row.status" :order="row" />
        </template>
        <template #total-data="{ row }">
          {{ row.total }}
        </template>
      </UTable>
      <div class="text-center flex justify-center w-full mt-8">
        <UButton icon="i-heroicons-arrow-path" variant="ghost" color="gray" @click="refresh"> Refresh list </UButton>
      </div>
    </template>
    <template v-else-if="orders && orders.length === 0">
      <div class="min-h-[250px] flex items-center justify-center text-gray-500 dark:text-gray-400 text-lg">No orders found.</div>
    </template>
    <template v-else>
      <div class="min-h-[250px] flex items-center justify-center">
        <UIcon name="i-heroicons-arrow-path" class="animate-spin" />
      </div>
    </template>
  </UCard>
</template>

<style scoped>
tbody tr:nth-child(odd) {
  background-color: #fafafa;
}

tbody tr {
  font-size: 0.875rem;
  color: #6b7280;
}

tbody tr:hover {
  color: #1f2937;
}

td,
th {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-left: 0.75rem;
  padding-right: 0.75rem;
}
</style>
