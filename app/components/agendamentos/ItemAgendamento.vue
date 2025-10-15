<template>
  <!-- Componente para exibir slots de agendamento de um dia -->
  <div class="h-full bg-white border-r border-neutral-200 last:border-r-0 p-2">
    <h4 class="text-xs font-semibold text-neutral-700 mb-2 text-center">
      {{ formatarDia(data) }}
    </h4>
    
    <!-- Lista de slots de agendamento (placeholder por enquanto) -->
    <div class="space-y-1">
      <div class="text-xs text-neutral-500 p-1 bg-neutral-50 rounded">
        Slot 08:00
      </div>
      <div class="text-xs text-neutral-500 p-1 bg-neutral-50 rounded">
        Slot 09:00
      </div>
      <div class="text-xs text-neutral-500 p-1 bg-neutral-50 rounded">
        Slot 10:00
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Props
interface Props {
  data: Date
}

const props = defineProps<Props>()

// Função para formatar data (apenas dd/MM)
function formatarDia(date: Date) {
  return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })
}
</script>