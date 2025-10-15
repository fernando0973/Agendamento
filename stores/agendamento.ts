
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

// Função utilitária para obter o domingo (início da semana) a partir de uma data
function getStartOfWeek(date: Date): Date {
  const d = new Date(date)
  const day = d.getDay() // 0 = domingo, 1 = segunda, ...
  d.setDate(d.getDate() - day) // Volta até o domingo
  d.setHours(0, 0, 0, 0) // Zera horas/minutos/segundos
  return d
}

// Função utilitária para gerar um array com os 7 dias da semana a partir do domingo
function getWeekDays(start: Date): Date[] {
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(start)
    d.setDate(start.getDate() + i) // Soma i dias ao domingo
    return d
  })
}

// Store de agendamento
export const useAgendamentoStore = defineStore('agendamento', () => {
  // Data de referência (reativa), inicializada com a data atual
  const dataReferencia = ref(new Date())

  // Array reativo com os 7 dias da semana (domingo a sábado) baseado na dataReferencia
  const diasSemana = ref<Date[]>([])

  // Atualiza o array diasSemana sempre que a dataReferencia mudar
  function atualizarDiasSemana() {
    const inicioSemana = getStartOfWeek(dataReferencia.value) // Domingo da semana
    diasSemana.value = getWeekDays(inicioSemana) // Array de 7 dias
  }

  // Watch: sempre que dataReferencia mudar, atualiza os dias da semana automaticamente
  watch(dataReferencia, atualizarDiasSemana, { immediate: true })

  // Avança uma semana (soma 7 dias à data de referência)
  function avancarSemana() {
    dataReferencia.value = new Date(dataReferencia.value.getTime() + 7 * 24 * 60 * 60 * 1000)
  }

  // Volta uma semana (subtrai 7 dias da data de referência)
  function voltarSemana() {
    dataReferencia.value = new Date(dataReferencia.value.getTime() - 7 * 24 * 60 * 60 * 1000)
  }

  // Expondo os dados e funções do store
  return {
    dataReferencia, // Data central de referência
    diasSemana,     // Array de datas da semana
    avancarSemana,  // Função para avançar semana
    voltarSemana    // Função para voltar semana
  }
})
