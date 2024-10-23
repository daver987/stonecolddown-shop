import { createSharedComposable } from '@vueuse/core';

const _useUIState = () => {
  const route = useRoute();

  const isHeaderDialogOpen = ref(false);
  const isContentSearchModalOpen = ref(false);
  const isDashboardSidebarSlideOverOpen = ref(false);
  const isDashboardSearchModalOpen = ref(false);

  const toggleContentSearch = () => {
    if (isHeaderDialogOpen.value) {
      isHeaderDialogOpen.value = false;
      setTimeout(() => {
        isContentSearchModalOpen.value = !isContentSearchModalOpen.value;
      }, 0);
      return;
    }
    isContentSearchModalOpen.value = !isContentSearchModalOpen.value;
  };

  const toggleDashboardSearch = () => {
    if (isDashboardSidebarSlideOverOpen.value) {
      isDashboardSidebarSlideOverOpen.value = false;
      setTimeout(() => {
        isDashboardSearchModalOpen.value = !isDashboardSearchModalOpen.value;
      }, 200);
      return;
    }
    isDashboardSearchModalOpen.value = !isDashboardSearchModalOpen.value;
  };

  watch(
    () => route.path,
    () => {
      isDashboardSidebarSlideOverOpen.value = false;
    },
  );

  return {
    isHeaderDialogOpen,
    isContentSearchModalOpen,
    isDashboardSidebarSlideOverOpen,
    isDashboardSearchModalOpen,
    toggleContentSearch,
    toggleDashboardSearch,
  };
};

export const useUIState = createSharedComposable(_useUIState);
