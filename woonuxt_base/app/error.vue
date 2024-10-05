<script setup lang="ts">
const route = useRoute();
const { error } = defineProps<{ error: any }>();
const { isShowingCart, toggleCart } = useCart();
const { isShowingMobileMenu, toggleMobileMenu, addBodyClass, removeBodyClass } = useHelpers();

const closeCartAndMenu = () => {
  toggleCart(false);
  toggleMobileMenu(false);
};

watch([isShowingCart, isShowingMobileMenu], () => {
  isShowingCart.value || isShowingMobileMenu.value ? addBodyClass('overflow-hidden') : removeBodyClass('overflow-hidden');
});

watch(
  () => route.path,
  () => closeCartAndMenu(),
);

useSeoMeta({
  title: error?.statusCode ? `Error ${error.statusCode}` : 'Error',
  description: error?.message || '',
});
</script>

<template>
  <div>
    <Main>
      <AppHeader />

      <Transition name="slide-from-right">
        <LazyCart v-if="isShowingCart" />
      </Transition>

      <Transition name="slide-from-left">
        <MobileMenu v-if="isShowingMobileMenu" />
      </Transition>

      <PageError :error="error" />

      <Transition name="fade">
        <div v-if="isShowingCart || isShowingMobileMenu" class="bg-black opacity-25 inset-0 z-40 fixed" @click="closeCartAndMenu" />
      </Transition>

      <AppFooter />
    </Main>
    <UNotifications />
  </div>
</template>
