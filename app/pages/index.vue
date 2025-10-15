
<template>
  <div class="p-6 flex flex-col h-full min-h-0">
    <h1 class="text-2xl font-bold text-neutral-900 mb-6">Agendamentos</h1>
    <!-- Componente AgendamentoManager para gerenciar agendamentos -->
    <div class="flex-1 min-h-0">
      <AgendamentoManager />
    </div>
  </div>
</template>

<script setup lang="ts">
import AgendamentoManager from '~/components/agendamentos/AgendamentoManager.vue'
import { useAgendamentoStore } from '../../stores/agendamento'
import { onMounted } from 'vue'

// Inicializa o store de agendamento ao montar a página
onMounted(() => {
  useAgendamentoStore()
})

definePageMeta({
  layout: 'default'
})
</script>