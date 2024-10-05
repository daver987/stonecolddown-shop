<script setup lang="ts">
interface Review {
  id: string;
  icon: string;
  quote: string;
  author: {
    name: string;
    description: string;
    avatar: {
      src: string;
      loading: string;
    };
  };
  card: boolean;
  width: string;
}

defineProps<{ reviews: Review[] }>();
</script>

<template>
  <LandingSection headline="Testimonials" title="What They're Saying">
    <PageColumns class="xl:columns-4">
      <div class="break-inside-avoid" v-for="review in reviews" :key="review.id">
        <LandingTestimonial
          class="bg-gray-100/50 dark:bg-gray-800/50"
          v-bind="review"
          :key="review.id"
          :icon="review.icon"
          :quote="review.quote"
          :author="review.author"
          :card="review.card" />
      </div>
    </PageColumns>
  </LandingSection>
</template>
