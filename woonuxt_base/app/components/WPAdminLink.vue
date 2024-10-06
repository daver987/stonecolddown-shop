<script setup lang="ts">
const runtimeConfig = useRuntimeConfig();
const defaultClient = runtimeConfig?.public?.['graphql-client']?.clients?.default as { host: string } | undefined;

const { link } = defineProps<{ link: string }>();

const gqlEndpoint = defaultClient?.host ?? null;
const wpBase = gqlEndpoint?.replace('/graphql', '') ?? null;
const formattedLink = wpBase + link;
const linkStartsWithWpAdmin = link?.startsWith('/wp-admin') || false;
</script>

<template>
  <DevOnly>
    <ClientOnly>
      <a
        v-if="linkStartsWithWpAdmin && wpBase && link"
        :href="formattedLink"
        target="_blank"
        class="wp-admin-link"
        title="This is a dev-only link, it will not be visible in production.">
        <span class="link">
          <slot />
        </span>
        <Icon name="ion:open-outline" size="14" />
      </a>
    </ClientOnly>
  </DevOnly>
</template>

<style scoped>
.wp-admin-link {
  display: inline-flex;
  align-items: center;
  background-color: #facc15;
  line-height: 1.25;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  gap: 0.25rem;
  font-size: 0.75rem;
  color: #854d0e;
  border-bottom: 1px solid #f59e0b;
  text-transform: uppercase;
  transition: all 0.1s ease-in-out;
}

.wp-admin-link:hover {
  background-color: #f59e0b;
  border-bottom-color: #d97706;
}
</style>
