<script setup lang="ts">
import type { ButtonSize, ButtonColor, ButtonVariant } from '#ui/types';
import type { Review } from '../types';

useSeoMeta({
  title: 'About Natasha Smith | Stone Cold Down',
  description:
    "Learn about Natasha Smith, Toronto's premier female tattoo artist specializing in fine line black and grey tattoos. Discover her journey and passion for tattoo artistry.",
  ogTitle: 'About Natasha Smith | Stone Cold Down',
  ogDescription:
    'Explore the story of Natasha Smith, a talented tattoo artist at Stone Cold Down. Learn about her journey and passion for creating unique, personalized tattoos.',
  ogImage: '/images/scd_logo.png',
  ogUrl: 'https://stonecolddown.com/about',
  twitterTitle: 'About Natasha Smith | Stone Cold Down',
  twitterDescription: 'Discover the journey of Natasha Smith, a premier tattoo artist specializing in fine line black and grey tattoos at Stone Cold Down.',
  twitterImage: '/images/scd_logo.png',
  twitterCard: 'summary',
});

definePageMeta({
  layout: 'default',
  colorMode: 'dark',
});

const bio = {
  headline: 'About Me',
  title: 'Natasha Smith',
  description: `
    As a renowned fine line black and grey tattoo artist, I've overcome significant adversity to become one of the most sought-after artists in Toronto. My journey is a testament to resilience and dedication to the craft of tattooing.
    
    Specializing in intricate designs, I transform my clients' visions into stunning tattoos that are both personal and artistic. My attention to detail and passion for creating unique pieces make me a go-to artist for those looking to express themselves through body art.
  `,
  align: 'left' as 'left' | 'center' | 'right' | undefined,
  links: [
    {
      label: 'Book a Session',
      color: 'primary' as ButtonColor,
      size: 'md' as ButtonSize,
      variant: 'outline' as ButtonVariant,
    },
  ],
};

const { data: reviews } = await useFetch<Review[]>('/api/reviews', {
  key: 'reviews',
  headers: {
    Accept: 'application/json',
  },
  method: 'GET',
});
if (reviews) {
  console.log(reviews.value);
}
</script>

<template>
  <Page>
    <PageHero
      align="center"
      headline="My Story"
      title="Welcome to Stone Cold Down"
      description="From humble beginnings to becoming one of Toronto's premier tattoo artists, I'm dedicated to bringing your vision to life through my passion for fine line black and grey tattoos." />
    <PageBody>
      <!-- Bio Overview Section -->
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
          links: 'bg-transparent border-1 border-primary-400 hover:bg-primary/10 hover:text-white hover:border-primary-400 w-16 rounded-none',
        }">
        <NuxtImg class="w-full rounded-md shadow-xl ring-1 ring-gray-300 dark:ring-gray-700" src="https://placehold.co/600x400" />
      </LandingSection>

      <!-- Call to Action Section -->
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
          ]" />
      </LandingSection>

      <Reviews :reviews="reviews ?? []" />
    </PageBody>
  </Page>
</template>

<style scoped>
.hero {
  position: relative;
  height: 100vh;
  background: url('https://placehold.co/1920x1080') no-repeat center center;
  background-size: cover;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-title {
  color: white;
  font-size: 3rem;
  font-weight: bold;
}
</style>
