
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { UserProfile } from '../shared/types/database'
import { useSupabaseClient, useSupabaseUser } from '#imports'

export const useUserStore = defineStore('user', () => {
  // Estado
  const profile = ref<UserProfile | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Getters
  const isLoggedIn = computed(() => !!profile.value)
  const userName = computed(() => profile.value?.nome || 'Usuário')
  const userRole = computed(() => profile.value?.role || 'user')
  const isAdmin = computed(() => profile.value?.role === 'admin')
  const isManager = computed(() => profile.value?.role === 'manager')

  // Actions
  const fetchProfile = async () => {
    try {
      loading.value = true
      error.value = null

      // Tentar acessar os composables diretamente
      const supabase = useSupabaseClient()
      const user = useSupabaseUser()

      if (!user.value) {
        throw new Error('Usuário não autenticado')
      }

      const { data, error: supabaseError } = await supabase
        .from('ag_profiles')
        .select('*')
        .eq('user_id', user.value.id)
        .single()

      if (supabaseError) {
        throw supabaseError
      }

      profile.value = data as UserProfile
      console.log('📝 Profile loaded in store:', profile.value)
    } catch (err) {
      console.error('Erro ao buscar perfil do usuário:', err)
      error.value = err instanceof Error ? err.message : 'Erro desconhecido'
      profile.value = null
    } finally {
      loading.value = false
    }
  }

  const clearProfile = () => {
    profile.value = null
    error.value = null
    loading.value = false
  }

  const updateProfile = async (updates: Partial<UserProfile>) => {
    try {
      loading.value = true
      error.value = null

      const supabase = useSupabaseClient()
      const user = useSupabaseUser()

      if (!user.value || !profile.value) {
        throw new Error('Usuário não autenticado ou perfil não carregado')
      }

      const { data, error: supabaseError } = await (supabase as any)
        .from('ag_profiles')
        .update(updates)
        .eq('user_id', user.value.id)
        .select()
        .single()

      if (supabaseError) {
        throw supabaseError
      }

      profile.value = data as UserProfile
    } catch (err) {
      console.error('Erro ao atualizar perfil do usuário:', err)
      error.value = err instanceof Error ? err.message : 'Erro ao atualizar perfil'
    } finally {
      loading.value = false
    }
  }

  const createProfile = async (profileData: { nome: string; role?: string }) => {
    try {
      loading.value = true
      error.value = null

      const supabase = useSupabaseClient()
      const user = useSupabaseUser()

      if (!user.value) {
        throw new Error('Usuário não autenticado')
      }

      const { data, error: supabaseError } = await (supabase as any)
        .from('ag_profiles')
        .insert({
          user_id: user.value.id,
          nome: profileData.nome,
          role: profileData.role || 'user'
        })
        .select()
        .single()

      if (supabaseError) {
        throw supabaseError
      }

      profile.value = data as UserProfile
    } catch (err) {
      console.error('Erro ao criar perfil do usuário:', err)
      error.value = err instanceof Error ? err.message : 'Erro ao criar perfil'
    } finally {
      loading.value = false
    }
  }

  return {
    // Estado (removendo readonly para evitar warnings)
    profile,
    loading,
    error,
    
    // Getters
    isLoggedIn,
    userName,
    userRole,
    isAdmin,
    isManager,
    
    // Actions
    fetchProfile,
    clearProfile,
    updateProfile,
    createProfile
  }
})