<script lang="ts" setup>
const { logoutUser, viewer, customer, avatar, isPending } = useAuth();
const { cart } = useCart();
const route = useRoute();

const activeTab = computed(() => route.query.tab || 'my-details');
const showLoader = computed(() => !cart.value);

definePageMeta({
  title: 'My Account',
});

const menuItems = [
  { name: 'my-details', label: 'My Details', icon: 'i-heroicons-user-circle' },
  { name: 'orders', label: 'Orders', icon: 'i-heroicons-shopping-bag' },
  { name: 'downloads', label: 'Downloads', icon: 'i-heroicons-cloud-arrow-down' },
  { name: 'wishlist', label: 'Wishlist', icon: 'i-heroicons-heart' },
];
</script>

<template>
  <div class="container min-h-[600px] pt-4">
    <div v-if="showLoader" class="flex min-h-[500px] flex-col">
      <UIcon name="i-heroicons-arrow-path" class="m-auto animate-spin" />
    </div>
    <template v-else>
      <AuthForms v-if="!viewer" />
      <div v-else class="mb-24 flex w-full flex-col items-start justify-between lg:flex-row lg:gap-8">
        <UCard class="top-20 mt-2 w-full lg:sticky lg:max-w-[260px]">
          <template #header>
            <div class="flex items-center gap-4">
              <UAvatar v-if="avatar" :src="avatar" alt="User Avatar" />
              <div class="flex-1 overflow-hidden">
                <p class="text-lg font-semibold truncate">Welcome, {{ viewer?.firstName }}</p>
                <p v-if="viewer?.email" class="text-sm text-gray-500 dark:text-gray-400 truncate">{{ viewer?.email }}</p>
              </div>
            </div>
          </template>

          <nav class="flex flex-col space-y-2">
            <UButton
              v-for="item in menuItems"
              :key="item.name"
              :to="`/my-account?tab=${item.name}`"
              :icon="item.icon"
              :label="item.label"
              :color="activeTab === item.name ? 'primary' : 'gray'"
              variant="ghost"
              class="justify-start" />
          </nav>

          <template #footer>
            <UButton block color="red" variant="soft" icon="i-heroicons-arrow-right-on-rectangle" :loading="isPending" @click="logoutUser">
              {{ $t('messages.account.logout') }}
            </UButton>
          </template>
        </UCard>

        <main class="w-full max-w-screen-lg flex-1 rounded-lg md:-mt-28">
          <AccountMyDetails v-if="activeTab === 'my-details'" :user="viewer" />
          <OrderList v-else-if="activeTab === 'orders'" />
          <DownloadList v-else-if="activeTab === 'downloads'" />
          <WishList v-else-if="activeTab === 'wishlist'" />
        </main>
      </div>
    </template>
  </div>
</template>
