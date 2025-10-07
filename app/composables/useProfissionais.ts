/**
 * Composable useProfissionais
 * Gerencia o estado e operações relacionadas a profissionais, especialidades e profiles
 * Centraliza a lógica de CRUD e comunicação com o Supabase
 */

// Importações do Vue
import { ref, readonly } from 'vue'

// Importação de tipos
import type { Especialidade, Profissional, Profile, Cliente } from '../../shared/types/database'

// Importações do Nuxt/Supabase
import { useSupabaseClient } from '#imports'

// Importação de stores
import { useUserStore } from '../../stores/user'

// Estado global singleton - compartilhado entre todas as instâncias do composable
const especialidades = ref<Especialidade[]>([])  // Lista de especialidades médicas
const profissionais = ref<Profissional[]>([])    // Lista de profissionais com suas especialidades
const profiles = ref<Profile[]>([])              // Lista de perfis de usuários (apenas para admins)
const clientes = ref<Cliente[]>([])              // Lista de clientes
const loading = ref(false)                       // Estado de carregamento global
const error = ref<string | null>(null)          // Estado de erro global

export function useProfissionais() {
  // Cliente do Supabase para operações de banco de dados
  const supabase = useSupabaseClient()
  
  // Store do usuário para verificações de permissão
  const userStore = useUserStore()

  /**
   * Busca todas as especialidades médicas do banco de dados
   * Ordena por nome da especialidade
   * Atualiza o estado global de especialidades
   */
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

  /**
   * Busca todos os profissionais com suas especialidades
   * Utiliza RPC (stored procedure) para otimizar a consulta
   * Atualiza o estado global de profissionais
   */
  const fetchProfissionais = async () => {
    loading.value = true
    error.value = null
    try {
      const { data, error: supabaseError } = await supabase
        .rpc('ag_get_profissionais')
      
      if (supabaseError) {
        console.error('Erro ao buscar profissionais:', supabaseError)
        throw supabaseError
      }
      
      profissionais.value = data as Profissional[]
    } catch (err: any) {
      console.error('Erro ao buscar profissionais:', err)
      error.value = err.message || 'Erro ao buscar profissionais'
      profissionais.value = []
    } finally {
      loading.value = false
    }
  }

  /**
   * Busca todos os perfis de usuários (apenas para administradores)
   * Utiliza RPC que verifica permissões automaticamente
   * Atualiza o estado global de profiles
   */
  const fetchProfiles = async () => {
    loading.value = true
    error.value = null
    try {
      const { data, error: supabaseError } = await supabase
        .rpc('ag_get_profiles_if_admin')
      
      if (supabaseError) {
        console.error('Erro ao buscar profiles:', supabaseError)
        throw supabaseError
      }
      
      profiles.value = data as Profile[]
    } catch (err: any) {
      console.error('Erro ao buscar profiles:', err)
      error.value = err.message || 'Erro ao buscar profiles'
      profiles.value = []
    } finally {
      loading.value = false
    }
  }

  /**
   * Busca todos os clientes do banco de dados
   * Ordena por nome do cliente
   * Atualiza o estado global de clientes
   */
  const fetchClientes = async () => {
    loading.value = true
    error.value = null
    try {
      const { data, error: supabaseError } = await supabase
        .from('ag_clientes')
        .select('id, created_at, cpf, nome, endereco, email, telefone')
        .order('nome')
      
      if (supabaseError) {
        console.error('Erro ao buscar clientes:', supabaseError)
        throw supabaseError
      }
      
      clientes.value = data as Cliente[]
    } catch (err: any) {
      console.error('Erro ao buscar clientes:', err)
      error.value = err.message || 'Erro ao buscar clientes'
      clientes.value = []
    } finally {
      loading.value = false
    }
  }

  /**
   * Adiciona uma nova especialidade no sistema
   * @param especialidade - Nome da especialidade a ser adicionada
   * @returns Objeto com success (boolean) e message (string)
   * 
   * Restrições:
   * - Apenas administradores podem adicionar especialidades
   * - Nome da especialidade não pode ser duplicado
   */
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

  /**
   * Atualiza uma especialidade existente
   * @param id - ID da especialidade a ser atualizada
   * @param especialidade - Novo nome da especialidade
   * @returns Objeto com success (boolean) e message (string)
   * 
   * Restrições:
   * - Apenas administradores podem editar especialidades
   * - A especialidade deve existir no sistema
   */
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

  /**
   * Remove uma especialidade do sistema
   * @param id - ID da especialidade a ser removida
   * @returns Objeto com success (boolean) e message (string)
   * 
   * Restrições:
   * - Apenas administradores podem deletar especialidades
   * - Não pode deletar especialidades vinculadas a profissionais
   */
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

  /**
   * Adiciona um novo profissional no sistema
   * @param profileId - ID do perfil do usuário
   * @param especialidadeId - ID da especialidade
   * @returns Objeto com success (boolean) e message (string)
   * 
   * Restrições:
   * - Apenas administradores podem adicionar profissionais
   * - Profile e especialidade devem existir no sistema
   * - Não pode duplicar a combinação profile_id + especialidade_id
   */
  async function addProfissional(profileId: number, especialidadeId: number) {
    // Verificar se o usuário é admin
    if (!userStore.isAdmin) {
      return { success: false, message: 'Acesso negado. Apenas administradores podem adicionar profissionais.' }
    }
    
    try {
      const { data, error } = await (supabase as any)
        .from('ag_profissionais')
        .insert({
          profile_id: profileId,
          especialidade_id: especialidadeId
        })
      
      if (error) {
        console.error('Erro ao adicionar profissional:', error)
        return { success: false, message: error.message }
      }
      
      // Força o refresh imediato da lista após a adição
      await fetchProfissionais()
      // Garante que a reatividade seja disparada
      profissionais.value = [...profissionais.value]
      
      return { success: true, message: 'Profissional adicionado com sucesso' }
    } catch (err: any) {
      console.error('Erro ao adicionar profissional:', err)
      return { success: false, message: err.message || 'Erro ao conectar com o servidor' }
    }
  }

  /**
   * Atualiza um profissional existente
   * @param profissionalId - ID do profissional a ser atualizado (profissional_id)
   * @param profileId - Novo ID do perfil do usuário
   * @param especialidadeId - Novo ID da especialidade
   * @returns Objeto com success (boolean) e message (string)
   * 
   * Restrições:
   * - Apenas administradores podem editar profissionais
   * - O profissional deve existir no sistema
   */
  async function updateProfissional(profissionalId: number, profileId: number, especialidadeId: number) {
    // Verificar se o usuário é admin
    if (!userStore.isAdmin) {
      return { success: false, message: 'Acesso negado. Apenas administradores podem editar profissionais.' }
    }
    
    try {
      const { data, error } = await (supabase as any)
        .from('ag_profissionais')
        .update({
          profile_id: profileId,
          especialidade_id: especialidadeId
        })
        .eq('id', profissionalId)
      
      if (error) {
        console.error('Erro ao atualizar profissional:', error)
        return { success: false, message: error.message }
      }
      
      // Força o refresh imediato da lista após a atualização
      await fetchProfissionais()
      // Garante que a reatividade seja disparada
      profissionais.value = [...profissionais.value]
      
      return { success: true, message: 'Profissional atualizado com sucesso' }
    } catch (err: any) {
      console.error('Erro ao atualizar profissional:', err)
      return { success: false, message: err.message || 'Erro ao conectar com o servidor' }
    }
  }

  /**
   * Remove um profissional do sistema
   * @param profissionalId - ID do profissional a ser removido (profissional_id)
   * @returns Objeto com success (boolean) e message (string)
   * 
   * Restrições:
   * - Apenas administradores podem deletar profissionais
   * - Remove permanentemente o registro
   */
  async function deleteProfissional(profissionalId: number) {
    // Verificar se o usuário é admin
    if (!userStore.isAdmin) {
      return { success: false, message: 'Acesso negado. Apenas administradores podem deletar profissionais.' }
    }
    
    try {
      const { error } = await supabase
        .from('ag_profissionais')
        .delete()
        .eq('id', profissionalId)
      
      if (error) {
        console.error('Erro ao deletar profissional:', error)
        return { success: false, message: error.message }
      }
      
      // Força o refresh imediato da lista após a exclusão
      await fetchProfissionais()
      // Garante que a reatividade seja disparada
      profissionais.value = [...profissionais.value]
      
      return { success: true, message: 'Profissional deletado com sucesso' }
    } catch (err: any) {
      console.error('Erro ao deletar profissional:', err)
      return { success: false, message: err.message || 'Erro ao conectar com o servidor' }
    }
  }

  /**
   * Adiciona um novo cliente no sistema
   * @param cpf - CPF do cliente (obrigatório)
   * @param nome - Nome do cliente (obrigatório)
   * @param endereco - Endereço do cliente (opcional)
   * @param email - Email do cliente (opcional)
   * @param telefone - Telefone do cliente (opcional)
   * @returns Objeto com success (boolean) e message (string)
   * 
   * Restrições:
   * - CPF e nome são campos obrigatórios
   * - CPF deve ser único no sistema
   * - id e created_at são gerados automaticamente pelo banco
   */
  async function addCliente(
    cpf: string, 
    nome: string, 
    endereco?: string | null, 
    email?: string | null, 
    telefone?: string | null
  ) {
    // Validar campos obrigatórios
    if (!cpf || !nome) {
      return { success: false, message: 'CPF e nome são campos obrigatórios.' }
    }
    
    // Garantir que CPF e telefone estejam sem máscaras (apenas números)
    const cpfLimpo = cpf.replace(/\D/g, '')
    const telefoneLimpo = telefone ? telefone.replace(/\D/g, '') : null
    
    // Validar se CPF tem 11 dígitos
    if (cpfLimpo.length !== 11) {
      return { success: false, message: 'CPF deve ter 11 dígitos.' }
    }
    
    // Validar se telefone tem 10 ou 11 dígitos (se fornecido)
    if (telefoneLimpo && (telefoneLimpo.length < 10 || telefoneLimpo.length > 11)) {
      return { success: false, message: 'Telefone deve ter 10 ou 11 dígitos.' }
    }
    
    try {
      const { data, error } = await (supabase as any)
        .from('ag_clientes')
        .insert({
          cpf: cpfLimpo,
          nome: nome.trim(),
          endereco: endereco?.trim() || null,
          email: email?.trim() || null,
          telefone: telefoneLimpo
        })
      
      if (error) {
        console.error('Erro ao adicionar cliente:', error)
        // Tratar erro de CPF duplicado
        if (error.code === '23505' && error.message.includes('ag_clientes_cpf_key')) {
          return { success: false, message: 'Este CPF já está cadastrado no sistema.' }
        }
        return { success: false, message: error.message }
      }
      
      // Força o refresh imediato da lista após a adição
      await fetchClientes()
      // Garante que a reatividade seja disparada
      clientes.value = [...clientes.value]
      
      return { success: true, message: 'Cliente adicionado com sucesso' }
    } catch (err: any) {
      console.error('Erro ao adicionar cliente:', err)
      return { success: false, message: err.message || 'Erro ao conectar com o servidor' }
    }
  }

  /**
   * Atualiza um cliente existente no sistema
   * @param clienteId - ID do cliente a ser atualizado  
   * @param cpf - CPF do cliente (obrigatório)
   * @param nome - Nome do cliente (obrigatório)
   * @param endereco - Endereço do cliente (opcional)
   * @param email - Email do cliente (opcional)
   * @param telefone - Telefone do cliente (opcional)
   * @returns Objeto com success (boolean) e message (string)
   * 
   * Restrições:
   * - CPF e nome são campos obrigatórios
   * - O cliente deve existir no sistema
   * - CPF deve permanecer único (exceto para o próprio cliente)
   */
  async function updateCliente(
    clienteId: number,
    cpf: string, 
    nome: string, 
    endereco?: string | null, 
    email?: string | null, 
    telefone?: string | null
  ) {
    // Validar campos obrigatórios
    if (!cpf || !nome) {
      return { success: false, message: 'CPF e nome são campos obrigatórios.' }
    }
    
    // Garantir que CPF e telefone estejam sem máscaras (apenas números)
    const cpfLimpo = cpf.replace(/\D/g, '')
    const telefoneLimpo = telefone ? telefone.replace(/\D/g, '') : null
    
    // Validar se CPF tem 11 dígitos
    if (cpfLimpo.length !== 11) {
      return { success: false, message: 'CPF deve ter 11 dígitos.' }
    }
    
    // Validar se telefone tem 10 ou 11 dígitos (se fornecido)
    if (telefoneLimpo && (telefoneLimpo.length < 10 || telefoneLimpo.length > 11)) {
      return { success: false, message: 'Telefone deve ter 10 ou 11 dígitos.' }
    }
    
    try {
      const { data, error } = await (supabase as any)
        .from('ag_clientes')
        .update({
          cpf: cpfLimpo,
          nome: nome.trim(),
          endereco: endereco?.trim() || null,
          email: email?.trim() || null,
          telefone: telefoneLimpo
        })
        .eq('id', clienteId)
      
      if (error) {
        console.error('Erro ao atualizar cliente:', error)
        // Tratar erro de CPF duplicado
        if (error.code === '23505' && error.message.includes('ag_clientes_cpf_key')) {
          return { success: false, message: 'Este CPF já está sendo usado por outro cliente.' }
        }
        return { success: false, message: error.message }
      }
      
      // Força o refresh imediato da lista após a atualização
      await fetchClientes()
      // Garante que a reatividade seja disparada
      clientes.value = [...clientes.value]
      
      return { success: true, message: 'Cliente atualizado com sucesso' }
    } catch (err: any) {
      console.error('Erro ao atualizar cliente:', err)
      return { success: false, message: err.message || 'Erro ao conectar com o servidor' }
    }
  }

  /**
   * Remove um cliente do sistema
   * @param clienteId - ID do cliente a ser removido
   * @returns Objeto com success (boolean) e message (string)
   * 
   * Restrições:
   * - O cliente deve existir no sistema
   * - Remove permanentemente o registro
   * - Verifica se há agendamentos vinculados (quando implementado)
   */
  async function deleteCliente(clienteId: number) {
    try {
      const { error } = await (supabase as any)
        .from('ag_clientes')
        .delete()
        .eq('id', clienteId)
      
      if (error) {
        console.error('Erro ao deletar cliente:', error)
        // Tratar erro de constraint (cliente vinculado a agendamentos)
        if (error.code === '23503') {
          return { success: false, message: 'Não é possível deletar este cliente pois ele possui agendamentos vinculados.' }
        }
        return { success: false, message: error.message }
      }
      
      // Força o refresh imediato da lista após a exclusão
      await fetchClientes()
      // Garante que a reatividade seja disparada
      clientes.value = [...clientes.value]
      
      return { success: true, message: 'Cliente deletado com sucesso' }
    } catch (err: any) {
      console.error('Erro ao deletar cliente:', err)
      return { success: false, message: err.message || 'Erro ao conectar com o servidor' }
    }
  }

  // Retorna todos os estados e funções disponíveis para uso nos componentes
  return {
    // Estados reativos (arrays de dados)
    especialidades,     // Lista de especialidades médicas
    profissionais,      // Lista de profissionais com especialidades
    profiles,           // Lista de perfis de usuários (admin only)
    clientes,           // Lista de clientes
    
    // Estados de controle (readonly para evitar mutações externas)
    loading: readonly(loading),    // Indica se alguma operação está em andamento
    error: readonly(error),        // Contém mensagens de erro, se houver
    
    // Funções de busca (fetch)
    fetchEspecialidades,  // Carrega especialidades do banco
    fetchProfissionais,   // Carrega profissionais do banco
    fetchProfiles,        // Carrega profiles do banco (admin only)
    fetchClientes,        // Carrega clientes do banco
    
    // Funções CRUD para especialidades
    addEspecialidade,     // Adiciona nova especialidade
    updateEspecialidade,  // Atualiza especialidade existente
    deleteEspecialidade,  // Remove especialidade
    
    // Funções CRUD para profissionais
    addProfissional,      // Adiciona novo profissional
    updateProfissional,   // Atualiza profissional existente
    deleteProfissional,   // Remove profissional
    
    // Funções CRUD para clientes
    addCliente,           // Adiciona novo cliente
    updateCliente,        // Atualiza cliente existente
    deleteCliente         // Remove cliente
  }
}
