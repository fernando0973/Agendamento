<template>
  <div>
    <!-- Botão de ação principal -->
    <div class="mb-4 flex justify-end">
      <BaseButton
        variant="primary"
        size="md"
        label="Adicionar Cliente"
        @click="$emit('adicionar')"
      >
        <template #icon-left>
          <PlusIcon class="w-5 h-5 mr-2" />
        </template>
      </BaseButton>
    </div>
    
    <!-- Tabela de Clientes -->
    <table class="min-w-full bg-white border border-neutral-200 rounded-lg">
      <!-- Cabeçalho da tabela -->
      <thead>
        <tr>
          <th class="px-4 py-2 text-left text-neutral-700 font-semibold">ID</th>
          <th class="px-4 py-2 text-left text-neutral-700 font-semibold">Nome</th>
          <th class="px-4 py-2 text-left text-neutral-700 font-semibold">CPF</th>
          <th class="px-4 py-2 text-left text-neutral-700 font-semibold">Email</th>
          <th class="px-4 py-2 text-left text-neutral-700 font-semibold">Telefone</th>
          <th class="px-4 py-2 text-left text-neutral-700 font-semibold">Ações</th>
        </tr>
      </thead>
      
      <!-- Corpo da tabela -->
      <tbody>
        <!-- Lista de clientes -->
        <tr v-for="item in clientes" :key="item.id">
          <td class="px-4 py-2 border-t border-neutral-100">{{ item.id }}</td>
          <td class="px-4 py-2 border-t border-neutral-100">{{ item.nome || '-' }}</td>
          <td class="px-4 py-2 border-t border-neutral-100">{{ formatCpf(item.cpf) }}</td>
          <td class="px-4 py-2 border-t border-neutral-100">{{ item.email || '-' }}</td>
          <td class="px-4 py-2 border-t border-neutral-100">{{ formatTelefone(item.telefone) }}</td>
          <td class="px-4 py-2 border-t border-neutral-100">
            <!-- Botão Editar -->
            <button
              class="p-2 rounded hover:bg-neutral-100"
              title="Editar"
              @click="$emit('editar', item)"
              tabindex="-1"
            >
              <PencilIcon class="w-5 h-5 text-primary-600" />
            </button>
            <!-- Botão Deletar -->
            <button
              class="p-2 rounded hover:bg-neutral-100 ml-2"
              title="Deletar"
              @click="$emit('deletar', item)"
              tabindex="-1"
            >
              <TrashIcon class="w-5 h-5 text-red-600" />
            </button>
          </td>
        </tr>
        
        <!-- Estado vazio -->
        <tr v-if="!clientes.length && !loading">
          <td class="px-4 py-2 text-neutral-400" colspan="6">Nenhum cliente encontrado</td>
        </tr>
      </tbody>
    </table>
    
    <!-- Estados de feedback -->
    <div v-if="loading" class="mt-4 text-primary-600">Carregando...</div>
    <div v-if="error" class="mt-4 text-red-600">{{ error }}</div>
  </div>
</template>

<script setup lang="ts">
/**
 * Componente TabelaClientes
 * Exibe uma tabela com lista de clientes
 * Permite ações de CRUD para clientes
 */

// Importação de tipos
import type { Cliente } from '../../shared/types/database'

// Importação de ícones do Heroicons
import { PencilIcon, TrashIcon, PlusIcon } from '@heroicons/vue/24/outline'

// Importação de componentes
import BaseButton from './BaseButton.vue'

// Props do componente
defineProps<{ clientes: Cliente[]; loading: boolean; error: string | null }>()

// Eventos emitidos pelo componente
defineEmits(['adicionar', 'editar', 'deletar'])

// Funções de formatação para exibição
function formatCpf(cpf: string | null): string {
  if (!cpf) return '-'
  
  // Se já está formatado, retorna como está
  if (cpf.includes('.') || cpf.includes('-')) return cpf
  
  // Se são apenas números, aplica a formatação
  const numericCpf = cpf.replace(/\D/g, '')
  if (numericCpf.length === 11) {
    return numericCpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
  }
  
  return cpf
}

function formatTelefone(telefone: string | null): string {
  if (!telefone) return '-'
  
  // Se já está formatado, retorna como está
  if (telefone.includes('(') || telefone.includes(')') || telefone.includes('-')) return telefone
  
  // Se são apenas números, aplica a formatação
  const numericTelefone = telefone.replace(/\D/g, '')
  if (numericTelefone.length === 11) {
    return numericTelefone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
  } else if (numericTelefone.length === 10) {
    return numericTelefone.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3')
  }
  
  return telefone
}
</script>