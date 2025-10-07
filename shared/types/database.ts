/**
 * Tipos relacionados ao usuário e perfil
 */

export interface UserProfile {
  id: number
  created_at: string
  user_id: string
  nome: string | null
  role: string | null
}

export interface UserState {
  profile: UserProfile | null
  loading: boolean
  error: string | null
}

export type UserRole = 'user' | 'admin' | 'manager'

export interface Especialidade {
  id: number
  especialidade: string
}

export interface Profissional {
  profissional_id: number
  profile_id: number
  especialidade_id: number
  profissional_nome: string
  profissional_especialidade: string
}

export interface Profile {
  id: number
  nome: string
}

export interface Cliente {
  id: number
  created_at: string
  cpf: string | null
  nome: string | null
  endereco: string | null
  email: string | null
  telefone: string | null
}