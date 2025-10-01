<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <Suspense>
        <NuxtPage />
        <template #fallback>
          <div class="min-h-screen flex items-center justify-center bg-neutral-50">
            <div class="text-center">
              <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
              <p class="text-neutral-600">Carregando...</p>
            </div>
          </div>
        </template>
      </Suspense>
    </NuxtLayout>
  </div>
</template>

<script setup>
// Tratar erros não capturados
onErrorCaptured((error, instance, info) => {
  console.error('Erro capturado:', error, info)
  return false // Não interromper a propagação do erro
})

// Tratar warnings do Vue
process.client && (window.addEventListener('unhandledrejection', (event) => {
  console.error('Promise rejeitada:', event.reason)
}))
</script>
