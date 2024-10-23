<script setup lang="ts">
import type { PropType } from 'vue';

const config = {
  wrapper: 'mt-8 pb-24',
  prose: 'prose prose-primary dark:prose-invert max-w-none',
};

defineOptions({
  inheritAttrs: false,
});

const props = defineProps({
  prose: {
    type: Boolean,
    default: false,
  },
  class: {
    type: [String, Object, Array] as PropType<string | Record<string, unknown> | unknown[]>,
    default: undefined,
  },
  ui: {
    type: Object as PropType<Partial<typeof config>>,
    default: () => ({}),
  },
});

const { ui, attrs } = useUI('page.body', toRef(props, 'ui'), config, toRef(props, 'class') as Ref<string>, true);
</script>

<template>
  <div v-bind="attrs" :class="[ui.wrapper, prose && ui.prose]">
    <slot />
  </div>
</template>
