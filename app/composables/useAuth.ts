import { useUserStore } from '../../stores/user'

export const useAuth = () => {
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()
  const userStore = useUserStore()
  
  // Loading states
  const isLoading = ref(false)
  const isLoggingOut = ref(false)

  /**
   * Realiza login com email e senha
   */
  const login = async (email: string, password: string) => {
    try {
      isLoading.value = true
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) {
        // Traduzir mensagens de erro comuns para português
        let errorMessage = error.message
        
        if (error.message === 'Invalid login credentials') {
          errorMessage = 'Email ou senha incorretos. Verifique suas credenciais.'
        } else if (error.message === 'Email not confirmed') {
          errorMessage = 'Email não confirmado. Verifique sua caixa de entrada.'
        } else if (error.message === 'Too many requests') {
          errorMessage = 'Muitas tentativas. Tente novamente em alguns minutos.'
        }
        
        throw new Error(errorMessage)
      }

      // Aguardar um pouco antes de redirecionar para garantir que o estado foi atualizado
      await nextTick()
      
      // Carregar perfil do usuário após login bem-sucedido
      console.log('🔄 Login bem-sucedido, carregando perfil do usuário...')
      try {
        await userStore.fetchProfile()
        console.log('✅ Perfil carregado após login:', userStore.profile)
      } catch (profileError) {
        console.error('❌ Erro ao carregar perfil após login:', profileError)
        // Não bloquear o login por erro no perfil
      }
      
      // Redirecionar para a página inicial após login bem-sucedido
      await navigateTo('/')
      
      return { data, error: null }
    } catch (error: any) {
      console.error('Erro no login:', error)
      return { 
        data: null, 
        error: error.message || 'Erro ao fazer login' 
      }
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Realiza logout do usuário
   */
  const logout = async () => {
    try {
      isLoggingOut.value = true
      
      const { error } = await supabase.auth.signOut()
      
      if (error) {
        throw error
      }

      // Limpar perfil do usuário
      console.log('🧹 Logout realizado, limpando perfil do usuário...')
      userStore.clearProfile()

      // Aguardar um pouco antes de redirecionar
      await nextTick()
      
      // Redirecionar para página de login após logout
      await navigateTo('/login')
      
      return { error: null }
    } catch (error: any) {
      console.error('Erro no logout:', error)
      return { 
        error: error.message || 'Erro ao fazer logout' 
      }
    } finally {
      isLoggingOut.value = false
    }
  }

  /**
   * Registra um novo usuário
   */
  const signUp = async (email: string, password: string) => {
    try {
      isLoading.value = true
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password
      })

      if (error) {
        throw error
      }

      return { data, error: null }
    } catch (error: any) {
      console.error('Erro no cadastro:', error)
      return { 
        data: null, 
        error: error.message || 'Erro ao criar conta' 
      }
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Solicita reset de senha
   */
  const resetPassword = async (email: string) => {
    try {
      isLoading.value = true
      
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      })

      if (error) {
        throw error
      }

      return { data, error: null }
    } catch (error: any) {
      console.error('Erro ao solicitar reset de senha:', error)
      return { 
        data: null, 
        error: error.message || 'Erro ao solicitar reset de senha' 
      }
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Verifica se o usuário está autenticado
   */
  const isAuthenticated = computed(() => !!user.value)

  return {
    // State
    user: readonly(user),
    isLoading: readonly(isLoading),
    isLoggingOut: readonly(isLoggingOut),
    isAuthenticated,
    
    // Actions
    login,
    logout,
    signUp,
    resetPassword
  }
}