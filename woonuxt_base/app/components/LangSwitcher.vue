<script setup lang="ts">
const { locales, locale, setLocaleCookie } = useI18n();

watch(locale, (newLocale) => {
  if (newLocale) setLocaleCookie(newLocale);
});

const options = locales.value.map((locale) => ({
  key: locale.code,
  value: locale.code,
  html: locale.name,
}));
</script>

<template>
  <USelect v-model="locale" :options="options" aria-label="Language switcher" />
</template>
