<template>
  <div class="flex flex-col items-center justify-center text-center">
    <h2 class="text-lg font-semibold text-neutral-800 leading-tight">
      {{ nomeProfissional }}
    </h2>
    <p class="text-sm text-neutral-600 mt-0.5">
      {{ especialidadeProfissional }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useProfissionais } from '../../composables/useProfissionais'
import { useUserStore } from '../../../stores/user'

// Composable para obter dados dos profissionais
const { profissionais, fetchProfissionais } = useProfissionais()

// Store do usuário para obter o profile_id
const userStore = useUserStore()

// Computed para encontrar o profissional logado ou usar o primeiro como fallback
const profissionalAtual = computed(() => {
  // Se não tiver profissionais carregados, retorna null
  if (profissionais.value.length === 0) {
    return null
  }
  
  // Se o usuário tem profile, tenta encontrar o profissional correspondente
  if (userStore.profile?.id) {
    const profissionalLogado = profissionais.value.find(
      prof => prof.profile_id === userStore.profile?.id
    )
    
    // Se encontrou o profissional logado, retorna ele
    if (profissionalLogado) {
      return profissionalLogado
    }
  }
  
  // Fallback: retorna o primeiro da lista se não encontrou o profissional logado
  return profissionais.value[0]
})

// Nome do profissional (ou fallback)
const nomeProfissional = computed(() => {
  return profissionalAtual.value?.profissional_nome || 'Carregando...'
})

// Especialidade do profissional (ou fallback)
const especialidadeProfissional = computed(() => {
  return profissionalAtual.value?.profissional_especialidade || ''
})

// Buscar dados ao montar o componente
onMounted(() => {
  fetchProfissionais()
})
</script>