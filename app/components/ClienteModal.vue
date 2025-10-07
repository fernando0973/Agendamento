<template>
  <BaseModal :model-value="modelValue" @update:modelValue="$emit('update:modelValue', $event)">
    <template #header>
      {{ isEdicao ? 'Editar Cliente' : 'Novo Cliente' }}
    </template>
    <form @submit.prevent="handleSubmit">
      <!-- CPF - Obrigatório com máscara e validação -->
      <MaskedInput
        :model-value="cpf"
        @update:modelValue="cpf = String($event)"
        label="CPF"
        placeholder="000.000.000-00"
        required
        :validate-cpf="true"
        class="mb-4"
      />
      
      <!-- Nome - Obrigatório -->
      <BaseInput
        :model-value="nome"
        @update:modelValue="nome = String($event)"
        label="Nome"
        placeholder="Digite o nome do cliente"
        required
        class="mb-4"
      />
      
      <!-- Email - Opcional com validação -->
      <MaskedInput
        :model-value="email"
        @update:modelValue="email = String($event)"
        label="Email"
        placeholder="Digite o email do cliente"
        type="email"
        :validate-email="true"
        class="mb-4"
      />
      
      <!-- Telefone - Opcional com máscara -->
      <MaskedInput
        :model-value="telefone"
        @update:modelValue="telefone = String($event)"
        label="Telefone"
        placeholder="(00) 00000-0000"
        type="tel"
        :validate-phone="true"
        class="mb-4"
      />
      
      <!-- Endereço - Opcional -->
      <BaseInput
        :model-value="endereco"
        @update:modelValue="endereco = String($event)"
        label="Endereço"
        placeholder="Digite o endereço do cliente"
        class="mb-4"
      />
      
      <!-- Botões de ação -->
      <div class="flex justify-end gap-2 mt-6">
        <BaseButton 
          variant="secondary" 
          type="button"
          @click="cancelar"
        >
          Cancelar
        </BaseButton>
        <BaseButton 
          variant="primary" 
          type="submit"
          :loading="loading"
        >
          {{ isEdicao ? 'Salvar' : 'Adicionar' }}
        </BaseButton>
      </div>
    </form>
  </BaseModal>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import BaseModal from './BaseModal.vue'
import BaseButton from './BaseButton.vue'
import BaseInput from './BaseInput.vue'
import MaskedInput from './MaskedInput.vue'
import { useProfissionais } from '../composables/useProfissionais'
import { useNotifications } from '../composables/useNotifications'
import type { Cliente } from '../../shared/types/database'

const props = defineProps<{
  modelValue: boolean
  isEdicao?: boolean
  clienteInicial?: Cliente | null
}>()

const emit = defineEmits(['update:modelValue', 'confirm'])

// Estados dos campos do formulário
const cpf = ref('')
const nome = ref('')
const email = ref('')
const telefone = ref('')
const endereco = ref('')

// Composables
const { addCliente, updateCliente, loading } = useProfissionais()
const { showSuccess, showError } = useNotifications()

// Funções para aplicar máscaras na exibição (edição)
function formatCpfForDisplay(cpf: string): string {
  if (!cpf) return ''
  const numericCpf = cpf.replace(/\D/g, '')
  if (numericCpf.length === 11) {
    return numericCpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
  }
  return cpf
}

function formatTelefoneForDisplay(telefone: string): string {
  if (!telefone) return ''
  const numericTelefone = telefone.replace(/\D/g, '')
  if (numericTelefone.length === 11) {
    return numericTelefone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
  } else if (numericTelefone.length === 10) {
    return numericTelefone.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3')
  }
  return telefone
}

// Observar mudanças no cliente inicial para popular os campos
watch(() => props.clienteInicial, (cliente) => {
  if (cliente) {
    // Aplicar máscaras nos dados que vêm do banco para exibição no formulário
    cpf.value = formatCpfForDisplay(cliente.cpf || '')
    nome.value = cliente.nome || ''
    email.value = cliente.email || ''
    telefone.value = formatTelefoneForDisplay(cliente.telefone || '')
    endereco.value = cliente.endereco || ''
  } else {
    // Limpar campos para novo cliente
    limparCampos()
  }
}, { immediate: true })

// Observar quando o modal é fechado para limpar os campos
watch(() => props.modelValue, (isOpen) => {
  if (!isOpen && !props.isEdicao) {
    limparCampos()
  }
})

function limparCampos() {
  cpf.value = ''
  nome.value = ''
  email.value = ''
  telefone.value = ''
  endereco.value = ''
}

function cancelar() {
  limparCampos()
  emit('update:modelValue', false)
}

// Função para limpar máscaras antes de enviar ao banco
function removeAllMasks(value: string): string {
  return value.replace(/\D/g, '')
}

async function handleSubmit() {
  // Limpar máscaras dos dados antes de enviar ao banco
  const cpfLimpo = removeAllMasks(cpf.value)
  const telefoneLimpo = telefone.value ? removeAllMasks(telefone.value) : null
  
  if (props.isEdicao && props.clienteInicial) {
    // Editar cliente existente
    const result = await updateCliente(
      props.clienteInicial.id,
      cpfLimpo,
      nome.value,
      endereco.value || null,
      email.value || null,
      telefoneLimpo
    )
    
    if (result.success) {
      showSuccess('Cliente atualizado com sucesso!')
      // Aguarda um pequeno delay para garantir que o refresh foi processado
      await new Promise(resolve => setTimeout(resolve, 100))
      emit('update:modelValue', false)
    } else {
      showError(`Erro ao atualizar cliente: ${result.message}`)
    }
  } else {
    // Adicionar novo cliente com dados limpos
    const result = await addCliente(
      cpfLimpo,
      nome.value,
      endereco.value || null,
      email.value || null,
      telefoneLimpo
    )
    
    if (result.success) {
      showSuccess('Cliente adicionado com sucesso!')
      // Aguarda um pequeno delay para garantir que o refresh foi processado
      await new Promise(resolve => setTimeout(resolve, 100))
      limparCampos()
      emit('update:modelValue', false)
    } else {
      showError(`Erro ao adicionar cliente: ${result.message}`)
    }
  }
}
</script>