<script setup lang="ts">
import { useSeoMeta } from '#imports';

useSeoMeta({
  title: 'My Wishlist | Stone Cold Down',
  description: 'View and manage your wishlist of favorite tattoo designs and merchandise from Stone Cold Down.',
  ogTitle: 'My Wishlist | Stone Cold Down',
  ogDescription: 'Keep track of your favorite tattoo designs and merchandise from Stone Cold Down. Easy access to your personal wishlist.',
  ogImage: '/images/scd_logo.png',
  ogUrl: 'https://stonecolddown.com/wishlist',
  twitterTitle: 'My Wishlist | Stone Cold Down',
  twitterDescription: 'Manage your wishlist of favorite items from Stone Cold Down. Save designs and merchandise for later.',
  twitterImage: '/images/scd_logo.png',
  twitterCard: 'summary',
});

definePageMeta({
  layout: 'default',
  colorMode: 'dark',
});
</script>

<template>
  <WishList />
</template>
