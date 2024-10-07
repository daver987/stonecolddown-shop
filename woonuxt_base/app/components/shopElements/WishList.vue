<script setup lang="ts">
const { theList } = useWishlist();
</script>

<template>
  <UCard class="rounded-lg shadow min-h-[400px] w-full p-4 md:p-12">
    <template #header>
      <div class="flex justify-between items-center">
        <UHeading level="1" size="xl">{{ $t('messages.shop.wishlist') }}</UHeading>
        <UBadge :label="`Items: ${theList.length}`" color="gray" variant="subtle" />
      </div>
    </template>

    <ClientOnly>
      <template v-if="theList.length">
        <UDivider class="my-4" />
        <UVirtualScroller :items="theList" item-key="databaseId" class="max-h-[600px] overflow-y-auto">
          <template #item="{ item }">
            <WishListItem :product="item" />
            <UDivider v-if="item !== theList[theList.length - 1]" class="my-2" />
          </template>
        </UVirtualScroller>
      </template>
      <template v-else>
        <UAlert icon="i-heroicons-information-circle" variant="soft" :title="$t('messages.shop.wishlistNoItems')" class="mt-4" />
      </template>
    </ClientOnly>
  </UCard>
</template>
