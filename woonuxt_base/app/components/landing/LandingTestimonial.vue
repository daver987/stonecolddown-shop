<script setup lang="ts">
import type { PropType } from 'vue';
import { getNuxtLinkProps } from '#ui/utils';
import type { Avatar } from '#ui/types';
import type { card as cardConfig } from '#ui/ui.config';
import { NuxtLink } from '#components';
import type { NuxtLinkProps } from '#app';

defineOptions({
  inheritAttrs: false,
});

const props = defineProps({
  icon: {
    type: String,
    default: undefined,
  },
  quote: {
    type: String,
    required: true,
  },
  author: {
    type: Object as PropType<
      {
        name: string;
        description?: string;
        avatar?: Avatar;
      } & NuxtLinkProps
    >,
    default: undefined,
  },
  card: {
    type: Boolean,
    default: true,
  },
  class: {
    type: [String, Object, Array] as PropType<string | Record<string, string> | string[]>,
    default: undefined,
  },
  ui: {
    type: Object as PropType<Partial<typeof config.value & typeof cardConfig>>,
    default: () => ({}),
  },
});

const config = computed(
  (): {
    author: {
      wrapper: string;
      name: string;
      description: string;
      avatar: {
        base: string;
        size: 'md';
      };
    };
    body: {
      base: string;
      padding: string | undefined;
    };
    wrapper: string;
    quote: string;
    icon: {
      wrapper: string;
      base: string;
    };
  } => {
    const card: Record<string, string> = {};

    if (!props.card) {
      card.ring = '';
      card.rounded = '';
      card.background = '';
      card.shadow = '';
      card.divide = '';
    }

    const padding: string | undefined = props.card ? undefined : '';

    return {
      ...card,
      body: {
        base: 'flex flex-col',
        padding,
      },
      wrapper: 'relative',
      quote: 'text-gray-600 dark:text-gray-300 text-sm',
      icon: {
        wrapper: 'mb-6 flex',
        base: 'w-8 h-8 flex-shrink-0 text-gray-900 dark:text-white',
      },
      author: {
        wrapper: 'flex items-center gap-3 mt-6 relative',
        name: 'font-semibold text-gray-900 dark:text-white text-sm',
        description: 'text-gray-500 dark:text-gray-400 text-sm',
        avatar: {
          base: '',
          size: 'md' as const,
        },
      },
    };
  },
);

const { ui, attrs } = useUI('landing.testimonial', toRef(props, 'ui'), config, toRef(props, 'class') as Ref<string>, true);
</script>

<template>
  <UCard v-bind="attrs" :class="ui.wrapper" :ui="ui">
    <div>
      <div v-if="icon || $slots.icon" :class="ui.icon.wrapper">
        <slot name="icon">
          <UIcon :name="icon as string" :class="ui.icon.base" />
        </slot>
      </div>

      <q v-if="quote || $slots.quote" :class="ui.quote">
        <slot name="quote">
          {{ quote }}
        </slot>
      </q>

      <div v-if="author" :class="ui.author.wrapper">
        <UAvatar v-if="author.avatar" v-bind="{ size: ui.author.avatar.size, ...author.avatar }" :alt="author.name" :class="ui.author.avatar.base" />

        <div>
          <NuxtLink class="focus:outline-none" v-if="author.to" v-bind="getNuxtLinkProps(author)" :aria-label="author.name" tabindex="-1">
            <span class="absolute inset-0" aria-hidden="true" />
          </NuxtLink>

          <p :class="ui.author.name">
            {{ author.name }}
          </p>
          <p :class="ui.author.description">
            {{ author.description }}
          </p>
        </div>
      </div>
    </div>
  </UCard>
</template>
