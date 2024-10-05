<script setup lang="ts">
const { isShowingSearch } = useSearching();
const headerId = useId();

const links = [
  {
    label: 'Tattoos',
    icon: 'i-heroicons-pencil-square',
    children: [
      {
        label: "Custom Tattoo's",
        to: '/tattoos',
        description: 'Bring your custom ideas to life',
      },
      {
        label: 'Tattoo Flash Design',
        to: '/flash-designs',
        description: 'Checkout predrawn flash designs',
      },
      {
        label: 'Tattoo Collections',
        to: '/collections',
        description: 'Groups of tattoos with a specific theme',
      },
    ],
  },
  {
    label: 'About',
    icon: 'i-heroicons-user',
    to: '/about',
  },
  {
    label: 'Portfolio',
    icon: 'i-heroicons-photo',
    to: '/portfolio',
  },
  {
    label: 'Shop',
    icon: 'i-heroicons-shopping-cart',
    to: '/products',
  },
  {
    label: 'Contact',
    icon: 'i-heroicons-phone',
    to: '/contact',
  },
];

const aboveHeaderLinksRight = [
  {
    label: 'Sign In',
    icon: 'i-heroicons-arrow-right-on-rectangle',
    to: '/sign-in',
  },
  {
    label: 'Create an Account',
    icon: 'i-heroicons-user',
    to: '/sign-up',
  },
];

const aboveHeaderLinksCenter = [
  {
    label: 'Tell me your idea',
    icon: 'i-heroicons-calendar',
    to: '/booking',
  },
];

// Hide subheader on scroll
const isAboveMd = useMediaQuery('(min-width: 768px)');
const isSubheaderVisible = ref(true);
onMounted(() => {
  const handleScroll = () => {
    isSubheaderVisible.value = window.scrollY <= 300;
  };
  window.addEventListener('scroll', handleScroll);
  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
  });
});
</script>

<template>
  <div class="header-wrapper" :id="headerId" :class="{ 'subheader-hidden': !isSubheaderVisible }">
    <div class="subheader flex justify-between items-center bg-black border-b border-white/10 border-b-1 w-full py-1.5 px-4 sm:px-6 lg:px-8" v-if="isAboveMd">
      <div class="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-3">
        <div class="col-span-1 text-black hidden lg:block">The left side</div>
        <div class="col-span-1 flex items-center justify-center py-1 gap-2">
          <span class="text-white text-xs font-light uppercase"> I am currently booking </span>
          <HeaderLinks
            :ui="{
              base: 'text-primary text-xs underline hover:text-amber-600 uppercase',
            }"
            :links="aboveHeaderLinksCenter" />
        </div>
        <div class="col-span-1 flex items-center justify-center py-1 lg:justify-end gap-2">
          <HeaderLinks :ui="{ base: 'uppercase font-light text-xs' }" :links="aboveHeaderLinksRight" />
        </div>
      </div>
    </div>
    <Header class="header-main">
      <template #logo>
        <MenuTrigger class="lg:hidden" />
        <Logo :size="isAboveMd ? 'xl' : 'sm'" text />
      </template>
      <template #center>
        <HeaderLinks v-if="isAboveMd" :links="links" />
      </template>
      <template #right>
        <div class="flex justify-end items-center md:w-[160px] flex-1 ml-auto gap-4 md:gap-6">
          <div class="flex gap-4 items-center">
            <SignInLink />
            <CartTrigger />
          </div>
        </div>
      </template>
      <template #panel>
        <UNavigationTree :links="links" />
      </template>
    </Header>
  </div>
</template>

<style>
.header-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  transition: transform 0.3s ease-in-out;
}

.subheader {
  transition: transform 0.3s ease-in-out;
}

.header-main {
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  transition: margin-top 0.3s ease-in-out;
}

.subheader-hidden .subheader {
  transform: translateY(-100%);
}

.subheader-hidden .header-main {
  margin-top: -40px;
}

main {
  padding-top: 120px;
  transition: padding-top 0.3s ease-in-out;
}

.subheader-hidden + main {
  padding-top: 80px;
}
</style>
