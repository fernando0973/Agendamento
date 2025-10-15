<template>
  <!-- Componente Régua de Horários -->
  <div class="h-full bg-white border border-neutral-200 rounded-lg shadow-sm">
    <!-- Lista de horários distribuída verticalmente -->
    <div class="h-full flex flex-col justify-between p-2">
      <div 
        v-for="horario in horarios" 
        :key="horario"
        class="text-xs text-neutral-600 py-2 px-1 text-center rounded hover:bg-neutral-50 transition-colors cursor-pointer flex-1 flex items-center justify-center"
      >
        {{ horario }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

// Gerar lista de horários das 8:00 às 22:00
const horarios = computed(() => {
  const listaHorarios: string[] = []
  
  for (let hora = 8; hora <= 22; hora++) {
    const horarioFormatado = `${hora.toString().padStart(2, '0')}:00`
    listaHorarios.push(horarioFormatado)
  }
  
  return listaHorarios
})
</script>