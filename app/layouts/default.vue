<template>
  <div class="h-screen flex bg-neutral-50">
    <!-- Sidebar -->
    <div class="w-64 flex-shrink-0">
      <Sidebar />
    </div>

    <!-- Main Content Area -->
    <main class="flex-1 flex flex-col overflow-hidden">
      <!-- Conteúdo da Página -->
      <div class="flex-1 overflow-auto">
        <slot />
      </div>

      <!-- Footer da Área Principal -->
      <footer class="bg-white border-t border-neutral-200 px-6 py-3">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4 text-xs text-neutral-500">
            <span>© 2025 SaaS Agendamento</span>
            <span>•</span>
            <span>Versão 1.0.0</span>
          </div>
          
          <div class="flex items-center space-x-4 text-xs text-neutral-500">
            <button class="hover:text-neutral-700 transition-colors">
              Suporte
            </button>
            <span>•</span>
            <button class="hover:text-neutral-700 transition-colors">
              Documentação
            </button>
          </div>
        </div>
      </footer>
    </main>
  </div>
</template>

<script setup lang="ts">
// Layout simples apenas com sidebar e conteúdo
</script>