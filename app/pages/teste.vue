<template>
  <div class="min-h-screen bg-neutral-50 py-8">
    <div class="container mx-auto px-4 max-w-4xl">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-3xl font-bold text-neutral-800 mb-4">
          Teste de Componentes
        </h1>
        <p class="text-neutral-600">
          Demonstração dos componentes BaseButton e BaseInput
        </p>
      </div>

      <!-- BaseButton Tests -->
      <section class="bg-white rounded-2xl shadow-soft p-8 mb-8">
        <h2 class="text-2xl font-semibold text-neutral-800 mb-6">BaseButton</h2>
        
        <!-- Button Variants -->
        <div class="space-y-6">
          <div>
            <h3 class="text-lg font-medium text-neutral-700 mb-4">Variantes</h3>
            <div class="flex flex-wrap gap-4">
              <BaseButton variant="primary" @click="handleButtonClick('Primary')">
                Primary
              </BaseButton>
              <BaseButton variant="secondary" @click="handleButtonClick('Secondary')">
                Secondary
              </BaseButton>
              <BaseButton variant="outline" @click="handleButtonClick('Outline')">
                Outline
              </BaseButton>
              <BaseButton variant="ghost" @click="handleButtonClick('Ghost')">
                Ghost
              </BaseButton>
              <BaseButton variant="danger" @click="handleButtonClick('Danger')">
                Danger
              </BaseButton>
            </div>
          </div>

          <!-- Button Sizes -->
          <div>
            <h3 class="text-lg font-medium text-neutral-700 mb-4">Tamanhos</h3>
            <div class="flex flex-wrap gap-4 items-center">
              <BaseButton size="sm" @click="handleButtonClick('Small')">
                Small
              </BaseButton>
              <BaseButton size="md" @click="handleButtonClick('Medium')">
                Medium
              </BaseButton>
              <BaseButton size="lg" @click="handleButtonClick('Large')">
                Large
              </BaseButton>
            </div>
          </div>

          <!-- Button States -->
          <div>
            <h3 class="text-lg font-medium text-neutral-700 mb-4">Estados</h3>
            <div class="flex flex-wrap gap-4">
              <BaseButton :loading="loadingButton" @click="toggleLoading">
                {{ loadingButton ? 'Carregando...' : 'Clique para Loading' }}
              </BaseButton>
              <BaseButton disabled>
                Desabilitado
              </BaseButton>
              <BaseButton full-width class="max-w-sm">
                Full Width
              </BaseButton>
            </div>
          </div>

          <!-- Buttons with Icons -->
          <div>
            <h3 class="text-lg font-medium text-neutral-700 mb-4">Com Ícones</h3>
            <div class="flex flex-wrap gap-4">
              <BaseButton variant="primary">
                <template #icon-left>
                  <PlusIcon class="w-4 h-4" />
                </template>
                Adicionar
              </BaseButton>
              
              <BaseButton variant="outline">
                Salvar
                <template #icon-right>
                  <CheckIcon class="w-4 h-4" />
                </template>
              </BaseButton>
            </div>
          </div>
        </div>
      </section>

      <!-- BaseInput Tests -->
      <section class="bg-white rounded-2xl shadow-soft p-8">
        <h2 class="text-2xl font-semibold text-neutral-800 mb-6">BaseInput</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Basic Inputs -->
          <div class="space-y-4">
            <h3 class="text-lg font-medium text-neutral-700">Básicos</h3>
            
            <BaseInput
              v-model="formData.name"
              label="Nome"
              placeholder="Digite seu nome"
              help-text="Este campo é obrigatório"
              required
            />
            
            <BaseInput
              v-model="formData.email"
              type="email"
              label="E-mail"
              placeholder="exemplo@email.com"
              :error="emailError"
            >
              <template #icon-left>
                <AtSymbolIcon class="w-4 h-4 text-neutral-400" />
              </template>
            </BaseInput>
            
            <BaseInput
              v-model="formData.phone"
              type="tel"
              label="Telefone"
              placeholder="(11) 99999-9999"
              :success="phoneSuccess"
            />
          </div>

          <!-- Input Variants and States -->
          <div class="space-y-4">
            <h3 class="text-lg font-medium text-neutral-700">Variantes e Estados</h3>
            
            <BaseInput
              v-model="formData.search"
              type="search"
              label="Buscar (com ícone)"
              placeholder="Digite para buscar..."
              variant="filled"
              show-clear-button
            >
              <template #icon-left>
                <MagnifyingGlassIcon class="w-4 h-4 text-neutral-400" />
              </template>
            </BaseInput>
            
            <BaseInput
              v-model="formData.password"
              type="password"
              label="Senha"
              placeholder="Digite sua senha"
              size="lg"
            >
              <template #icon-left>
                <LockClosedIcon class="w-4 h-4 text-neutral-400" />
              </template>
            </BaseInput>
            
            <BaseInput
              v-model="formData.readonly"
              label="Campo Somente Leitura"
              readonly
              placeholder="Não editável"
            />
            
            <BaseInput
              v-model="formData.disabled"
              label="Campo Desabilitado"
              disabled
              placeholder="Campo desabilitado"
            />
          </div>
        </div>

        <!-- Form Actions -->
        <div class="mt-8 pt-6 border-t border-neutral-200">
          <div class="flex gap-4">
            <BaseButton variant="primary" @click="handleSubmit">
              Salvar Dados
            </BaseButton>
            <BaseButton variant="outline" @click="clearForm">
              Limpar Formulário
            </BaseButton>
          </div>
        </div>

        <!-- Toast Demonstration -->
        <div class="mt-8 pt-6 border-t border-neutral-200">
          <h4 class="font-medium text-neutral-700 mb-4">Demonstração de Toasts:</h4>
          <div class="flex flex-wrap gap-3">
            <BaseButton variant="primary" size="sm" @click="showSuccessToast">
              Success Toast
            </BaseButton>
            <BaseButton variant="secondary" size="sm" @click="showInfoToast">
              Info Toast
            </BaseButton>
            <BaseButton variant="outline" size="sm" @click="showWarningToast">
              Warning Toast
            </BaseButton>
            <BaseButton variant="danger" size="sm" @click="showErrorToast">
              Error Toast
            </BaseButton>
            <BaseButton variant="ghost" size="sm" @click="showAgendamentoToast">
              Agendamento Toast
            </BaseButton>
          </div>
        </div>

        <!-- Debug Info -->
        <div class="mt-8 p-4 bg-neutral-50 rounded-xl">
          <h4 class="font-medium text-neutral-700 mb-2">Dados do Formulário:</h4>
          <pre class="text-sm text-neutral-600">{{ JSON.stringify(formData, null, 2) }}</pre>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PlusIcon, CheckIcon, MagnifyingGlassIcon, LockClosedIcon, AtSymbolIcon } from '@heroicons/vue/24/outline'
