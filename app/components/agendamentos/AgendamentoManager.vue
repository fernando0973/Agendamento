<template>
  <!-- Componente AgendamentoManager - dividido em header e corpo -->
  <!-- Aqui será gerenciado todo o sistema de agendamentos -->
  <div class="p-4 rounded h-full flex flex-col">
    

    <!-- Header - altura flexível, com layout em grid para centralizar perfeitamente -->
    <div class="bg-white shadow-sm rounded mb-4 flex flex-col space-y-4">
      <!-- Primeira linha - 3 componentes principais -->
      <div class="h-[60px] grid grid-cols-3 items-center px-4 py-2">
        <!-- Controlador de semana (lado esquerdo) -->
        <div class="flex justify-start">
          <AgendamentoSemanaControlador />
        </div>
        
        <!-- Informações do Profissional (centro perfeito) -->
        <div class="flex justify-center">
          <AgendamentoProfissionalInfo />
        </div>
        
        <!-- Botão Novo Agendamento (lado direito) -->
        <div class="flex justify-end">
          <BaseButton 
            variant="primary" 
            size="md" 
            label="Novo"
            @click="novoAgendamento"
          />
        </div>
      </div>
      
      <!-- Segunda linha - Lista de dias (largura completa) -->
      <div class="w-full">
        <AgendamentoListaDias :dias-semana="diasSemana" />
      </div>
    </div>    <!-- Corpo - ocupa o restante do espaço -->
    <div class="flex-1 flex gap-4 rounded min-h-0">
      <!-- Régua de Horários (lado esquerdo) -->
      <div class="w-24 flex-shrink-0 h-full">
        <ReguaHorarios />
      </div>
      
      <!-- Área de agendamentos - grid dos 7 dias -->
      <div class="flex-1 grid grid-cols-7 h-full">
        <ItemAgendamento 
          v-for="(dia, index) in diasSemana" 
          :key="index"
          :data="dia"
        />
      </div>
    </div>
    
  </div>
</template>

<script setup lang="ts">

import AgendamentoSemanaControlador from './AgendamentoSemanaControlador.vue'
import AgendamentoProfissionalInfo from './AgendamentoProfissionalInfo.vue'
import AgendamentoListaDias from './AgendamentoListaDias.vue'
import ReguaHorarios from './ReguaHorarios.vue'
import ItemAgendamento from './ItemAgendamento.vue'
import BaseButton from '../BaseButton.vue'
import { storeToRefs } from 'pinia'
import { useAgendamentoStore } from '../../../stores/agendamento'

// Store de agendamento para obter os dias da semana
const agendamentoStore = useAgendamentoStore()
const { diasSemana } = storeToRefs(agendamentoStore)

// Função para criar novo agendamento (futuramente será expandida)
function novoAgendamento() {
  console.log('Novo agendamento clicado')
  // TODO: Implementar lógica para abrir modal ou navegar para criação
}
</script>

<style scoped>
/* Componente inicialmente sem estilos visuais */
/* O espaçamento é controlado pelo container pai (p-6) */
</style>