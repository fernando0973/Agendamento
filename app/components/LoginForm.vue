<template>
  <div class="w-full max-w-md">
    <form @submit.prevent="handleSubmit" class="space-y-6">
      <!-- Email Field -->
      <BaseInput
        id="login-email"
        v-model="email"
        type="email"
        label="E-mail"
        placeholder="Digite seu e-mail"
        required
      >
        <template #icon-left>
          <EnvelopeIcon class="h-5 w-5 text-neutral-400" />
        </template>
      </BaseInput>

      <!-- Password Field -->
      <BaseInput
        id="login-password"
        v-model="password"
        type="password"
        label="Senha"
        placeholder="Digite sua senha"
        required
        show-password-toggle
      >
        <template #icon-left>
          <LockClosedIcon class="h-5 w-5 text-neutral-400" />
        </template>
      </BaseInput>

      <!-- Submit Button -->
      <BaseButton
        type="submit"
        variant="primary"
        size="lg"
        full-width
        :loading="isLoading"
        :disabled="isLoading"
        label="Entrar"
      />

      <!-- Error Message -->
      <div
        v-if="errorMessage"
        class="mt-4 p-3 rounded-lg bg-error-50 border border-error-200"
      >
        <p class="text-sm text-error-600">
          {{ errorMessage }}
        </p>
      </div>

      <!-- Dev Info -->
      <div class="mt-4 p-3 rounded-lg bg-blue-50 border border-blue-200">
        <p class="text-xs text-blue-600 mb-2 font-medium">
          💡 Para testar o sistema:
        </p>
        <p class="text-xs text-blue-600">
          Primeiro, crie uma conta no Supabase Dashboard ou use um email/senha que você já cadastrou.
        </p>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { EnvelopeIcon, LockClosedIcon } from '@heroicons/vue/24/outline'

// Form data
const email = ref('')
const password = ref('')
const errorMessage = ref('')

// Auth composable
const { login, isLoading } = useAuth()

// Handle form submission
const handleSubmit = async () => {
  // Limpar mensagem de erro anterior
  errorMessage.value = ''
  
  // Validação básica
  if (!email.value || !password.value) {
    errorMessage.value = 'Por favor, preencha todos os campos'
    return
  }

  // Validação de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email.value)) {
    errorMessage.value = 'Por favor, digite um email válido'
    return
  }

  // Tentar fazer login
  const { error } = await login(email.value, password.value)
  
  if (error) {
    errorMessage.value = error
    // Limpar a senha em caso de erro para segurança
    password.value = ''
  }
}
</script>