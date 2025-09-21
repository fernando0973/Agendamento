<template>
  <div class="min-h-screen flex items-center justify-center bg-neutral-50">
    <div class="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
      <div class="mb-6">
        <div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircleIcon class="w-8 h-8 text-primary-600" />
        </div>
        <h1 class="text-2xl font-bold text-neutral-900 mb-2">
          Aguardando confirmação...
        </h1>
        <p class="text-neutral-600">
          Processando seu login. Você será redirecionado em instantes.
        </p>
      </div>
      
      <div class="flex justify-center">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CheckCircleIcon } from '@heroicons/vue/24/outline'

// Definir meta para a página
definePageMeta({
  layout: false
})

// Head para SEO
useHead({
  title: 'Confirmando Login - SaaS Agendamento',
  meta: [
    { name: 'description', content: 'Processando confirmação de login' }
  ]
})

// Verificar autenticação e redirecionar
const user = useSupabaseUser()

// Usar watchEffect para melhor controle
watchEffect(() => {
  if (user.value) {
    // Usuário autenticado, redirecionar para home
    navigateTo('/')
  }
})

// Usar onMounted para o fallback ao invés de setTimeout
onMounted(() => {
  // Fallback: se não redirecionar em 10 segundos, ir para login
  const timer = setTimeout(() => {
    if (!user.value) {
      navigateTo('/login')
    }
  }, 10000)

  // Limpar timer quando o componente for desmontado
  onUnmounted(() => {
    clearTimeout(timer)
  })
})
</script>