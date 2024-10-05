<script setup lang="ts">
const { viewer, avatar, logoutUser, isPending, wishlistLink } = useAuth();
const linkTitle = computed<string>(() => viewer.value?.username || 'Sign In');
</script>

<template>
  <NuxtLink to="/my-account" :title="linkTitle" class="hidden sm:inline-flex aspect-square items-center">
    <Transition name="pop-in" mode="out-in">
      <span v-if="avatar" class="relative avatar">
        <NuxtImg
          :src="avatar"
          class="rounded-full transform scale-125 shadow-md overflow-hidden border border-white my-auto"
          width="22"
          height="22"
          :alt="linkTitle" />
        <div class="account-dropdown">
          <NuxtLink :to="wishlistLink" class="hover:bg-gray-100"><Icon name="ion:heart-outline" size="16" /><span>Wishlist</span></NuxtLink>
          <NuxtLink to="/my-account" class="hover:bg-gray-100"><Icon name="ion:person-outline" size="16" /><span>My Account</span></NuxtLink>
          <button class="text-red-600 hover:bg-red-50" @click.prevent="logoutUser">
            <LoadingIcon v-if="isPending" size="16" />
            <Icon v-else name="ion:log-out-outline" size="16" />
            <span>Logout</span>
          </button>
        </div>
      </span>
      <Icon v-else name="ion:person-outline" size="22" class="border border-transparent" />
    </Transition>
  </NuxtLink>
</template>

<style scoped>
.pop-in-enter-active,
.pop-in-leave-active {
  transition: transform 0.3s;
}

.pop-in-enter-from,
.pop-in-leave-to {
  transform: scale(0);
}

.avatar .account-dropdown {
  position: absolute;
  gap: 0.5rem;
  top: 1.5rem;
  right: -0.5rem;
  z-index: 50;
  padding: 0.5rem;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  font-size: 0.875rem;
  color: #4b5563;
  display: none;
}

.avatar .account-dropdown a,
.avatar .account-dropdown button {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.25rem;
  white-space: nowrap;
  min-width: 200px;
}

.avatar:hover .account-dropdown {
  display: grid;
}
</style>
