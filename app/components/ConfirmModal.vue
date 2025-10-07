<template>
  <BaseModal :model-value="modelValue" @update:modelValue="$emit('update:modelValue', $event)">
    <template #header>
      <h3 class="text-lg font-semibold text-gray-900">
        Deletar {{ itemType || 'Item' }}
      </h3>
    </template>

    <div class="py-2">
      <div class="flex items-start space-x-3">
        <!-- Ícone de alerta -->
        <div class="flex-shrink-0 mt-1">
          <div class="flex items-center justify-center h-8 w-8">
            <ExclamationTriangleIcon class="h-6 w-6 text-red-500" />
          </div>
        </div>
        
        <!-- Conteúdo -->
        <div class="flex-1">
          <p class="text-sm text-gray-700 mb-2">
            Tem certeza que deseja deletar {{ itemType?.toLowerCase() || 'o item' }} <strong>'{{ itemName }}'</strong>?
          </p>
          <p class="text-sm text-gray-600">
            {{ additionalInfo || 'Esta ação não pode ser desfeita.' }}
          </p>
        </div>
      </div>
    </div>

    <template #footer>
      <div class="flex gap-2 justify-end">
        <BaseButton 
          variant="secondary" 
          @click="$emit('update:modelValue', false)"
          :disabled="loading"
          class="px-4 py-2 text-sm"
        >
          Cancelar
        </BaseButton>
        <BaseButton 
          variant="primary" 
          @click="$emit('confirm')"
          :loading="loading"
          class="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700"
        >
          {{ loading ? 'Deletando...' : 'Deletar' }}
        </BaseButton>
      </div>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import { ExclamationTriangleIcon } from '@heroicons/vue/24/outline'
import BaseModal from './BaseModal.vue'
import BaseButton from './BaseButton.vue'

defineProps<{
  modelValue: boolean
  itemName: string
  itemType?: string
  additionalInfo?: string
  loading?: boolean
}>()

defineEmits(['update:modelValue', 'confirm'])
</script>