<template>
  <LandingSection class="h-screen">
    <video id="myVideo" autoplay muted loop playsinline>
      <source src="https://res.cloudinary.com/dks0sw9qh/video/upload/v1712535080/stonecolddown/videos/reb9bueogbxldd09o2gc.mp4" type="video/mp4" />
    </video>
    <div class="absolute inset-0 bg-black bg-opacity-10" />
    <UContainer class="mt-10 relative h-full flex flex-col justify-center items-center text-center">
      <h1 class="font-heading text-5xl text-primary-400 mb-8">Stone Cold Down</h1>
      <p class="font-serif text-2xl">by</p>
      <!-- This is an image of Natasha's signature it says Natasha Smith -->
      <NuxtImg class="w-full max-w-xl mb-2" src="/images/scd_signature_white.svg" />
      <p class="text-sm font-thin mb-10">Discover The Beauty of Black and Grey Fine-Line Tattoos</p>
      <UButton class="rounded-none uppercase text-sm font-thin" size="xl" variant="outline" to="/booking"> Book An Appointment </UButton>
    </UContainer>
  </LandingSection>
</template>
