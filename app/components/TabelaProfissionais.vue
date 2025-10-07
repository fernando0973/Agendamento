<template>
  <div>
    <!-- Botão de ação principal -->
    <div class="mb-4 flex justify-end">
      <BaseButton
        variant="primary"
        size="md"
        label="Adicionar Profissional"
        :disabled="!isAdmin"
        @click="$emit('adicionar')"
      >
        <template #icon-left>
          <PlusIcon class="w-5 h-5 mr-2" />
        </template>
      </BaseButton>
    </div>
    
    <!-- Tabela de Profissionais -->
    <table class="min-w-full bg-white border border-neutral-200 rounded-lg">
      <!-- Cabeçalho da tabela -->
      <thead>
        <tr>
          <th class="px-4 py-2 text-left text-neutral-700 font-semibold">ID</th>
          <th class="px-4 py-2 text-left text-neutral-700 font-semibold">Nome</th>
          <th class="px-4 py-2 text-left text-neutral-700 font-semibold">Especialidade</th>
          <th class="px-4 py-2 text-left text-neutral-700 font-semibold">Ações</th>
        </tr>
      </thead>
      
      <!-- Corpo da tabela -->
      <tbody>
        <!-- Lista de profissionais -->
        <tr v-for="item in profissionais" :key="item.profissional_id">
          <td class="px-4 py-2 border-t border-neutral-100">{{ item.profissional_id }}</td>
          <td class="px-4 py-2 border-t border-neutral-100">{{ item.profissional_nome }}</td>
          <td class="px-4 py-2 border-t border-neutral-100">{{ item.profissional_especialidade }}</td>
          <td class="px-4 py-2 border-t border-neutral-100">
            <!-- Botão Editar -->
            <button
              class="p-2 rounded hover:bg-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed"
              title="Editar"
              :disabled="!isAdmin"
              @click="$emit('editar', item)"
              tabindex="-1"
            >
              <PencilIcon class="w-5 h-5 text-primary-600" />
            </button>
            <!-- Botão Deletar -->
            <button
              class="p-2 rounded hover:bg-neutral-100 ml-2 disabled:opacity-50 disabled:cursor-not-allowed"
              title="Deletar"
              :disabled="!isAdmin"
              @click="$emit('deletar', item)"
              tabindex="-1"
            >
              <TrashIcon class="w-5 h-5 text-red-600" />
            </button>
          </td>
        </tr>
        
        <!-- Estado vazio -->
        <tr v-if="!profissionais.length && !loading">
          <td class="px-4 py-2 text-neutral-400" colspan="4">Nenhum profissional encontrado</td>
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
 * Componente TabelaProfissionais
 * Exibe uma tabela com lista de profissionais e suas especialidades
 * Permite ações de CRUD para usuários administradores
 */

// Importação de tipos
import type { Profissional } from '../../shared/types/database'

// Importação de ícones do Heroicons
import { PencilIcon, TrashIcon, PlusIcon } from '@heroicons/vue/24/outline'

// Importação de componentes
import BaseButton from './BaseButton.vue'

// Importação de stores e composables
import { useUserStore } from '../../stores/user'
import { computed } from 'vue'

// Props do componente
defineProps<{ profissionais: Profissional[]; loading: boolean; error: string | null }>()

// Eventos emitidos pelo componente
defineEmits(['adicionar', 'editar', 'deletar'])

// Store do usuário
const userStore = useUserStore()

// Verificação de permissão de administrador
const isAdmin = computed(() => {
  return userStore.profile?.role === 'admin'
})
</script>