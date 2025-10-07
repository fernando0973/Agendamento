<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold text-neutral-900 mb-6">Clientes</h1>
    <TabelaClientes 
      :clientes="clientes" 
      :loading="loading" 
      :error="error" 
      @adicionar="abrirModalAdicionar" 
      @editar="abrirModalEdicao" 
      @deletar="abrirModalDelete"
    />
    
    <!-- Modal de Cliente -->
    <ClienteModal 
      v-model="showModal" 
      :isEdicao="isEdicao" 
      :clienteInicial="clienteEditando"
    />
    
    <!-- Modal de Confirmação de Delete -->
    <ConfirmModal 
      v-model="showDeleteModal"
      :item-name="clienteDeletando?.nome || ''"
      item-type="Cliente"
      :loading="deletingLoading"
      additional-info="Este cliente será removido permanentemente do sistema."
      @confirm="confirmarDelete"
    />
  </div>
</template>

<script setup lang="ts">
import TabelaClientes from '~/components/TabelaClientes.vue'
import ClienteModal from '~/components/ClienteModal.vue'
import ConfirmModal from '~/components/ConfirmModal.vue'
import { useProfissionais } from '~/composables/useProfissionais'
import { useNotifications } from '~/composables/useNotifications'
import { ref, onMounted } from 'vue'
import type { Cliente } from '../../shared/types/database'

const { clientes, loading, error, fetchClientes, addCliente, updateCliente, deleteCliente } = useProfissionais()
const { showSuccess, showError } = useNotifications()

// Estados do modal de cliente
const showModal = ref(false)
const isEdicao = ref(false)
const clienteEditando = ref<Cliente | null>(null)

// Estados do modal de confirmação de delete
const showDeleteModal = ref(false)
const clienteDeletando = ref<Cliente | null>(null)
const deletingLoading = ref(false)

function abrirModalEdicao(cliente: Cliente) {
  clienteEditando.value = cliente
  isEdicao.value = true
  showModal.value = true
}

function abrirModalAdicionar() {
  clienteEditando.value = null
  isEdicao.value = false
  showModal.value = true
}

function abrirModalDelete(cliente: Cliente) {
  clienteDeletando.value = cliente
  showDeleteModal.value = true
}

async function confirmarDelete() {
  if (clienteDeletando.value) {
    deletingLoading.value = true
    try {
      const result = await deleteCliente(clienteDeletando.value.id)
      if (result.success) {
        showSuccess('Cliente excluído com sucesso!')
        showDeleteModal.value = false
        clienteDeletando.value = null
      } else {
        showError(`Erro ao excluir cliente: ${result.message}`)
      }
    } catch (error) {
      console.error('Erro inesperado:', error)
      showError('Erro inesperado ao excluir cliente')
    } finally {
      deletingLoading.value = false
    }
  }
}

onMounted(() => {
  // Carregar a lista de clientes quando a página for montada
  fetchClientes()
})

definePageMeta({
  layout: 'default'
})
</script>