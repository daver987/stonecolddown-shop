<script lang="ts" setup>
import { ProductsOrderByEnum } from '#woo';
import type { Review } from '../types';
import type { ButtonColor, ButtonSize, ButtonVariant } from '#ui/types';
import BackgroundCard from '../components/BackgroundCard.vue';

definePageMeta({
  layout: 'default',
  colorMode: 'dark',
});

const bio = {
  headline: 'Meet The Artist',
  title: 'Natasha Smith',
  description:
    'Natasha Smith is a talented tattoo artist specializing in fine line black and grey tattoos. With years of experience and a passion for creating unique, personalized designs, Natasha brings your vision to life through her artistry.',
  align: 'left' as 'left' | 'center' | 'right' | undefined,
  links: [
    {
      label: 'Learn More',
      color: 'primary' as ButtonColor,
      size: 'md' as ButtonSize,
      variant: 'outline' as ButtonVariant,
    },
  ],
};

const aboutImg = {
  one: 'https://res.cloudinary.com/dks0sw9qh/image/upload/e_grayscale/e_brightness:-60/ar_3:2,c_crop/stonecolddown/Natasha/natasha-36.jpg',
}

const backgroundCards = [
  {
    type: 'background' as 'background' | 'product',
    image:
      'https://res.cloudinary.com/dks0sw9qh/image/upload/f_auto,q_auto/v1/stonecolddown/Portfolio/portfolio_28',
    title: 'Tattoos',
    description:
      'Whether you know exactly what you want or need some inspiration, Natasha will work with you to create a custom design that perfectly captures your style and personality.',
    to: '/tattoos',
    buttonLabel: 'Tell Me Your Idea',
  },
  {
    type: 'background' as 'background' | 'product',
    image:
      'https://res.cloudinary.com/dks0sw9qh/image/upload/f_auto,q_auto/v1/stonecolddown/ballpoint/ballpoint_21',
    title: 'Flash Tattoo Designs',
    description:
      'Check out our flash tattoo designs. These designs are ready to be tattooed and are a great way to get started with your tattoo journey.',
    to: '/flash-designs',
    buttonLabel: 'View Flash Designs',
  },
  {
    type: 'background' as 'background' | 'product',
    image:
      'https://res-console.cloudinary.com/dks0sw9qh/media_explorer_thumbnails/a2bffa0c5dcff7b8f4473d8d9650cb5f/detailed',
    title: 'Merchandise',
    description:
      'Shop our exclusive merchandise. We have a wide range of product from hats to shirts to mugs and more.',
    to: '/products',
    buttonLabel: 'Shop Merch',
  },
]
const { siteName, description, shortDescription, siteImage } = useAppConfig();

const { data: reviews } = await useFetch<Review[]>('/api/reviews');

const { data } = await useAsyncGql('getProductCategories', { first: 6 });
const productCategories = data.value?.productCategories?.nodes || [];

const { data: productData } = await useAsyncGql('getProducts', { first: 5, orderby: ProductsOrderByEnum.POPULARITY });
const popularProducts = productData.value.products?.nodes || [];

useSeoMeta({
  title: 'Home',
  ogTitle: siteName,
  description: description,
  ogDescription: shortDescription,
  ogImage: siteImage,
  twitterCard: 'summary_large_image',
});
</script>

<template>
  <Page>
    <HeroBanner />

    <LandingSection
      :headline="bio.headline"
      :title="bio.title"
      :description="bio.description"
      :align="bio.align"
      :links="bio.links"
      :ui="{
        title: 'text-3xl font-heading',
        headline: 'text-lg font-thin text-white',
        description: 'text-base',
        links:
          'bg-transparent text-ballance border-1 border-primary-400 hover:bg-primary/10 hover:text-white hover:border-primary-400 w-16 rounded-none',
      }"
    >
      <NuxtImg
        class="w-full rounded-md shadow-xl ring-1 ring-gray-300 dark:ring-gray-700"
        :src="aboutImg.one"
        alt="Natash Smith"
      />
    </LandingSection>

    <LandingSection headline="Collections" title="Ink and Inspiration">
      <LandingGrid>
        <BackgroundCard
          class="col-span-4 row-span-8"
          v-for="card in backgroundCards"
          v-bind="card"
          :key="card.title"
        />
      </LandingGrid>
    </LandingSection>

    <section class="container my-16">
      <div class="flex items-end justify-between">
        <h2 class="text-lg font-semibold md:text-2xl">{{ $t('messages.shop.shopByCategory') }}</h2>
        <NuxtLink class="text-primary" to="/categories">{{ $t('messages.general.viewAll') }}</NuxtLink>
      </div>
      <div class="grid justify-center grid-cols-2 gap-4 mt-8 md:grid-cols-3 lg:grid-cols-6">
        <CategoryCard v-for="(category, i) in productCategories" :key="i" class="w-full" :node="category" />
      </div>
    </section>

    <LandingSection>
      <LandingCTA
        :ui="{
          title: 'text-3xl font-heading text-amber-400',
        }"
        title="Book Your Appointment Today"
        description="Don't wait, book your appointment with Natasha now and get your dream tattoo."
        :links="[
          {
            label: 'Book Now',
            color: 'white',
            size: 'lg',
            to: '/booking',
          },
        ]"
      />
    </LandingSection>

    <section class="container my-16" v-if="popularProducts">
      <div class="flex items-end justify-between">
        <h2 class="text-lg font-medium md:text-2xl">{{ $t('messages.shop.popularProducts') }}</h2>
        <NuxtLink class="text-primary" to="/products">{{ $t('messages.general.viewAll') }}</NuxtLink>
      </div>
      <ProductRow :products="popularProducts" class="grid-cols-2 md:grid-cols-4 lg:grid-cols-5 mt-8" />
    </section>
    <Reviews :reviews="reviews || []" />

    <LandingSection>
      <LandingCTA
        :ui="{
          title: 'text-3xl font-heading text-amber-400',
        }"
        title="Ready to Get Inked?"
        description="Book your appointment with Natasha today and start your tattoo journey."
        :links="[
          {
            label: 'Book Now',
            color: 'white',
            size: 'lg',
            to: '/booking',
          },
        ]"
      />
    </LandingSection>
  </Page>
</template>

<style>
#myVideo {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  z-index: -1;
}
.brand img {
  max-height: min(8vw, 120px);
  object-fit: contain;
  object-position: center;
}
</style>
