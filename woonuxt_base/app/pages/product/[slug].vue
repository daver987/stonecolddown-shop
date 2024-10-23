<script lang="ts" setup>
import { z } from 'zod'
import { StockStatusEnum, ProductTypesEnum, type AddToCartInput } from '#woo'
import type { Product, Variation, VariationAttribute } from '../../types'
import type { FormSubmitEvent } from '#ui/types'
import { useSeoMeta } from '#imports'

definePageMeta({
  layout: 'default',
  colorMode: 'dark',
})

const route = useRoute()
const { storeSettings } = useAppConfig()
const { arraysEqual, formatArray, checkForVariationTypeOfAny } = useHelpers()
const { addToCart, isUpdatingCart } = useCart()
const { t } = useI18n()
const slug = route.params.slug as string

const { data } = await useAsyncGql('getProduct', { slug })
if (!data.value?.product) {
  throw showError({
    statusCode: 404,
    statusMessage: t('messages.shop.productNotFound'),
  })
}

const product = ref<Product>(data?.value?.product)
const quantity = ref<number>(1)
const activeVariation = ref<Variation | null>(null)
const variation = ref<VariationAttribute[]>([])
const indexOfTypeAny = computed<number[]>(() => checkForVariationTypeOfAny(product.value))
const attrValues = ref()
const isSimpleProduct = computed<boolean>(() => product.value?.type === ProductTypesEnum.SIMPLE)
const isVariableProduct = computed<boolean>(() => product.value?.type === ProductTypesEnum.VARIABLE)
const isExternalProduct = computed<boolean>(() => product.value?.type === ProductTypesEnum.EXTERNAL)

const type = computed(() => activeVariation.value || product.value)
const selectProductInput = computed(() => ({
  productId: type.value?.databaseId,
  quantity: quantity.value,
  variationId: activeVariation.value?.databaseId ?? null,
  variation: activeVariation.value ? attrValues.value : null,
}))

const mergeLiveStockStatus = (payload: Product): void => {
  product.value.stockStatus = payload.stockStatus ?? product.value?.stockStatus

  payload.variations?.nodes?.forEach((variation: Variation, index: number) => {
    if (product.value?.variations?.nodes[index]) {
      product.value.variations.nodes[index].stockStatus = variation.stockStatus
    }
  })
}

onMounted(async () => {
  try {
    const { product } = await GqlGetStockStatus({ slug })
    if (product) mergeLiveStockStatus(product as Product)
  } catch (error: unknown) {
    const errorMessage = (error as { gqlErrors?: { message: string }[] })?.gqlErrors?.[0]?.message
    if (errorMessage) console.error(errorMessage)
  }
})

const updateSelectedVariations = (variations: VariationAttribute[]): void => {
  if (!product.value.variations) return

  attrValues.value = variations.map((el) => ({
    attributeName: el.name,
    attributeValue: el.value,
  }))
  const clonedVariations = JSON.parse(JSON.stringify(variations))
  const getActiveVariation = product.value.variations?.nodes.filter((variation: Variation) => {
    if (variation.attributes) {
      for (const index of indexOfTypeAny.value) {
        clonedVariations[index].value = ''
      }
      return arraysEqual(formatArray(variation.attributes.nodes), formatArray(clonedVariations))
    }
    return false
  })

  if (getActiveVariation[0]) activeVariation.value = getActiveVariation[0]
  selectProductInput.value.variationId = activeVariation.value?.databaseId ?? null
  selectProductInput.value.variation = activeVariation.value ? attrValues.value : null
  variation.value = variations
}

const stockStatus = computed(() => {
  if (isVariableProduct.value) return activeVariation.value?.stockStatus || StockStatusEnum.OUT_OF_STOCK
  return type.value?.stockStatus || StockStatusEnum.OUT_OF_STOCK
})
const disabledAddToCart = computed(() => {
  if (isSimpleProduct.value) return !type.value || stockStatus.value === StockStatusEnum.OUT_OF_STOCK || isUpdatingCart.value
  return !type.value || stockStatus.value === StockStatusEnum.OUT_OF_STOCK || !activeVariation.value || isUpdatingCart.value
})

const schema = z.object({
  quantity: z.number().min(1, 'Quantity must be at least 1'),
  productId: z.number().positive('Invalid product ID'),
  variationId: z.number().optional(),
  variation: z
    .array(
      z.object({
        attributeName: z.string(),
        attributeValue: z.string(),
      }),
    )
    .nullable(),
})

type Schema = z.output<typeof schema>

const state = reactive({
  quantity: 1,
  productId: product.value?.databaseId,
  variationId: null,
  variation: null,
})

const updateState = (): void => {
  state.productId = type.value?.databaseId ?? 0
  //@ts-ignore
  state.variationId = activeVariation.value?.databaseId ?? 0
  state.variation = activeVariation.value ? attrValues.value : null
}

watch([() => type.value, activeVariation], updateState)

const onSubmit = async (event: FormSubmitEvent<Schema>) => {
  console.log('Form submitted:', event)
  const input: AddToCartInput = {
    productId: state.productId,
    quantity: state.quantity,
    variationId: state.variationId || undefined,
    variation: state.variation || undefined,
  }
  await addToCart(input)
}

