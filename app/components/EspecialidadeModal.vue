<template>
  <BaseModal :model-value="modelValue" @update:modelValue="$emit('update:modelValue', $event)">
    <template #header>
      {{ isEdicao ? 'Editar Especialidade' : 'Nova Especialidade' }}
    </template>
    <form @submit.prevent="handleSubmit">
      <BaseInput
        :model-value="especialidade"
        @update:modelValue="especialidade = String($event)"
        label="Especialidade"
        placeholder="Digite o nome da especialidade"
        required
        class="mb-4"
      />
      <div class="flex justify-end gap-2 mt-4">
        <BaseButton variant="secondary" @click="$emit('update:modelValue', false)">Cancelar</BaseButton>
        <BaseButton variant="primary" type="submit">{{ isEdicao ? 'Salvar' : 'Adicionar' }}</BaseButton>
      </div>
    </form>
  </BaseModal>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import BaseModal from './BaseModal.vue'
import BaseButton from './BaseButton.vue'
import BaseInput from './BaseInput.vue'
import { useProfissionais } from '../composables/useProfissionais'

const props = defineProps<{
  modelValue: boolean
  isEdicao?: boolean
  id?: number
  especialidadeInicial?: string
}>()
const emit = defineEmits(['update:modelValue', 'confirm'])

const especialidade = ref(props.especialidadeInicial || '')
const { addEspecialidade, updateEspecialidade, loading } = useProfissionais()

watch(() => props.especialidadeInicial, (val) => {
  if (val !== undefined) especialidade.value = val
})

async function handleSubmit() {
  if (props.isEdicao && props.id) {
    const result = await updateEspecialidade(props.id, especialidade.value)
    if (result.success) {
      // Aguarda um pequeno delay para garantir que o refresh foi processado
      await new Promise(resolve => setTimeout(resolve, 100))
      especialidade.value = ''
      emit('update:modelValue', false)
    } else {
      // Pode exibir erro se desejar
      // alert(result.message)
    }
  } else {
    const result = await addEspecialidade(especialidade.value)
    if (result.success) {
      // Aguarda um pequeno delay para garantir que o refresh foi processado  
      await new Promise(resolve => setTimeout(resolve, 100))
      especialidade.value = ''
      emit('update:modelValue', false)
    } else {
      // Pode exibir erro se desejar
      // alert(result.message)
    }
  }
}
</script>
