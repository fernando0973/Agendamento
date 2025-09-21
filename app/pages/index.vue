<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    <div class="container mx-auto px-4 py-16">
      <!-- Header -->
      <header class="text-center mb-12">
        <!-- User Info and Logout -->
        <div class="flex justify-end mb-4">
          <div v-if="user" class="flex items-center space-x-4">
            <span class="text-sm text-gray-600">
              Olá, {{ user.email }}
            </span>
            <BaseButton
              variant="outline" 
              size="sm"
              :loading="isLoggingOut"
              @click="handleLogout"
            >
              Sair
            </BaseButton>
          </div>
          <div v-else>
            <BaseButton
              variant="primary"
              size="sm"
              @click="navigateTo('/login')"
            >
              Entrar
            </BaseButton>
          </div>
        </div>

        <h1 class="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
          Bem-vindo ao 
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            Nuxt 4
          </span>
        </h1>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          Sistema de agendamento moderno e intuitivo construído com as melhores tecnologias
        </p>
      </header>

      <!-- Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <!-- Card 1 -->
        <div class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6">
          <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-800 mb-2">Agendamentos</h3>
          <p class="text-gray-600">Gerencie seus agendamentos de forma simples e eficiente</p>
        </div>

        <!-- Card 2 -->
        <div class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6">
          <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
            <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-800 mb-2">Clientes</h3>
          <p class="text-gray-600">Cadastre e gerencie informações dos seus clientes</p>
        </div>

        <!-- Card 3 -->
        <div class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6">
          <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
            <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-800 mb-2">Relatórios</h3>
          <p class="text-gray-600">Acompanhe métricas e relatórios detalhados</p>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <button class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl">
          Começar Agora
        </button>
        <button class="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200">
          Saiba Mais
        </button>
      </div>

      <!-- Feature List -->
      <div class="mt-16 bg-white rounded-2xl shadow-lg p-8">
        <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center">Características do Sistema</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="flex items-center space-x-3">
            <div class="w-2 h-2 bg-green-500 rounded-full"></div>
            <span class="text-gray-700">Interface moderna e responsiva</span>
          </div>
          <div class="flex items-center space-x-3">
            <div class="w-2 h-2 bg-green-500 rounded-full"></div>
            <span class="text-gray-700">Notificações em tempo real</span>
          </div>
          <div class="flex items-center space-x-3">
            <div class="w-2 h-2 bg-green-500 rounded-full"></div>
            <span class="text-gray-700">Integração com calendários</span>
          </div>
          <div class="flex items-center space-x-3">
            <div class="w-2 h-2 bg-green-500 rounded-full"></div>
            <span class="text-gray-700">Relatórios personalizáveis</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Meta tags para SEO
useHead({
  title: 'Sistema de Agendamento - Página Inicial',
  meta: [
    { name: 'description', content: 'Sistema moderno de agendamento com interface intuitiva' }
  ]
})

// Auth
const { user, logout, isLoggingOut } = useAuth()

// Handle logout
const handleLogout = async () => {
  await logout()
}

// Dados reativos para teste
const stats = ref({
  agendamentos: 150,
  clientes: 89,
  servicos: 12
})

// Função de exemplo
const handleClick = () => {
  console.log('Botão clicado!')
}
</script>

<style scoped>
/* Estilos adicionais se necessário */
.container {
  max-width: 80rem;
}
</style>