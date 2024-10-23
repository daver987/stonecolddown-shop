<script setup lang="ts">
const route = useRoute()
const { productsPerPage } = useHelpers()
const { products } = useProducts()

const page = ref<number>(route.params.pageNumber ? Number.parseInt(route.params.pageNumber as string, 10) : 1)
const numberOfPages = computed<number>(() => Math.ceil(products.value.length / productsPerPage) || 1)

const currentQuery = computed(() => {
  return new URLSearchParams(route.query as Record<string, string>).toString()
})

const buildPageUrl = (pageNumber: number): string => {
  const basePath = `/products/page/${pageNumber}`
  return currentQuery.value ? `${basePath}?${currentQuery.value}` : basePath
}

const prevSrc = computed(() => buildPageUrl(Math.max(page.value - 1, 1)))
const nextSrc = computed(() => buildPageUrl(Math.min(page.value + 1, numberOfPages.value)))
const numberSrc = (pageNumber: number): string => buildPageUrl(pageNumber)
</script>

<template>
  <div class="col-span-full mb-16 mt-8 flex justify-center tabular-nums">
    <!-- Pagination -->
    <nav v-if="numberOfPages && numberOfPages > 1" class="isolate inline-flex -space-x-px self-end rounded-md shadow-sm" aria-label="Pagination">
      <!-- PREV -->
      <NuxtLink
        :to="prevSrc"
        class="prev relative inline-flex items-center rounded-l-md border border-zinc-300 bg-white px-2 py-2 text-sm font-medium text-zinc-500 hover:bg-zinc-50 focus:z-10 focus:outline-none focus:ring-2 focus:ring-zinc-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:focus:ring-zinc-600"
        :disabled="page == 1"
        :class="{ 'cursor-not-allowed': page == 1 }"
        :aria-disabled="page == 1"
        aria-label="Previous">
        <Icon name="ion:chevron-back-outline" size="20" class="h-5 w-5" />
      </NuxtLink>

      <!-- NUMBERS -->
      <NuxtLink
        v-for="pageNumber in numberOfPages"
        :key="pageNumber"
        :to="numberSrc(pageNumber)"
        :aria-current="pageNumber === page ? 'page' : undefined"
        class="page-number relative inline-flex items-center border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-zinc-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700 dark:focus:ring-zinc-600"
        :class="{ 'z-10 border-zinc-500 bg-zinc-50 text-zinc-600 dark:border-zinc-400 dark:bg-zinc-900 dark:text-zinc-300': pageNumber === page }">
        {{ pageNumber }}
      </NuxtLink>

      <!-- NEXT -->
      <NuxtLink
        :to="nextSrc"
        class="next relative inline-flex items-center rounded-r-md border border-zinc-300 bg-white px-2 py-2 text-sm font-medium text-zinc-500 hover:bg-zinc-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-zinc-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:focus:ring-zinc-600"
        :disabled="page === numberOfPages"
        :class="{ 'cursor-not-allowed': page === numberOfPages }"
        :aria-disabled="page === numberOfPages"
        aria-label="Next">
        <Icon name="ion:chevron-forward-outline" size="20" class="h-5 w-5" />
      </NuxtLink>
    </nav>
  </div>
</template>
