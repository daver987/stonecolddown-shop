<script setup lang="ts">
import type { PropType } from 'vue';
import { Dialog, DialogPanel, TransitionRoot, provideUseId } from '@headlessui/vue';
import { useId } from '#imports';
import { getSlotChildrenText } from '../../lib/slots';
import type { HeaderLink } from '../../types';

const appConfig = useAppConfig();

const config = computed(() => ({
  wrapper: 'bg-background/75 backdrop-blur border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50',
  container: 'flex items-center justify-between gap-3 h-[--header-height]',
  left: 'lg:flex-1 flex items-center gap-1.5',
  center: 'hidden lg:flex',
  right: 'flex items-center justify-end lg:flex-1 gap-1.5',
  logo: 'flex-shrink-0 font-bold text-xl text-gray-900 dark:text-white flex items-end gap-1.5',
  panel: {
    wrapper: 'fixed inset-0 z-50 overflow-y-auto bg-black md:hidden',
    header: 'px-4 sm:px-6',
    body: 'px-4 sm:px-6 pt-3 pb-6',
  },
  button: {
    base: 'md:hidden border-0',
    icon: {
      open: appConfig.ui.icons.menu,
      close: appConfig.ui.icons.close,
    },
  },
}));

defineOptions({
  inheritAttrs: false,
});

const props = defineProps({
  to: {
    type: String,
    default: '/',
  },
  title: {
    type: String,
    default: undefined,
  },
  links: {
    type: Array as PropType<HeaderLink[]>,
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

const route = useRoute();
const slots = useSlots();
const { isHeaderDialogOpen } = useUIState();
const { ui, attrs } = useUI('header', toRef(props, 'ui'), config, toRef(props, 'class') as Ref<string>, true);

const ariaLabel = computed(() =>
  (
    props.title ||
    (slots.title &&
      getSlotChildrenText(
        slots.title() as {
          children: string | { default?: (() => unknown) | undefined };
        }[],
      )) ||
    'Logo'
  ).trim(),
);

watch(
  () => route.fullPath,
  () => {
    isHeaderDialogOpen.value = false;
  },
);

provideUseId(() => useId() as string);
</script>

<template>
  <header v-bind="attrs" :class="ui.wrapper">
    <slot v-if="!isHeaderDialogOpen" name="top" />

    <UContainer :class="ui.container">
      <div :class="ui.left">
        <slot name="left">
          <div :class="ui.logo">
            <slot name="logo">
              {{ title || 'Stone Cold Down' }}
            </slot>
          </div>
        </slot>
      </div>

      <slot name="center">
        <HeaderLinks :links="links" :class="ui.center" />
      </slot>

      <div :class="ui.right">
        <slot name="right" />

        <slot name="panel-button" :open="isHeaderDialogOpen">
          <UButton
            v-if="links.length || $slots.panel"
            v-bind="$ui?.button?.secondary as any"
            variant="link"
            :class="ui.button.base"
            :aria-label="`${isHeaderDialogOpen ? 'Close' : 'Open'} Menu`"
            :icon="isHeaderDialogOpen ? ui.button.icon.close : ui.button.icon.open"
            @click="isHeaderDialogOpen = !isHeaderDialogOpen" />
        </slot>
      </div>
    </UContainer>

    <slot name="bottom" />

    <TransitionRoot :show="isHeaderDialogOpen" as="template">
      <Dialog as="div" @close="isHeaderDialogOpen = false">
        <DialogPanel :class="ui.panel.wrapper">
          <div :class="[ui.panel.header, ui.wrapper]">
            <div :class="ui.container">
              <div :class="ui.left">
                <slot name="left">
                  <NuxtLink :to="to" :aria-label="ariaLabel" :class="ui.logo">
                    <slot name="logo">
                      {{ title || 'Stone Cold Down' }}
                    </slot>
                  </NuxtLink>
                </slot>
              </div>

              <slot name="center" />

              <div :class="ui.right">
                <slot name="right" />

                <slot name="panel-button" :open="isHeaderDialogOpen">
                  <UButton
                    v-bind="$ui?.button?.secondary as any"
                    :class="ui.button.base"
                    :aria-label="`${isHeaderDialogOpen ? 'Close' : 'Open'} Menu`"
                    :icon="isHeaderDialogOpen ? ui.button.icon.close : ui.button.icon.open"
                    @click="isHeaderDialogOpen = !isHeaderDialogOpen" />
                </slot>
              </div>
            </div>
          </div>
          <div :class="ui.panel.body">
            <slot name="panel">
              <AsideLinks :links="links" />
            </slot>
          </div>
        </DialogPanel>
      </Dialog>
    </TransitionRoot>
  </header>
</template>
