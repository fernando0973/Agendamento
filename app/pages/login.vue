<template>
  <div class="min-h-screen flex">
    <!-- Coluna da esquerda - Formulário de Login -->
    <div class="flex-1 flex flex-col justify-center px-4 py-12 sm:px-6 lg:px-20 xl:px-24">
      <div class="mx-auto w-full max-w-sm lg:w-96">
        <div class="text-center mb-8">
          <h2 class="text-3xl font-bold text-neutral-900">
            Entrar na sua conta
          </h2>
          <p class="mt-2 text-sm text-neutral-600">
            Acesse sua conta para gerenciar seus agendamentos
          </p>
        </div>

        <!-- Formulário de Login -->
        <LoginForm />

        <!-- Links adicionais -->
        <div class="mt-6 text-center">
          <a 
            href="#" 
            class="text-sm text-primary-600 hover:text-primary-500 transition-colors"
          >
            Esqueceu sua senha?
          </a>
        </div>

        <div class="mt-6 text-center">
          <p class="text-sm text-neutral-600">
            Não tem uma conta? 
            <a 
              href="#" 
              class="font-medium text-primary-600 hover:text-primary-500 transition-colors"
            >
              Criar conta
            </a>
          </p>
        </div>
      </div>
    </div>

    <!-- Coluna da direita - Branding/Informações -->
    <div class="hidden lg:flex lg:flex-1 lg:flex-col lg:justify-center lg:px-20 lg:py-12 bg-gradient-to-br from-primary-500 to-primary-700">
      <div class="max-w-md mx-auto text-center text-white">
        <h1 class="text-4xl font-bold mb-6">
          AlfaSix <br> Sistema de Agendamento 
        </h1>
        <p class="text-xl text-primary-100 leading-relaxed">
          Gerencie seus agendamentos de forma simples e eficiente. 
          Sua agenda organizada em um só lugar.
        </p>
        
        <div class="mt-12 space-y-4 text-primary-100">
          <div class="flex items-center justify-center space-x-3">
            <div class="w-2 h-2 bg-white rounded-full"></div>
            <span>Agendamento inteligente</span>
          </div>
          <div class="flex items-center justify-center space-x-3">
            <div class="w-2 h-2 bg-white rounded-full"></div>
            <span>Notificações automáticas</span>
          </div>
          <div class="flex items-center justify-center space-x-3">
            <div class="w-2 h-2 bg-white rounded-full"></div>
            <span>Relatórios detalhados</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Definir meta tags para a página
definePageMeta({
  layout: false // Não usar layout padrão para ter controle total sobre o design
})

// Head para SEO
useHead({
  title: 'Login - Agenda AlfaSix',
  meta: [
    { name: 'description', content: 'Faça login na sua conta do Agenda AlfaSix' }
  ]
})
</script>