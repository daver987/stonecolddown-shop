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
const imgSrc = computed(
  () => productType.value.image?.cartSourceUrl || productType.value.image?.sourceUrl || props.item.product.image?.sourceUrl || FALLBACK_IMG,
);
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
  <li class="flex py-6" v-if="productType">
    <div class="flex-shrink-0">
      <NuxtImg :src="imgSrc" :alt="productType.image?.altText || productType.name" class="h-16 w-16 rounded-md object-cover object-center sm:h-32 sm:w-32" />
    </div>
    <div class="flex flex-1 flex-col sm:ml-6">
      <div>
        <div class="flex justify-between">
          <h4 class="text-sm">
            <NuxtLink :to="productSlug" class="font-medium text-balance text-base">{{ productType.name }}</NuxtLink>
          </h4>
          <ProductPrice class="text-base ml-2 text-primary" :sale-price="productType.salePrice" :regular-price="productType.regularPrice" />
        </div>
        <p class="mt-1 text-sm text-gray-500">{{ productType.color }}</p>
        <p class="mt-1 text-sm text-gray-500">{{ productType.size }}</p>
      </div>
      <div class="mt-4 flex flex-1 items-end justify-between mb-2 w-full">
        <div class="flex justify-between items-center w-full">
          <QuantityInput :item="item" />
          <UButton icon="i-heroicons-trash" color="red" variant="ghost" size="2xs" @click="removeItem" aria-label="Remove Item" />
        </div>
      </div>
    </div>
  </li>
</template>
