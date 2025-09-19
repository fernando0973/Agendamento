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
        label="Entrar"
      />
    </form>
  </div>
</template>

<script setup lang="ts">
import { EnvelopeIcon, LockClosedIcon } from '@heroicons/vue/24/outline'

// Form data
const email = ref('')
const password = ref('')

// Handle form submission
const handleSubmit = () => {
  // Form submission logic will be implemented later
  console.log('Form submitted:', { email: email.value, password: password.value })
}
</script>