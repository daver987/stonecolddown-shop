<script setup lang="ts">
import type { PropType } from 'vue';

const config = {
  wrapper: 'min-h-[calc(100vh-var(--header-height))]',
};

defineOptions({
  inheritAttrs: false,
});

const props = defineProps({
  class: {
    type: [String, Object, Array] as PropType<string | Record<string, unknown> | unknown[]>,
    default: undefined,
  },
  ui: {
    type: Object as PropType<Partial<typeof config>>,
    default: () => ({}),
  },
});

const { ui, attrs } = useUI('main', toRef(props, 'ui'), config, toRef(props, 'class') as Ref<string>, true);
</script>

<template>
  <main v-bind="attrs" :class="ui.wrapper">
    <slot />
  </main>
</template>