useSeoMeta({
  title: () => `${product.value?.name} | Stone Cold Down Shop`,
  description: () =>
    product.value?.shortDescription ||
    `Shop ${product.value?.name} from Stone Cold Down. Inspired by Natasha Smith's fine line black and gray tattoo artistry.`,
  ogTitle: () => `${product.value?.name} | Stone Cold Down Shop`,
  ogDescription: () =>
    product.value?.shortDescription || `Get your hands on ${product.value?.name}. Unique merchandise featuring Natasha Smith's distinctive tattoo designs.`,
  ogImage: () => product.value?.image?.sourceUrl || '/images/scd_logo.png',
  ogUrl: () => `https://stonecolddown.com/product/${product.value?.slug}`,
  twitterTitle: () => `${product.value?.name} | Stone Cold Down Shop`,
  twitterDescription: () => `Discover ${product.value?.name} from Stone Cold Down. Tattoo-inspired product by fine line artist Natasha Smith.`,
  twitterImage: () => product.value?.image?.sourceUrl || '/images/scd_logo.png',
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <UContainer class="py-6">
    <div v-if="product">
      <SEOHead :info="product" />
      <Breadcrumb :product class="mb-6" v-if="storeSettings.showBreadcrumbOnSingleProduct" />

      <div class="flex flex-col gap-10 md:flex-row md:justify-between lg:gap-24">
        <ProductImageGallery
          v-if="product.image"
          class="relative flex-1"
          :main-image="product.image"
          :gallery="product.galleryImages!"
          :node="product"
          :activeVariation="(activeVariation || {}) as Product" />
        <NuxtImg v-else class="skeleton relative flex-1" src="/images/placeholder.jpg" :alt="product?.name || 'Product'" />

        <div class="w-full md:py-2 lg:max-w-md xl:max-w-lg">
          <div class="mb-4 flex justify-between">
            <div class="flex-1">
              <h1 class="mb-2 flex flex-wrap items-center gap-2 text-2xl font-semibold">
                {{ type.name }}
                <LazyWPAdminLink :link="`/wp-admin/post.php?post=${product.databaseId}&action=edit`">Edit</LazyWPAdminLink>
              </h1>
              <StarRating :rating="product.averageRating || 0" :count="product.reviewCount || 0" v-if="storeSettings.showReviews" />
            </div>
            <ProductPrice class="text-xl" :sale-price="type.salePrice" :regular-price="type.regularPrice" />
          </div>

          <UDivider class="my-4" />

          <div class="my-4 grid gap-2 text-sm empty:hidden">
            <div v-if="!isExternalProduct" class="flex items-center gap-2">
              <span class="text-gray-500 dark:text-gray-400">{{ $t('messages.shop.availability') }}: </span>
              <StockStatus :stockStatus @updated="mergeLiveStockStatus" />
            </div>
            <div class="flex items-center gap-2" v-if="storeSettings.showSKU && product.sku">
              <span class="text-gray-500 dark:text-gray-400">{{ $t('messages.shop.sku') }}: </span>
              <span>{{ product.sku || 'N/A' }}</span>
            </div>
          </div>

          <div class="prose mb-8 font-light dark:prose-invert" v-html="product.shortDescription || product.description" />

          <UDivider class="my-4" />

          <form v-if="!isExternalProduct && (isVariableProduct || isSimpleProduct)" @submit.prevent="(e: Event) => onSubmit(e as FormSubmitEvent<Schema>)">
            <AttributeSelections
              v-if="isVariableProduct && product.attributes && product.variations"
              class="mb-8 mt-4"
              :attributes="product.attributes?.nodes as VariationAttribute[]"
              :defaultAttributes="{ nodes: product.defaultAttributes as unknown as VariationAttribute[] }"
              :variations="{ nodes: product.variations?.nodes as Variation[] }"
              @attrs-changed="updateSelectedVariations" />

            <div v-if="isVariableProduct || isSimpleProduct" class="flex">
              <UInput v-model="state.quantity" type="number" min="1" aria-label="Quantity" class="rounded-r-none" />
              <UButton :loading="isUpdatingCart" :disabled="disabledAddToCart" type="submit" label="Add to Cart" class="rounded-l-none" />
            </div>
          </form>

          <UButton type="button" v-if="isExternalProduct && product.externalUrl" :to="product.externalUrl" target="_blank" block>
            {{ product?.buttonText || 'View product' }}
          </UButton>

          <div v-if="storeSettings.showProductCategoriesOnSingleProduct && product.productCategories">
            <UDivider class="my-4" />
            <div class="my-4 grid gap-2 text-sm">
              <div class="flex items-center gap-2">
                <span class="text-gray-500 dark:text-gray-400">{{ $t('messages.shop.category', 2) }}:</span>
                <div class="product-categories">
                  <NuxtLink
                    v-for="category in product.productCategories.nodes"
                    :key="category.slug ?? ''"
                    :to="`/product-category/${decodeURIComponent(category.slug ?? '')}`"
                    class="hover:text-primary"
                    :title="category.name"
                    >{{ category.name }}<span class="comma">, </span>
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>

          <UDivider class="my-4" />

          <div class="flex flex-wrap gap-4">
            <WishlistButton :product />
            <ShareButton :product />
          </div>
        </div>
      </div>
      <div v-if="product.description || product.reviews" class="my-32">
        <ProductTabs :product />
      </div>
      <div class="my-32" v-if="product.related && storeSettings.showRelatedProducts">
        <div class="mb-4 text-xl font-semibold">{{ $t('messages.shop.youMayLike') }}</div>
        <ProductRow :products="product.related.nodes" class="grid-cols-2 md:grid-cols-4 lg:grid-cols-5" />
      </div>
    </div>
  </UContainer>
</template>

<style scoped>
.product-categories > a:last-child .comma {
  display: none;
}

input[type='number']::-webkit-inner-spin-button {
  opacity: 1;
}
</style>
