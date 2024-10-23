<script setup lang="ts">
import type { PropType } from 'vue';
import type { NavigationTree, NavigationGroup } from '../../types';

const config = {
  wrapper: 'space-y-3',
};

defineOptions({
  inheritAttrs: false,
});

const props = defineProps({
  level: {
    type: Number,
    default: 0,
  },
  links: {
    type: Array as PropType<NavigationTree[]>,
    default: () => [],
  },
  multiple: {
    type: Boolean,
    default: true,
  },
  defaultOpen: {
    type: [Boolean, Number],
    default: undefined,
  },
  class: {
    type: [String, Object, Array] as PropType<string | Record<string, unknown> | string[]>,
    default: undefined,
  },
  ui: {
    type: Object as PropType<Partial<typeof config>>,
    default: () => ({}),
  },
});

const { ui, attrs } = useUI('navigation.tree', toRef(props, 'ui'), config, toRef(props, 'class') as Ref<string>, true);

const groups = computed<NavigationGroup[]>(() => {
  const groups: NavigationGroup[] = [];

  let group: NavigationGroup = { type: undefined, children: [] };

  for (const link of props.links) {
    const type = link.children?.length ? 'accordion' : 'link';
    if (!group.type) {
      group.type = type;
    }

    if (group.type === type) {
      group.children.push(link);
    } else {
      groups.push(group);
      group = { type, children: [link] };
    }
  }

  if (group.children.length) {
    groups.push(group);
  }

  return groups;
});
</script>

<template>
  <nav v-if="groups?.length" v-bind="attrs" :class="ui.wrapper">
    <template v-for="(group, index) in groups" :key="index">
      <UNavigationAccordion v-if="group.type === 'accordion'" :links="group.children" :level="level" :multiple="multiple" :default-open="defaultOpen" />
      <UNavigationLinks v-else :links="group.children" :level="level" />
    </template>
  </nav>
</template>
