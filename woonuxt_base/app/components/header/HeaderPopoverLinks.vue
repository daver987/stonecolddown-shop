<script setup lang="ts">
import type { PropType } from 'vue';
import { twMerge } from 'tailwind-merge';
import { getULinkProps } from '#ui/utils';
import type { HeaderPopoverLink } from '../../types';

const appConfig = useAppConfig();

const config = computed(() => ({
  wrapper: 'p-2 space-y-1',
  base: 'block px-2 py-1.5 rounded-sm flex items-start gap-1.5',
  active: 'bg-gray-100/50 dark:bg-gray-800/50 text-primary',
  inactive: 'hover:bg-gray-100/50 dark:hover:bg-gray-800/50',
  label: 'font-semibold text-sm/6 inline-block relative',
  description: 'text-xs leading-snug text-gray-500 dark:text-gray-400 line-clamp-2',
  icon: {
    base: 'w-4 h-4 flex-shrink-0 mt-1',
  },
  externalIcon: {
    //@ts-ignore
    name: appConfig.ui.icons.external,
    base: 'w-3 h-3 absolute top-0.5 -right-3.5 text-gray-400 dark:text-gray-500',
  },
}));

defineOptions({
  inheritAttrs: false,
});

const props = defineProps({
  links: {
    type: Array as PropType<HeaderPopoverLink[]>,
    default: () => [],
  },
  class: {
    type: [String, Object, Array] as PropType<string | Record<string, unknown> | unknown[]>,
    default: undefined,
  },
  ui: {
    type: Object as PropType<Partial<typeof config.value>>,
    default: () => ({}),
  },
});

const { ui, attrs } = useUI('header.popover.links', toRef(props, 'ui'), config, toRef(props, 'class') as Ref<string>, true);
</script>

<template>
  <div v-if="links?.length" v-bind="attrs" :class="ui.wrapper">
    <ULink
      v-for="(link, index) of links"
      v-bind="getULinkProps(link)"
      :key="index"
      :class="ui.base"
      :active-class="ui.active"
      :inactive-class="ui.inactive"
      @click="link.click">
      <Icon v-if="link.icon" :name="link.icon" :class="twMerge(ui.icon.base, link.iconClass)" />

      <p :class="[link.target === '_blank' && 'pr-3']">
        <span :class="ui.label">
          {{ link.label }}

          <Icon v-if="link.target === '_blank'" :name="ui.externalIcon.name" :class="ui.externalIcon.base" />
        </span>
        <span v-if="link.description" :class="ui.description">
          {{ link.description }}
        </span>
      </p>
    </ULink>
  </div>
</template>
