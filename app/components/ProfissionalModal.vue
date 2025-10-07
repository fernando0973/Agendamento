<template>
  <BaseModal :model-value="modelValue" @update:modelValue="$emit('update:modelValue', $event)">
    <template #header>
      {{ isEdicao ? 'Editar Profissional' : 'Novo Profissional' }}
    </template>
    <form @submit.prevent="handleSubmit">
      <!-- Dropdown para selecionar o Perfil (Usuário) -->
      <div class="mb-4">
        <label class="block text-sm font-medium text-neutral-700 mb-2">
          Usuário
        </label>
        <select
          v-model="selectedProfileId"
          class="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          required
        >
          <option value="">Selecione um usuário</option>
          <option 
            v-for="profile in profiles" 
            :key="profile.id" 
            :value="profile.id"
          >
            {{ profile.nome }}
          </option>
        </select>
      </div>

      <!-- Dropdown para selecionar a Especialidade -->
      <div class="mb-4">
        <label class="block text-sm font-medium text-neutral-700 mb-2">
          Especialidade
        </label>
        <select
          v-model="selectedEspecialidadeId"
          class="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          required
        >
          <option value="">Selecione uma especialidade</option>
          <option 
            v-for="especialidade in especialidades" 
            :key="especialidade.id" 
            :value="especialidade.id"
          >
            {{ especialidade.especialidade }}
          </option>
        </select>
      </div>

      <div class="flex justify-end gap-2 mt-4">
        <BaseButton variant="secondary" @click="$emit('update:modelValue', false)">
          Cancelar
        </BaseButton>
        <BaseButton variant="primary" type="submit" :disabled="loading">
          {{ isEdicao ? 'Atualizar' : 'Adicionar' }}
        </BaseButton>
      </div>
    </form>
  </BaseModal>
</template>

<script setup lang="ts">
/**
 * Componente ProfissionalModal
 * Modal para adicionar/editar profissionais no sistema
 * Permite selecionar usuário (profile) e especialidade através de dropdowns
 */

// Importação de componentes
import BaseModal from './BaseModal.vue'
import BaseButton from './BaseButton.vue'

// Importação de composables
import { useProfissionais } from '../composables/useProfissionais'
import { useNotifications } from '../composables/useNotifications'

// Importação do Vue
import { ref, watch } from 'vue'

// Importação de tipos
import type { Especialidade, Profile, Profissional } from '../../shared/types/database'

// Props do componente
const props = defineProps<{
  modelValue: boolean
  isEdicao?: boolean
  profissional?: Profissional | null
  especialidades: Especialidade[]
  profiles: Profile[]
}>()

// Eventos emitidos
const emit = defineEmits(['update:modelValue', 'confirm'])

// Estados locais do formulário
const selectedProfileId = ref<number | ''>('')
const selectedEspecialidadeId = ref<number | ''>('')

// Composables
const { loading, addProfissional, updateProfissional } = useProfissionais()
const { showSuccess, showError } = useNotifications()

// Watcher para preencher os campos quando estiver editando
watch(() => props.profissional, (profissional) => {
  if (profissional && props.isEdicao) {
    selectedProfileId.value = profissional.profile_id
    selectedEspecialidadeId.value = profissional.especialidade_id
  } else {
    // Limpar campos quando for nova adição
    selectedProfileId.value = ''
    selectedEspecialidadeId.value = ''
  }
}, { immediate: true })

// Watcher para limpar campos quando o modal for fechado
watch(() => props.modelValue, (isOpen) => {
  if (!isOpen) {
    selectedProfileId.value = ''
    selectedEspecialidadeId.value = ''
  }
})

async function handleSubmit() {
  // Validação básica
  if (!selectedProfileId.value || !selectedEspecialidadeId.value) {
    showError('Por favor, selecione um usuário e uma especialidade')
    return
  }

  try {
    if (props.isEdicao && props.profissional) {
      // Atualizar profissional existente
      const result = await updateProfissional(
        props.profissional.profissional_id,
        Number(selectedProfileId.value),
        Number(selectedEspecialidadeId.value)
      )
      
      if (result.success) {
        showSuccess(result.message)
        // Aguarda um pequeno delay para garantir que o refresh foi processado
        await new Promise(resolve => setTimeout(resolve, 100))
        emit('update:modelValue', false)
      } else {
        showError(`Erro ao atualizar profissional: ${result.message}`)
      }
    } else {
      // Adicionar novo profissional
      const result = await addProfissional(
        Number(selectedProfileId.value), 
        Number(selectedEspecialidadeId.value)
      )
      
      if (result.success) {
        showSuccess(result.message)
        // Aguarda um pequeno delay para garantir que o refresh foi processado
        await new Promise(resolve => setTimeout(resolve, 100))
        emit('update:modelValue', false)
      } else {
        showError(`Erro ao adicionar profissional: ${result.message}`)
      }
    }
  } catch (error) {
    console.error('Erro ao salvar profissional:', error)
    showError('Erro inesperado ao salvar profissional')
  }
}
</script>