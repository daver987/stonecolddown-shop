<script setup lang="ts">
import type { PaymentGateway, PaymentGateways } from '../../types';

const props = defineProps<{
  modelValue: string | object;
  paymentGateways: PaymentGateways;
}>();

const paymentMethod = toRef(props, 'modelValue');
const activePaymentMethod = computed<PaymentGateway>(() => paymentMethod.value as PaymentGateway);
const emits = defineEmits(['update:modelValue']);

const updatePaymentMethod = (value: any) => {
  emits('update:modelValue', value);
};

onMounted(() => {
  // Emit first payment method
  if (props.paymentGateways?.nodes.length) updatePaymentMethod(props.paymentGateways?.nodes[0]);
});
</script>

<template>
  <div class="flex gap-4 leading-tight flex-wrap">
    <div
      v-for="gateway in paymentGateways?.nodes"
      :key="gateway.id"
      class="option"
      :class="{ 'active-option': gateway.id === activePaymentMethod.id }"
      @click="updatePaymentMethod(gateway)"
      :title="gateway?.description || gateway?.title || 'Payment Method'">
      <icon v-if="gateway.id === 'stripe'" name="ion:card-outline" size="20" />
      <icon v-else-if="gateway.id === 'paypal'" name="ion:logo-paypal" size="20" />
      <icon v-else name="ion:cash-outline" size="20" />
      <span class="whitespace-nowrap" v-html="gateway.title" />
      <icon name="ion:checkmark-circle" size="20" class="ml-auto text-primary checkmark opacity-0" />
    </div>
    <div v-if="activePaymentMethod.description" class="prose block w-full">
      <p class="text-sm text-gray-500" v-html="activePaymentMethod.description" />
    </div>
  </div>
</template>

<style scoped>
.option {
  background-color: white;
  border: 1px solid;
  border-radius: 0.5rem;
  color: #4b5563;
  cursor: pointer;
  display: flex;
  flex: 1;
  font-size: 0.875rem;
  padding: 0.75rem 1rem;
  gap: 0.5rem;
  align-items: center;
  transition: border-color 0.3s;
}

.option:hover {
  border-color: #d8b4fe;
}

.option.active-option {
  border-color: #3b82f6;
  cursor: default;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  pointer-events: none;
}

.option.active-option .checkmark {
  opacity: 1;
}
</style>
