<script setup lang="ts">
import type { PropType } from 'vue';

const config = {
  wrapper: 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8',
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

const { ui, attrs } = useUI('page.grid', toRef(props, 'ui'), config, toRef(props, 'class') as Ref<string>, true);
</script>

<template>
  <div v-bind="attrs" :class="ui.wrapper">
    <slot />
  </div>
</template>
