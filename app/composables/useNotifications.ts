import { useToast } from 'vue-toastification'

export function useNotifications() {
  const toast = useToast()

  const showSuccess = (message: string, options?: any) => {
    toast.success(message, {
      icon: '✅',
      ...options
    })
  }

  const showError = (message: string, options?: any) => {
    toast.error(message, {
      icon: '❌',
      ...options
    })
  }

  const showWarning = (message: string, options?: any) => {
    toast.warning(message, {
      icon: '⚠️',
      ...options
    })
  }

  const showInfo = (message: string, options?: any) => {
    toast.info(message, {
      icon: 'ℹ️',
      ...options
    })
  }

  const showCustom = (message: string, options?: any) => {
    toast(message, options)
  }

  // Métodos específicos para o contexto de agendamento
  const showAgendamentoSuccess = (clienteName: string, date: string) => {
    showSuccess(`Agendamento confirmado para ${clienteName} em ${date}`)
  }

  const showAgendamentoCanceled = (clienteName: string) => {
    showWarning(`Agendamento de ${clienteName} foi cancelado`)
  }

  const showAgendamentoError = (error: string) => {
    showError(`Erro no agendamento: ${error}`)
  }

  const showSaveSuccess = () => {
    showSuccess('Dados salvos com sucesso!')
  }

  const showValidationError = (field: string) => {
    showError(`Por favor, verifique o campo: ${field}`)
  }

  return {
    // Métodos básicos
    showSuccess,
    showError,
    showWarning,
    showInfo,
    showCustom,
    
    // Métodos específicos do contexto
    showAgendamentoSuccess,
    showAgendamentoCanceled,
    showAgendamentoError,
    showSaveSuccess,
    showValidationError
  }
}