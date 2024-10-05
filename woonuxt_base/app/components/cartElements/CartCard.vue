<script setup lang="ts">
const { updateItemQuantity } = useCart();
const { addToWishlist } = useWishlist();
const { FALLBACK_IMG } = useHelpers();
const { storeSettings } = useAppConfig();

const props = defineProps({
  item: { type: Object as PropType<any>, required: true },
});

const productType = computed(() => (props.item.variation ? props.item.variation.node : props.item.product?.node));
const productSlug = computed(() => `/product/${decodeURIComponent(props.item.product.node.slug)}`);
const isLowStock = computed(() => (productType.value.stockQuantity ? productType.value.lowStockAmount >= productType.value.stockQuantity : false));
const imgSrc = computed(() => productType.value.image?.cartSourceUrl || productType.value.image?.sourceUrl || props.item.product.image?.sourceUrl || FALLBACK_IMG);
const regularPrice = computed(() => Number.parseFloat(productType.value.rawRegularPrice));
const salePrice = computed(() => Number.parseFloat(productType.value.rawSalePrice));
const salePercentage = computed(() => `${Math.round(((regularPrice.value - salePrice.value) / regularPrice.value) * 100)}%`);

const removeItem = () => {
  updateItemQuantity(props.item.key, 0);
};

const moveToWishList = () => {
  addToWishlist(props.item.product.node);
  removeItem();
};
</script>

<template>
  <SwipeCard @remove="removeItem">
    <UCard v-if="productType" class="p-4">
      <div class="flex items-center gap-3 group">
        <NuxtLink :to="productSlug">
          <UAvatar
            :src="imgSrc"
            :alt="productType.image?.altText || productType.name"
            size="lg"
            class="rounded-md"
          />
        </NuxtLink>
        <div class="flex-1">
          <div class="flex gap-x-2 gap-y-1 flex-wrap items-center">
            <NuxtLink class="text-base font-medium" :to="productSlug">{{ productType.name }}</NuxtLink>
            <UBadge v-if="productType.salePrice" color="green" variant="subtle" size="xs">
              Save {{ salePercentage }}
            </UBadge>
            <UBadge v-if="isLowStock" color="orange" variant="subtle" size="xs">
              Low Stock
            </UBadge>
          </div>
          <ProductPrice class="mt-1 text-sm" :sale-price="productType.salePrice" :regular-price="productType.regularPrice" />
        </div>
        <div class="inline-flex gap-2 flex-col items-end">
          <QuantityInput :item="item" />
          <div class="text-xs text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 flex leading-none items-center">
            <UButton
              v-if="storeSettings.showMoveToWishlist"
              variant="ghost"
              color="gray"
              size="xs"
              class="mr-2"
              @click="moveToWishList"
            >
              Move to Wishlist
            </UButton>
            <UButton
              icon="i-heroicons-trash"
              color="gray"
              variant="ghost"
              size="xs"
              @click="removeItem"
              aria-label="Remove Item"
            />
          </div>
        </div>
      </div>
    </UCard>
  </SwipeCard>
</template>
