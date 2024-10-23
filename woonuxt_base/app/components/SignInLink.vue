<script setup lang="ts">
const { viewer, avatar, logoutUser, isPending, wishlistLink } = useAuth();
const linkTitle = computed<string>(() => viewer.value?.username || 'Sign In');
</script>

<template>
  <UPopover mode="hover" :popper="{ placement: 'bottom-end', offsetDistance: -40 }">
    <NuxtLink to="/my-account" :title="linkTitle" class="hidden sm:inline-flex aspect-square items-center">
      <UAvatar v-if="avatar" :src="avatar" :alt="linkTitle" icon="ion:person-outline" />
    </NuxtLink>

    <template #panel>
      <div class="w-48 bg-white py-2 dark:bg-zinc-950 rounded-md shadow-md space-y-2">
        <UButton :to="wishlistLink" variant="ghost" color="gray" block class="justify-start" leading-icon="ion:heart-outline" label="Wishlist" />
        <UDivider />
        <UButton to="/my-account" variant="ghost" color="gray" block class="justify-start" leading-icon="ion:person-outline" label="My Account" />
        <UDivider />
        <UButton
          variant="ghost"
          color="red"
          block
          class="justify-start"
          :loading="isPending"
          @click.prevent="logoutUser"
          leading-icon="ion:log-out-outline"
          label="Sign Out" />
      </div>
    </template>
  </UPopover>
</template>
