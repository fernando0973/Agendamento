<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold text-neutral-900 mb-6">Profissionais</h1>
    <TabelaProfissionais 
      :profissionais="profissionais" 
      :loading="loading" 
      :error="error" 
      @adicionar="abrirModalAdicionar" 
      @editar="abrirModalEdicao" 
      @deletar="abrirModalDelete"
    />
    
    <!-- Modal de Profissional -->
    <ProfissionalModal 
      v-model="showModal" 
      :isEdicao="isEdicao" 
      :profissional="profissionalEditando"
      :especialidades="especialidades"
      :profiles="profiles"
    />
    
    <!-- Modal de Confirmação de Delete -->
    <ConfirmModal 
      v-model="showDeleteModal"
      :item-name="profissionalDeletando?.profissional_nome || ''"
      item-type="Profissional"
      :loading="deletingLoading"
      additional-info="Este profissional será removido permanentemente do sistema."
      @confirm="confirmarDelete"
    />
  </div>
</template>

<script setup lang="ts">
import TabelaProfissionais from '~/components/TabelaProfissionais.vue'
import ProfissionalModal from '~/components/ProfissionalModal.vue'
import ConfirmModal from '~/components/ConfirmModal.vue'
import { useProfissionais } from '~/composables/useProfissionais'
import { useNotifications } from '~/composables/useNotifications'
import { useUserStore } from '../../stores/user'
import { ref, onMounted } from 'vue'
import type { Profissional } from '../../shared/types/database'

const { 
  profissionais, 
  especialidades, 
  profiles, 
  loading, 
  error, 
  fetchProfissionais, 
  fetchEspecialidades, 
  fetchProfiles,
  deleteProfissional 
} = useProfissionais()
const { showSuccess, showError } = useNotifications()
const userStore = useUserStore()

// Estados do modal
const showModal = ref(false)
const isEdicao = ref(false)
const profissionalEditando = ref<Profissional | null>(null)
const showDeleteModal = ref(false)
const profissionalDeletando = ref<Profissional | null>(null)
const deletingLoading = ref(false)

function abrirModalEdicao(profissional: Profissional) {
  profissionalEditando.value = profissional
  isEdicao.value = true
  showModal.value = true
}

function abrirModalAdicionar() {
  profissionalEditando.value = null
  isEdicao.value = false
  showModal.value = true
}

function abrirModalDelete(profissional: Profissional) {
  profissionalDeletando.value = profissional
  showDeleteModal.value = true
}

async function confirmarDelete() {
  if (profissionalDeletando.value) {
    deletingLoading.value = true
    try {
      const result = await deleteProfissional(profissionalDeletando.value.profissional_id)
      if (result.success) {
        showSuccess('Profissional excluído com sucesso!')
        showDeleteModal.value = false
        profissionalDeletando.value = null
      } else {
        showError(`Erro ao excluir profissional: ${result.message}`)
      }
    } catch (error) {
      console.error('Erro inesperado:', error)
      showError('Erro inesperado ao excluir profissional')
    } finally {
      deletingLoading.value = false
    }
  }
}

onMounted(async () => {
  // O middleware já garantiu que o perfil está carregado
  // Carrega todas as informações necessárias para o modal
  await Promise.all([
    fetchProfissionais(),    // Lista de profissionais
    fetchEspecialidades(),   // Lista de especialidades para o dropdown
    fetchProfiles()          // Lista de profiles para o dropdown
  ])
})

definePageMeta({
  layout: 'default'
})
</script>