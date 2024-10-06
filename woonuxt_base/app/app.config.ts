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
  siteImage: 'https://res.cloudinary.com/dks0sw9qh/images/v1720247926/cropped-scd_logo_/cropped-scd_logo_.jpg?_i=AA',
  storeSettings: {
    autoOpenCart: false,
    showReviews: true,
    showFilters: true,
    showOrderByDropdown: true,
    showSKU: false,
    showRelatedProducts: true,
    showProductCategoriesOnSingleProduct: true,
    showBreadcrumbOnSingleProduct: true,
    showMoveToWishlist: true,
    hideBillingAddressForVirtualProducts: false,
    initStoreOnUserActionToReduceServerLoad: true,
    saleBadge: 'percent', // 'percent', 'onSale' or 'hidden'
  },
})
