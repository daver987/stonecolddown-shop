<script setup lang="ts">
import type { Product } from '../../types';

const { addToWishlist, removeFromWishlist, isInList } = useWishlist();

const props = defineProps<{ product: Product }>();

const isWishlisted = computed(() => (props.product.databaseId ? isInList(props.product.databaseId) : false));

const toggleWishlist = () => (isWishlisted.value && props.product.databaseId ? removeFromWishlist(props.product.databaseId) : addToWishlist(props.product));
</script>

<template>
  <UButton
    :icon="isWishlisted ? 'i-heroicons-heart-solid' : 'i-heroicons-heart'"
    color="gray"
    :label="isWishlisted ? $t('messages.shop.wishlistRemove') : $t('messages.shop.wishlistAdd')"
    variant="ghost"
    @click="toggleWishlist"
    class="mt-4" />
</template>
