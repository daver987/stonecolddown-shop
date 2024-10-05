/**
 * App configuration.
 * This file is used to configure the app settings.
 * Below are the default values.
 */
export default defineAppConfig({
  siteName: 'Stone Cold Down | Fine Line Black and Grey Tattoos',
  shortDescription: 'Explore the distinctive fine line black and grey tattoos by Natasha Smith',
  description: "Discover the artistry of Stone Cold Down, Toronto's premier female tattoo artist specializing in fine line black and grey tattoos. Elevate your ink with Natasha Smith's unique designs.",
  baseUrl: 'https://stonecolddown.com',
  siteImage: 'https://user-images.githubusercontent.com/5116925/218879668-f4c1f9fd-bef4-44b0-bc7f-e87d994aa3a1.png',
  storeSettings: {
    autoOpenCart: false,
    showReviews: true,
    showFilters: true,
    showOrderByDropdown: true,
    showSKU: true,
    showRelatedProducts: true,
    showProductCategoriesOnSingleProduct: true,
    showBreadcrumbOnSingleProduct: true,
    showMoveToWishlist: true,
    hideBillingAddressForVirtualProducts: false,
    initStoreOnUserActionToReduceServerLoad: true,
    saleBadge: 'percent', // 'percent', 'onSale' or 'hidden'
  },
  ui: {
    primary: 'amber',
    gray: 'zinc',
    variables: {
      light: {
        background: '255 255 255',
        foreground: 'var(--color-gray-700)',
      },
      dark: {
        background: 'var(--color-gray-900)',
        foreground: 'var(--color-gray-200)',
      },
      header: {
        height: '4rem',
      },
    },
    formGroup: {
      help: 'text-xs text-gray-500',
    },
    icons: {
      dark: 'i-heroicons-moon-20-solid',
      light: 'i-heroicons-sun-20-solid',
      system: 'i-heroicons-computer-desktop-20-solid',
      search: 'i-heroicons-magnifying-glass-20-solid',
      external: 'i-heroicons-arrow-up-right-20-solid',
      chevron: 'i-heroicons-chevron-down-20-solid',
      hash: 'i-heroicons-hashtag-20-solid',
      menu: 'i-heroicons-bars-3-20-solid',
      close: 'i-heroicons-x-mark-20-solid',
      check: 'i-heroicons-check-circle-20-solid',
    },
    button: {
      rounded: 'rounded-none',
      base: 'uppercase font-light text-xs',
    },
    container: {
      padding: 'px-2 sm:px-4 lg:px-6',
    },
    avatar: {
      background: 'bg-primary-500/10 dark:bg-primary-400/10',
      icon: {
        base: 'text-primary-500 dark:text-primary-400 flex-shrink-0',
      },
    },
  },
});
