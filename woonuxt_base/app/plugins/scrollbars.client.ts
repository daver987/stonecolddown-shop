export default defineNuxtPlugin(() => {
  if (navigator?.userAgent?.match(/Win[a-z0-9]*;/)) {
    document.documentElement.classList.add('nuxt-ui-scrollbars');
  }
});
