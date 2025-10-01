<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold text-neutral-900">Dashboard</h1>
    <p class="mt-4 text-lg text-primary-700">
      Olá, {{ userName }}!
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useUserStore } from '../../stores/user'

const userStore = useUserStore()
const userName = computed(() => userStore.userName)

// Garantir que o layout default seja usado
definePageMeta({
  layout: 'default'
})
</script>