<template>
  <!-- Componente para exibir um dia individual -->
  <div class="flex flex-col items-center justify-center text-center p-3 bg-white border-r border-neutral-200 hover:bg-primary-50 transition-all duration-200 cursor-pointer min-h-[60px] last:border-r-0">
    <!-- Número do dia -->
    <span class="text-lg font-bold text-neutral-800 leading-tight">
      {{ numeroDia }}
    </span>
    <!-- Dia da semana abreviado -->
    <span class="text-xs text-neutral-600 uppercase font-medium mt-0.5 tracking-wider">
      {{ diaSemanaAbreviado }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

// Props
interface Props {
  data: Date
}

const props = defineProps<Props>()

// Número do dia
const numeroDia = computed(() => {
  return props.data.getDate()
})

// Dia da semana abreviado
const diaSemanaAbreviado = computed(() => {
  const diasSemana = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb']
  return diasSemana[props.data.getDay()]
})
</script>