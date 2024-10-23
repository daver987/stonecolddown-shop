<script setup lang="ts">
useSeoMeta({
  title: 'Contact Natasha Smith | Stone Cold Down',
  description:
    "Get in touch with Natasha Smith, Toronto's premier female tattoo artist specializing in fine line black and grey tattoos. Book your appointment or ask questions about custom designs.",
  ogTitle: 'Contact Natasha Smith | Stone Cold Down',
  ogDescription: 'Reach out to Natasha Smith for tattoo inquiries, bookings, or questions about her fine line black and grey tattoo designs.',
  ogImage: '/images/scd_logo.png',
  ogUrl: 'https://stonecolddown.com/contact',
  twitterTitle: 'Contact Natasha Smith | Stone Cold Down',
  twitterDescription:
    'Connect with Natasha Smith for tattoo appointments, custom designs, or any questions about her fine line black and grey tattoo artistry.',
  twitterImage: '/images/scd_logo.png',
  twitterCard: 'summary',
});

definePageMeta({
  layout: 'default',
  colorMode: 'dark',
});

useHead({
  htmlAttrs: {
    lang: 'en',
  },
  link: [
    {
      rel: 'icon',
      type: 'image/png',
      href: '/favicon.ico',
    },
  ],
});
</script>

<template>
  <Page>
    <PageHero
      align="center"
      headline="Get in Touch"
      title="Contact Natasha"
      description="Have questions or ready to start your tattoo journey? Reach out to and let's bring your vision to life." />
    <PageBody>
      <UContainer>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="space-y-6">
            <h2 class="text-2xl font-heading text-primary-400">Contact Information</h2>
            <p class="text-gray-300 text-balance">Feel free to reach out with any questions about custom designs, appointments, or our services.</p>
            <div class="space-y-4">
              <div class="flex items-center space-x-3">
                <Icon class="text-primary-400" name="i-heroicons-map-pin" />
                <span>123 Tattoo Street, Toronto, ON M5V 2L7</span>
              </div>
              <div class="flex items-center space-x-3">
                <Icon class="text-primary-400" name="i-heroicons-phone" />
                <span>(123) 456-7890</span>
              </div>
              <div class="flex items-center space-x-3">
                <Icon class="text-primary-400" name="i-heroicons-envelope" />
                <span>info@stonecolddown.com</span>
              </div>
            </div>
            <div class="pt-6">
              <h3 class="text-xl font-heading text-primary-400 mb-4">Socials</h3>
              <div class="flex space-x-4">
                <UButton color="white" variant="ghost" icon="i-simple-icons-instagram" />
                <UButton color="white" variant="ghost" icon="i-simple-icons-facebook" />
                <UButton color="white" variant="ghost" icon="i-simple-icons-twitter" />
              </div>
            </div>
          </div>
          <div class="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 class="text-3xl font-heading text-primary-400 mb-6">Send Me a Message</h2>
            <ContactForm />
          </div>
        </div>
      </UContainer>
    </PageBody>
  </Page>
</template>
