<script setup lang="ts">
useHead({
  bodyAttrs: {
    class: 'dark:bg-gray-900',
  },
});
const colorMode = useColorMode();

colorMode.forced = true;
colorMode.preference = 'dark';

const route = useRoute();
const { isShowingCart, toggleCart } = useCart();
const { isShowingMobileMenu, toggleMobileMenu, addBodyClass, removeBodyClass } = useHelpers();
const { siteName } = useAppConfig();

const closeCartAndMenu = () => {
  toggleCart(false);
  toggleMobileMenu(false);
};

watch([isShowingCart, isShowingMobileMenu], () => {
  if (isShowingCart.value || isShowingMobileMenu.value) {
    addBodyClass('overflow-hidden');
  } else {
    removeBodyClass('overflow-hidden');
  }
});

watch(
  () => route.path,
  () => closeCartAndMenu(),
);

useHead({
  titleTemplate: `%s - ${siteName}`,
});
</script>

<template>
  <div>
    <NuxtLoadingIndicator color="#987f57" />
    <AppHeader />

    <LazyCart v-if="isShowingCart" />

    <MobileMenu v-if="isShowingMobileMenu" />

    <Main>
      <NuxtPage />
    </Main>

    <div v-if="isShowingCart || isShowingMobileMenu" class="bg-black opacity-25 inset-0 z-40 fixed" @click="closeCartAndMenu" />

    <AppFooter />
    <UNotifications />
    <UModals />
  </div>
</template>

<style>
/* Slide-from-right & Slide-from-left */
.slide-from-right-leave-active,
.slide-from-right-enter-active,
.slide-from-left-leave-active,
.slide-from-left-enter-active {
  transition: transform 300ms ease-in-out;
}

.slide-from-right-enter-from,
.slide-from-right-leave-to {
  transform: translateX(500px);
}

.slide-from-left-enter-from,
.slide-from-left-leave-to {
  transform: translateX(-500px);
}

/* Fade */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 300ms ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Scale Y */
.scale-y-enter-active,
.scale-y-leave-active {
  transition: all 500ms linear;
  will-change: max-height, opacity;
  max-height: 9999px;
  overflow: hidden;
  opacity: 1;
}

.scale-y-enter-from,
.scale-y-leave-to {
  max-height: 0;
  opacity: 0;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.custom-scrollbar::-webkit-scrollbar-track,
.custom-scrollbar::-webkit-scrollbar {
  border-radius: 0.375rem;
  background-color: #f7fafc;
  width: 0.375rem;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  border-radius: 0.375rem;
  background-color: #a0aec0;
}

@keyframes fadeIn {
  0% {
    opacity: 0.001;
  }

  100% {
    opacity: 1;
  }
}

@keyframes fadeDisabledIn {
  0% {
    opacity: 0.001;
  }

  100% {
    opacity: 0.7;
  }
}

@keyframes fadeOut {
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0.001;
  }
}

.page-enter-active,
.page-leave-active {
  transition: opacity 20ms;
}

.page-enter,
.page-leave-to {
  opacity: 0;
}

.page-enter-active {
  animation-duration: 200ms;
  animation-name: fadeIn;
  animation-timing-function: linear;
  backface-visibility: hidden;
}

.page-leave-active {
  animation-name: fadeOut;
  animation-duration: 200ms;
}

@keyframes skelaton {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

img.skeleton {
  animation: skelaton 2000ms infinite cubic-bezier(0.4, 0, 0.2, 1);
  background-image: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
}
</style>
