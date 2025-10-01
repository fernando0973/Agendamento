<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold text-neutral-900 mb-6">Especialidades</h1>
    <EspecialidadeTable 
      :especialidades="especialidades" 
      :loading="loading" 
      :error="error" 
      @adicionar="abrirModalAdicionar" 
      @editar="abrirModalEdicao" 
      @deletar="abrirModalDelete"
    />
    <EspecialidadeModal 
      v-model="showModal" 
      :isEdicao="isEdicao" 
      :id="especialidadeEditando?.id"
      :especialidadeInicial="especialidadeEditando?.especialidade"
    />
    
    <!-- Modal de Confirmação de Delete -->
    <ConfirmModal 
      v-model="showDeleteModal"
      :item-name="especialidadeDeletando?.especialidade || ''"
      :loading="deletingLoading"
      additional-info="Esta especialidade será removida permanentemente do sistema."
      @confirm="confirmarDelete"
    />
  </div>
</template>

<script setup lang="ts">
import EspecialidadeTable from '../components/EspecialidadeTable.vue'
import EspecialidadeModal from '../components/EspecialidadeModal.vue'
import ConfirmModal from '../components/ConfirmModal.vue'
import { useProfissionais } from '../composables/useProfissionais'
import { ref, onMounted } from 'vue'
import type { Especialidade } from '../../shared/types/user'

const { especialidades, loading, error, fetchEspecialidades, deleteEspecialidade } = useProfissionais()
const showModal = ref(false)
const isEdicao = ref(false)
const especialidadeEditando = ref<Especialidade | null>(null)
const showDeleteModal = ref(false)
const especialidadeDeletando = ref<Especialidade | null>(null)
const deletingLoading = ref(false)

function abrirModalEdicao(especialidade: Especialidade) {
  especialidadeEditando.value = especialidade
  isEdicao.value = true
  showModal.value = true
}

function abrirModalAdicionar() {
  especialidadeEditando.value = null
  isEdicao.value = false
  showModal.value = true
}

function abrirModalDelete(especialidade: Especialidade) {
  especialidadeDeletando.value = especialidade
  showDeleteModal.value = true
}

async function confirmarDelete() {
  if (especialidadeDeletando.value) {
    deletingLoading.value = true
    try {
      const result = await deleteEspecialidade(especialidadeDeletando.value.id)
      if (result.success) {
        showDeleteModal.value = false
        especialidadeDeletando.value = null
        // Opcional: mostrar toast de sucesso
        console.log('Especialidade excluída com sucesso!')
      } else {
        // Melhor tratamento de erro
        alert(`Erro ao excluir: ${result.message}`)
      }
    } catch (error) {
      console.error('Erro inesperado:', error)
      alert('Erro inesperado ao excluir especialidade')
    } finally {
      deletingLoading.value = false
    }
  }
}

onMounted(() => {
  fetchEspecialidades()
})

definePageMeta({
  layout: 'default'
})
</script>