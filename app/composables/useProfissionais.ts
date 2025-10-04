import { ref, readonly } from 'vue'
import type { Especialidade } from '../../shared/types/user'
import { useSupabaseClient } from '#imports'
import { useUserStore } from '../../stores/user'

// Estado global singleton
const especialidades = ref<Especialidade[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

export function useProfissionais() {
  const supabase = useSupabaseClient()
  const userStore = useUserStore()



  const fetchEspecialidades = async () => {
    loading.value = true
    error.value = null
    try {
      const { data, error: supabaseError } = await supabase
        .from('ag_especialidade')
        .select('id, especialidade')
        .order('especialidade')
      
      if (supabaseError) {
        console.error('Erro ao buscar especialidades:', supabaseError)
        throw supabaseError
      }
      
      especialidades.value = data as Especialidade[]
    } catch (err: any) {
      console.error('Erro ao buscar especialidades:', err)
      error.value = err.message || 'Erro ao buscar especialidades'
      especialidades.value = []
    } finally {
      loading.value = false
    }
  }

  async function addEspecialidade(especialidade: string) {
    // Verificar se o usuário é admin
    if (!userStore.isAdmin) {
      return { success: false, message: 'Acesso negado. Apenas administradores podem adicionar especialidades.' }
    }
    
    try {
      const { data, error } = await (supabase as any).rpc('ag_add_especialidade', {
        _especialidade: especialidade
      })
      
      if (error) {
        console.error('Erro ao adicionar especialidade:', error)
        return { success: false, message: error.message }
      }
      
      const result = data as { success: boolean; message: string } | null
      if (!result) {
        return { success: false, message: 'Erro desconhecido' }
      }
      
      if (result.success) {
        // Força o refresh imediato da lista após a adição
        await fetchEspecialidades()
        // Garante que a reatividade seja disparada
        especialidades.value = [...especialidades.value]
      }
      
      return result
    } catch (err) {
      console.error('Erro ao adicionar especialidade:', err)
      return { success: false, message: 'Erro ao conectar com o servidor' }
    }
  }

  async function updateEspecialidade(id: number, especialidade: string) {
    // Verificar se o usuário é admin
    if (!userStore.isAdmin) {
      return { success: false, message: 'Acesso negado. Apenas administradores podem editar especialidades.' }
    }
    
    try {
      const { data, error } = await (supabase as any).rpc('ag_update_especialidade', {
        _id: id,
        _especialidade: especialidade
      })
      
      if (error) {
        console.error('Erro ao atualizar especialidade:', error)
        return { success: false, message: error.message }
      }
      
      const result = data as { success: boolean; message: string } | null
      if (!result) {
        return { success: false, message: 'Erro desconhecido' }
      }
      
      if (result.success) {
        // Força o refresh imediato da lista após a atualização
        await fetchEspecialidades()
        // Garante que a reatividade seja disparada
        especialidades.value = [...especialidades.value]
      }
      
      return result
    } catch (err) {
      console.error('Erro ao atualizar especialidade:', err)
      return { success: false, message: 'Erro ao conectar com o servidor' }
    }
  }

  async function deleteEspecialidade(id: number) {
    // Verificar se o usuário é admin
    if (!userStore.isAdmin) {
      return { success: false, message: 'Acesso negado. Apenas administradores podem deletar especialidades.' }
    }
    
    try {
      const { error } = await supabase
        .from('ag_especialidade')
        .delete()
        .eq('id', id)
      
      if (error) {
        console.error('Erro ao deletar especialidade:', error)
        return { success: false, message: error.message }
      }
      
      // Força o refresh imediato da lista após a exclusão
      await fetchEspecialidades()
      // Garante que a reatividade seja disparada
      especialidades.value = [...especialidades.value]
      
      return { success: true, message: 'Especialidade deletada com sucesso' }
    } catch (err: any) {
      console.error('Erro ao deletar especialidade:', err)
      return { success: false, message: err.message || 'Erro ao conectar com o servidor' }
    }
  }

  return {
    especialidades,
    loading: readonly(loading),
    error: readonly(error),
    fetchEspecialidades,
    addEspecialidade,
    updateEspecialidade,
    deleteEspecialidade
  }
}
