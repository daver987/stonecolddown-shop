<script setup lang="ts">
const route = useRoute();
const { productsPerPage } = useHelpers();
const { products } = useProducts();

const page = ref<number>(route.params.pageNumber ? parseInt(route.params.pageNumber as string, 10) : 1);
const numberOfPages = computed<number>(() => Math.ceil(products.value.length / productsPerPage) || 1);

const currentQuery = computed(() => {
  return new URLSearchParams(route.query as Record<string, string>).toString();
});

const buildPageUrl = (pageNumber: number): string => {
  const basePath = `/products/page/${pageNumber}`;
  return currentQuery.value ? `${basePath}?${currentQuery.value}` : basePath;
};

const prevSrc = computed(() => buildPageUrl(Math.max(page.value - 1, 1)));
const nextSrc = computed(() => buildPageUrl(Math.min(page.value + 1, numberOfPages.value)));
const numberSrc = (pageNumber: number): string => buildPageUrl(pageNumber);
</script>

<template>
  <div class="flex justify-center mt-8 mb-16 col-span-full tabular-nums">
    <!-- Pagination -->
    <nav v-if="numberOfPages && numberOfPages > 1" class="inline-flex self-end -space-x-px rounded-md shadow-sm isolate" aria-label="Pagination">
      <!-- PREV -->
      <NuxtLink :to="prevSrc" class="prev" :disabled="page == 1" :class="{ 'cursor-not-allowed': page == 1 }" :aria-disabled="page == 1" aria-label="Previous">
        <Icon name="ion:chevron-back-outline" size="20" class="w-5 h-5" />
      </NuxtLink>

      <!-- NUMBERS -->
      <NuxtLink
        v-for="pageNumber in numberOfPages"
        :key="pageNumber"
        :to="numberSrc(pageNumber)"
        :aria-current="pageNumber === page ? 'page' : undefined"
        class="page-number">
        {{ pageNumber }}
      </NuxtLink>

      <!-- NEXT -->
      <NuxtLink
        :to="nextSrc"
        class="next"
        :disabled="page === numberOfPages"
        :class="{ 'cursor-not-allowed': page === numberOfPages }"
        :aria-disabled="page === numberOfPages"
        aria-label="Next">
        <Icon name="ion:chevron-forward-outline" size="20" class="w-5 h-5" />
      </NuxtLink>
    </nav>
  </div>
</template>

<style scoped>
.prev,
.next,
.page-number {
  background-color: white;
  border: 1px solid;
  font-weight: 500;
  border-color: #d1d5db;
  font-size: 0.875rem;
  padding: 0.5rem;
  color: #6b7280;
  position: relative;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
}

.prev:hover,
.next:hover,
.page-number:hover {
  background-color: #f9fafb;
}

.prev:focus,
.next:focus,
.page-number:focus {
  z-index: 10;
}

.prev {
  border-top-left-radius: 0.375rem;
  border-bottom-left-radius: 0.375rem;
}

.next {
  border-top-right-radius: 0.375rem;
  border-bottom-right-radius: 0.375rem;
}

.page-number {
  padding-left: 0.75rem;
  padding-right: 0.75rem;
}

.page-number[aria-current='page'] {
  background-color: rgba(59, 130, 246, 0.1);
  border-color: #3b82f6;
  color: #3b82f6;
  z-index: 10;
}
</style>
