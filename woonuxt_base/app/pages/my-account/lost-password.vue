<script lang="ts" setup>
useSeoMeta({
  title: 'Reset Password | Stone Cold Down',
  description: 'Reset your Stone Cold Down account password. Securely regain access to your account and continue your tattoo journey with Natasha Smith.',
  ogTitle: 'Reset Password | Stone Cold Down',
  ogDescription: 'Forgot your password? Reset it here and regain access to your Stone Cold Down account.',
  ogImage: '/images/scd_logo.png',
  ogUrl: 'https://stonecolddown.com/my-account/lost-password',
  twitterTitle: 'Reset Password | Stone Cold Down',
  twitterDescription: "Securely reset your Stone Cold Down account password. Get back to exploring Natasha Smith's fine line tattoo art and merchandise.",
  twitterImage: '/images/scd_logo.png',
  twitterCard: 'summary',
});

definePageMeta({
  layout: 'default',
  colorMode: 'dark',
});
</script>

<template>
  <div class="container min-h-[600px]">
    <ResetPassword />
  </div>
</template>
