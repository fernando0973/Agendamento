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