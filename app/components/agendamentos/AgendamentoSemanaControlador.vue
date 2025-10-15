<template>
  <div class="flex flex-col items-center gap-1 h-full justify-center">
    <!-- Período da semana -->
    <span class="text-base font-semibold text-primary-700 tracking-wide">
      De {{ formatarData(inicioSemana) }} até {{ formatarData(fimSemana) }}
    </span>
    <!-- Botões de navegação -->
    <div class="flex items-center gap-2 mt-1">
      <button @click="voltarSemana" class="w-9 h-9 flex items-center justify-center rounded bg-neutral-100 hover:bg-primary-100 text-primary-700 shadow transition-colors" title="Semana anterior">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
      </button>
      <button @click="avancarSemana" class="w-9 h-9 flex items-center justify-center rounded bg-neutral-100 hover:bg-primary-100 text-primary-700 shadow transition-colors" title="Próxima semana">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useAgendamentoStore } from '../../../stores/agendamento'
import { computed } from 'vue'

const agendamentoStore = useAgendamentoStore()
const { diasSemana } = storeToRefs(agendamentoStore)
const { avancarSemana, voltarSemana } = agendamentoStore

// Computed para início e fim da semana
const inicioSemana = computed(() => diasSemana.value[0])
const fimSemana = computed(() => diasSemana.value[6])

// Função utilitária para formatar datas (dd/MM)
function formatarData(date?: Date) {
  if (!date) return ''
  return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })
}
</script>
