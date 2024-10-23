<script setup lang="ts">
import type { Button } from '#ui/types';
import { twJoin } from 'tailwind-merge';
import type { PropType } from 'vue';

defineOptions({
  inheritAttrs: false,
});

const props = defineProps({
  headline: {
    type: String,
    default: undefined,
  },
  title: {
    type: String,
    default: undefined,
  },
  description: {
    type: String,
    default: undefined,
  },
  icon: {
    type: String,
    default: undefined,
  },
  links: {
    type: Array as PropType<(Button & { click?: () => void })[]>,
    default: () => [],
  },
  align: {
    type: String as PropType<'left' | 'center' | 'right'>,
    default: 'left',
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

const config = computed(() => {
  const container: string = twJoin('gap-8 sm:gap-y-16', props.align === 'center' ? 'flex flex-col' : 'grid lg:grid-cols-2 lg:items-center');

  const base: string = twJoin('', props.align === 'center' && 'text-center flex flex-col items-center', props.align === 'right' && 'lg:order-last');

  const links: string = twJoin('mt-8 flex flex-wrap gap-x-3 gap-y-1.5', props.align === 'center' && 'justify-center');

  return {
    wrapper: 'py-8 sm:py-12 bg-gray-950 -mt-14 md:-mt-4',
    container,
    base,
    icon: {
      wrapper: 'flex mb-4',
      base: 'w-10 h-10 flex-shrink-0 text-primary',
    },
    headline: 'mb-3 text-sm/6 font-semibold text-primary flex items-center gap-1.5',
    title: 'text-3xl font-bold font-heading tracking-tight text-gray-900 dark:text-white sm:text-4xl lg:text-5xl',
    description: 'mt-4 text-sm md:text-base text-gray-500 dark:text-gray-400 max-w-[60ch] text-balance',
    links,
  };
});

const { ui, attrs } = useUI('page.hero', toRef(props, 'ui'), config, toRef(props, 'class') as Ref<string>, true);
</script>

<template>
  <div v-bind="attrs" :class="ui.wrapper">
    <div :class="ui.container">
      <div
        v-if="icon || $slots.icon || headline || title || $slots.title || description || $slots.description || links?.length || $slots.links"
        :class="ui.base">
        <div v-if="icon || $slots.icon" :class="ui.icon.wrapper">
          <slot name="icon">
            <UIcon :name="icon as string" :class="ui.icon.base" />
          </slot>
        </div>

        <div v-if="headline || $slots.headline" :class="ui.headline">
          <slot name="headline">
            {{ headline }}
          </slot>
        </div>

        <h1 :class="ui.title">
          <slot name="title">
            {{ title }}
          </slot>
        </h1>

        <p v-if="description || $slots.description" :class="ui.description">
          <slot name="description">
            {{ description }}
          </slot>
        </p>

        <div v-if="links?.length || $slots.links" :class="ui.links">
          <slot name="links">
            <UButton v-for="(link, index) in links" v-bind="link" :key="index" @click="link.click" />
          </slot>
        </div>
      </div>

      <slot v-if="$slots.default" />
      <div v-else-if="align === 'right'" />
    </div>
  </div>
</template>