import { useToast } from 'vue-toastification'

// Meta tags
useHead({
  title: 'Teste de Componentes - Sistema de Agendamento',
  meta: [
    { name: 'description', content: 'Página de teste para componentes BaseButton e BaseInput' }
  ]
})

// Reactive data
const loadingButton = ref(false)
const toast = useToast()

const formData = ref({
  name: '',
  email: '',
  phone: '',
  search: '',
  password: '',
  readonly: 'Valor fixo não editável',
  disabled: 'Campo desabilitado'
})

// Computed validations
const emailError = computed(() => {
  if (formData.value.email && !isValidEmail(formData.value.email)) {
    return 'Por favor, insira um e-mail válido'
  }
  return ''
})

const phoneSuccess = computed(() => {
  if (formData.value.phone && formData.value.phone.length >= 10) {
    return 'Telefone válido'
  }
  return ''
})

// Methods
const handleButtonClick = (buttonType: string) => {
  console.log(`Botão ${buttonType} clicado!`)
  // Simular feedback visual
  alert(`Botão ${buttonType} foi clicado!`)
}

const toggleLoading = () => {
  loadingButton.value = true
  setTimeout(() => {
    loadingButton.value = false
  }, 2000)
}

const handleSubmit = () => {
  console.log('Dados do formulário:', formData.value)
  toast.success('Dados salvos com sucesso!')
}

const clearForm = () => {
  formData.value = {
    name: '',
    email: '',
    phone: '',
    search: '',
    password: '',
    readonly: 'Valor fixo não editável',
    disabled: 'Campo desabilitado'
  }
}

// Toast methods
const showSuccessToast = () => {
  toast.success('Operação realizada com sucesso! ✅')
}

const showInfoToast = () => {
  toast.info('Esta é uma informação importante ℹ️')
}

const showWarningToast = () => {
  toast.warning('Atenção: Verifique os dados inseridos ⚠️')
}

const showErrorToast = () => {
  toast.error('Ocorreu um erro inesperado ❌')
}

const showAgendamentoToast = () => {
  toast.success('Agendamento confirmado para João Silva em 25/09/2025 às 14:30 📅')
}

// Utils
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}
</script>