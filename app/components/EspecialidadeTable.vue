<template>
  <div>
    <div class="mb-4 flex justify-end">
      <BaseButton
        variant="primary"
        size="md"
        label="Adicionar Especialidade"
        :disabled="!isAdmin"
        @click="$emit('adicionar')"
      >
        <template #icon-left>
          <PlusIcon class="w-5 h-5 mr-2" />
        </template>
      </BaseButton>
    </div>
    <table class="min-w-full bg-white border border-neutral-200 rounded-lg">
      <thead>
        <tr>
          <th class="px-4 py-2 text-left text-neutral-700 font-semibold">ID</th>
          <th class="px-4 py-2 text-left text-neutral-700 font-semibold">Especialidade</th>
          <th class="px-4 py-2 text-left text-neutral-700 font-semibold">Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in especialidades" :key="item.id">
          <td class="px-4 py-2 border-t border-neutral-100">{{ item.id }}</td>
          <td class="px-4 py-2 border-t border-neutral-100">{{ item.especialidade }}</td>
          <td class="px-4 py-2 border-t border-neutral-100">
            <button
              class="p-2 rounded hover:bg-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed"
              title="Editar"
              :disabled="!isAdmin"
              @click="$emit('editar', item)"
              tabindex="-1"
            >
              <PencilIcon class="w-5 h-5 text-primary-600" />
            </button>
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
        <tr v-if="!especialidades.length && !loading">
          <td class="px-4 py-2 text-neutral-400" colspan="3">Nenhuma especialidade encontrada</td>
        </tr>
      </tbody>
    </table>
    <div v-if="loading" class="mt-4 text-primary-600">Carregando...</div>
    <div v-if="error" class="mt-4 text-red-600">{{ error }}</div>
  </div>
</template>

<script setup lang="ts">
import type { Especialidade } from '../../shared/types/user'
import { PencilIcon, TrashIcon, PlusIcon } from '@heroicons/vue/24/outline'
import BaseButton from './BaseButton.vue'
import { useUserStore } from '../../stores/user'
import { computed } from 'vue'

defineProps<{ especialidades: Especialidade[]; loading: boolean; error: string | null }>()
defineEmits(['adicionar', 'editar', 'deletar'])

const userStore = useUserStore()
const isAdmin = computed(() => userStore.userRole === 'admin')
</script>
