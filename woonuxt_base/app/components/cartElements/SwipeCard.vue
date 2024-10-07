<script setup lang="ts">
import { useSwipe } from '@vueuse/core';
const emit = defineEmits(['remove']);

const isAlive = ref(true);
const el = useTemplateRef('el');
const { isSwiping, lengthX } = useSwipe(el, {
  passive: true,
  onSwipeEnd() {
    if (lengthX.value > 80) {
      isAlive.value = false;
      emit('remove');
    }
  },
});
</script>

<template>
  <UCard v-if="isAlive" class="flex h-16 w-full overflow-hidden relative items-center">
    <Icon
      name="i-heroicons-trash"
      class="transform transition-all right-0 w-6 scale-0 absolute"
      :class="{ 'scale-100': lengthX > 40, 'delete-ready': lengthX > 80 }" />
    <div
      class="rounded-lg inset-0 absolute"
      :class="{ 'transition-all': !isSwiping }"
      ref="el"
      :style="{ transform: isSwiping ? `translateX(-${lengthX}px)` : `none` }">
      <slot />
    </div>
  </UCard>
</template>

<style scoped>
.underlay {
  display: flex;
  padding: 1rem;
  inset: 0;
  transition: all;
  justify-content: flex-end;
  position: absolute;
  align-items: center;
}
.delete-ready {
  color: #ef4444;
}
</style>
