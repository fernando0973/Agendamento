import { useUserStore } from '../../stores/user'

export default defineNuxtPlugin(async () => {
  try {
    const userStore = useUserStore()
    await userStore.fetchProfile()
  } catch (error) {
    console.warn('Erro ao inicializar perfil do usuário:', error)
    // Não propagar o erro para não quebrar a aplicação
  }
})