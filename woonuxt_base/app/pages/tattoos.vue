<script setup lang="ts">
import type { ButtonColor, ButtonSize, ButtonVariant } from '#ui/types';

definePageMeta({
  layout: 'default',
});

useSeoMeta({
  title: 'Custom Tattoos | Natasha Smith',
  description: 'Explore custom tattoo designs by Natasha Smith. Get a unique, personalized tattoo that tells your story.',
  ogTitle: 'Custom Tattoos | Natasha Smith',
  ogDescription: "Discover the art of custom tattoos by Natasha Smith. Work with her to create a unique design that's perfect for you.",
  ogImage: '/images/scd_logo.jpg',
  ogUrl: 'https://stonecolddown.com/tattoos',
  twitterTitle: 'Custom Tattoos | Natasha Smith',
  twitterDescription: 'Create your perfect tattoo with Natasha Smith. Personalized designs that bring your vision to life.',
  twitterImage: '/images/scd_logo.jpg',
  twitterCard: 'summary',
});

const customTattooInfo = {
  headline: 'Custom Designs',
  title: 'Your Vision, My Artistry',
  description: `As an independent tattoo artist, I specialize in bringing your unique tattoo ideas to life. Whether you have a specific design in mind or need help developing your concept, I'll work closely with you to create a custom tattoo that perfectly captures your vision and personality.`,
  align: 'left' as const,
  links: [
    {
      label: 'Book a Consultation',
      color: 'primary' as ButtonColor,
      size: 'lg' as ButtonSize,
      variant: 'outline' as ButtonVariant,
      to: '/booking',
    },
  ],
};

const processSteps = [
  {
    title: 'Initial Consultation',
    description: "We'll discuss your ideas, placement, and size preferences in detail.",
  },
  {
    title: 'Design Development',
    description: "I'll create a custom design based on our discussion and your vision.",
  },
  {
    title: 'Refinement',
    description: "We'll review and refine the design until you're completely satisfied.",
  },
  {
    title: 'Tattooing Session',
    description: "I'll bring your custom design to life in a professional, comfortable environment.",
  },
];

const galleryImages = [
  'https://res.cloudinary.com/dks0sw9qh/image/upload/f_auto,q_auto/v1/stonecolddown/Portfolio/portfolio_28',
  'https://res.cloudinary.com/dks0sw9qh/image/upload/v1722137881/stonecolddown/Portfolio/portfolio_10.jpg',
  'https://res.cloudinary.com/dks0sw9qh/image/upload/v1722137912/stonecolddown/Portfolio/portfolio_02.jpg',
];
</script>

<template>
  <Page>
    <PageHero
      align="center"
      headline="Custom Tattoos"
      title="Unique Designs, Tailored for You"
      description="Experience the artistry of personalized tattoos by Natasha Smith." />

    <PageBody>
      <UContainer>
        <!-- Custom Tattoo Information Section -->
        <LandingSection
          :headline="customTattooInfo.headline"
          :title="customTattooInfo.title"
          :description="customTattooInfo.description"
          :align="customTattooInfo.align"
          :links="customTattooInfo.links"
          :ui="{
            title: 'text-3xl font-heading',
            headline: 'text-lg font-thin text-white',
            description: 'text-base',
          }">
          <NuxtImg
            class="w-full rounded-md shadow-xl ring-1 ring-gray-300 dark:ring-gray-700"
            src="https://res.cloudinary.com/dks0sw9qh/image/upload/f_auto,q_auto/v1/stonecolddown/Portfolio/portfolio_28"
            alt="Custom Tattoo Design Process" />
        </LandingSection>

        <!-- Custom Tattoo Process Section -->
        <LandingSection headline="My Process" title="From Concept to Creation">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-gray-800 p-6 rounded-lg" v-for="(step, index) in processSteps" :key="index">
              <h3 class="text-xl font-semibold mb-2">{{ index + 1 }}. {{ step.title }}</h3>
              <p>{{ step.description }}</p>
            </div>
          </div>
        </LandingSection>

        <!-- Gallery Section -->
        <LandingSection headline="Gallery" title="My Custom Tattoo Showcase">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <NuxtImg
              class="w-full h-64 object-cover rounded-lg"
              v-for="(image, index) in galleryImages"
              :key="index"
              :src="image"
              :alt="`Custom Tattoo ${index + 1}`" />
          </div>
        </LandingSection>

        <!-- Call to Action Section -->
        <LandingSection>
          <LandingCTA
            :ui="{
              title: 'text-3xl font-heading text-amber-400',
            }"
            title="Ready to Create Your Custom Tattoo?"
            description="Book a consultation with me and start your journey to a unique, personalized tattoo."
            :links="[
              {
                label: 'Book a Consultation',
                color: 'white',
                size: 'lg',
                to: '/booking',
              },
            ]" />
        </LandingSection>
      </UContainer>
    </PageBody>
  </Page>
</template>
