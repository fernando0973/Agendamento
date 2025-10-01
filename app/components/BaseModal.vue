<template>
  <div v-if="modelValue" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
    <div class="bg-white rounded-xl shadow-xl w-full max-w-lg mx-4 animate-fade-in">
      <!-- Header -->
      <div class="flex items-center justify-between px-6 py-4 border-b border-neutral-100">
        <h3 class="text-lg font-semibold text-neutral-900">
          <slot name="header">Título do Modal</slot>
        </h3>
        <button @click="emitClose" class="text-neutral-400 hover:text-neutral-700 transition-colors">
          <span class="sr-only">Fechar</span>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <!-- Main Content -->
      <div class="px-6 py-6">
        <slot />
      </div>
      <!-- Footer -->
      <div class="flex items-center justify-end gap-2 px-6 py-4 border-t border-neutral-100">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseButton from './BaseButton.vue'
const props = defineProps<{ modelValue: boolean }>()
const emit = defineEmits(['update:modelValue', 'close'])

function emitClose() {
  emit('update:modelValue', false)
  emit('close')
}
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.2s;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: none; }
}
</style>
