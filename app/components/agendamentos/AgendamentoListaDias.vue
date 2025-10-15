<template>
  <!-- Componente para exibir lista de dias da semana (largura completa) -->
  <div class="w-full p-2 rounded">
    <!-- Layout com espaçador para alinhar com a régua de horários -->
    <div class="flex gap-4">
      <!-- Espaçador para alinhar com a régua de horários -->
      <div class="w-24 flex-shrink-0"></div>
      
      <!-- Grid de dias da semana -->
      <div class="flex-1 grid grid-cols-7 gap-2">
        <DiaItem 
          v-for="(dia, index) in diasSemana" 
          :key="index"
          :data="dia"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import DiaItem from './DiaItem.vue'

// Props
interface Props {
  diasSemana: Date[]
}

const props = withDefaults(defineProps<Props>(), {
  diasSemana: () => []
})
</script>