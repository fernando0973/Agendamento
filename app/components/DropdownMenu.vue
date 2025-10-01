<template>
  <div class="relative" ref="dropdownContainer">
    <!-- Botão trigger -->
    <button 
      class="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors text-neutral-700 hover:bg-neutral-50"
      @click="toggleDropdown"
    >
      <CogIcon class="w-5 h-5" />
      <span class="font-medium">Configurações</span>
      <ChevronUpIcon 
        :class="[
          'w-4 h-4 ml-auto transition-transform',
          isOpen ? 'rotate-180' : ''
        ]"
      />
    </button>

    <!-- Menu Dropdown -->
    <div 
      v-if="isOpen" 
      class="absolute bottom-full left-0 right-0 mb-2 bg-white border border-neutral-200 rounded-lg shadow-lg py-2 z-50"
    >
      <!-- Perfil -->
      <button 
        class="w-full flex items-center space-x-3 px-3 py-2 text-left transition-colors text-neutral-700 hover:bg-neutral-50"
        @click="handlePerfil"
      >
        <UserIcon class="w-4 h-4" />
        <span class="text-sm font-medium">Perfil</span>
      </button>
      
      <!-- Sair -->
      <button 
        class="w-full flex items-center space-x-3 px-3 py-2 text-left transition-colors text-neutral-700 hover:bg-neutral-50"
        @click="handleLogout"
        :disabled="isLoggingOut"
      >
        <ArrowRightOnRectangleIcon class="w-4 h-4" />
        <span class="text-sm font-medium">
          {{ isLoggingOut ? 'Saindo...' : 'Sair' }}
        </span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { 
  CogIcon,
  ChevronUpIcon,
  UserIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/vue/24/outline'

// Props
interface Props {
  isLoggingOut?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isLoggingOut: false
})

// Emits
const emit = defineEmits<{
  perfil: []
  logout: []
}>()

// Estado do dropdown
const isOpen = ref(false)
const dropdownContainer = ref<HTMLElement>()

// Toggle dropdown
const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

// Handle perfil
const handlePerfil = () => {
  emit('perfil')
  isOpen.value = false
}

// Handle logout
const handleLogout = () => {
  emit('logout')
  isOpen.value = false
}

// Fechar dropdown ao clicar fora
const closeDropdownOnClickOutside = (event: Event) => {
  const target = event.target as HTMLElement
  
  if (dropdownContainer.value && !dropdownContainer.value.contains(target)) {
    isOpen.value = false
  }
}

// Lifecycle
onMounted(() => {
  document.addEventListener('click', closeDropdownOnClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', closeDropdownOnClickOutside)
})
</script>