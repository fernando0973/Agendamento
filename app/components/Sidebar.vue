<template>
  <aside :class="[
    'h-full bg-white border-r border-neutral-200 flex flex-col shadow-soft transition-all duration-300',
    isCollapsed ? 'w-16' : 'w-64'
  ]">
    <!-- Header da Sidebar -->
    <header :class="[
      'border-b border-neutral-200',
      isCollapsed ? 'px-2 py-4' : 'px-6 py-4'
    ]">
      <div v-if="isCollapsed" class="flex justify-center">
        <!-- Apenas botão toggle quando colapsado -->
        <button 
          @click="toggleSidebar"
          class="p-1 rounded-lg hover:bg-neutral-100 transition-colors"
        >
          <ChevronLeftIcon 
            class="w-5 h-5 text-neutral-600 transition-transform duration-300 rotate-180"
          />
        </button>
      </div>
      
      <div v-else class="flex items-center justify-between">
        <!-- Header completo quando expandido -->
        <div class="flex items-center space-x-3">
          <div class="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
            <CalendarIcon class="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 class="text-lg font-bold text-neutral-900">Agenda AlfaSix</h1>
            <p class="text-xs text-neutral-600 font-medium">Sistema de Agendamento</p>
            <p class="text-xs text-neutral-500">Versão 1.0</p>
          </div>
        </div>
        
        <!-- Botão Toggle quando expandido -->
        <button 
          @click="toggleSidebar"
          class="p-1 rounded-lg hover:bg-neutral-100 transition-colors"
        >
          <ChevronLeftIcon 
            class="w-5 h-5 text-neutral-600 transition-transform duration-300"
          />
        </button>
      </div>
    </header>

    <!-- Navegação Principal -->
    <nav :class="[
      'flex-1 py-6 space-y-3',
      isCollapsed ? 'px-2' : 'px-4'
    ]">
      <!-- Dashboard -->
      <button 
        :class="[
          'w-full flex items-center rounded-lg text-left transition-colors',
          isCollapsed ? 'justify-center px-2 py-3' : 'space-x-3 px-3 py-2',
          currentRoute === '/' 
            ? 'bg-primary-50 text-primary-700 border border-primary-200' 
            : 'text-neutral-700 hover:bg-neutral-50'
        ]"
        @click="navigateTo('/')"
        :title="isCollapsed ? 'Dashboard' : ''"
      >
        <ChartBarIcon class="w-5 h-5" />
        <span v-if="!isCollapsed" class="font-medium">Dashboard</span>
      </button>

      <!-- Especialidades -->
      <button 
        :class="[
          'w-full flex items-center rounded-lg text-left transition-colors',
          isCollapsed ? 'justify-center px-2 py-3' : 'space-x-3 px-3 py-2',
          'text-neutral-700 hover:bg-neutral-50'
        ]"
        @click="handleEspecialidades"
        :title="isCollapsed ? 'Especialidades' : ''"
      >
        <WrenchScrewdriverIcon class="w-5 h-5" />
        <span v-if="!isCollapsed" class="font-medium">Especialidades</span>
      </button>

      <!-- Agendamentos -->
      <button 
        :class="[
          'w-full flex items-center rounded-lg text-left transition-colors',
          isCollapsed ? 'justify-center px-2 py-3' : 'space-x-3 px-3 py-2',
          currentRoute === '/agendamentos' 
            ? 'bg-primary-50 text-primary-700 border border-primary-200' 
            : 'text-neutral-700 hover:bg-neutral-50'
        ]"
        @click="handleAgendamentos"
        :title="isCollapsed ? 'Agendamentos' : ''"
      >
        <CalendarDaysIcon class="w-5 h-5" />
        <span v-if="!isCollapsed" class="font-medium">Agendamentos</span>
      </button>

      <!-- Clientes -->
      <button 
        :class="[
          'w-full flex items-center rounded-lg text-left transition-colors',
          isCollapsed ? 'justify-center px-2 py-3' : 'space-x-3 px-3 py-2',
          currentRoute === '/clientes' 
            ? 'bg-primary-50 text-primary-700 border border-primary-200' 
            : 'text-neutral-700 hover:bg-neutral-50'
        ]"
        @click="handleClientes"
        :title="isCollapsed ? 'Clientes' : ''"
      >
        <UsersIcon class="w-5 h-5" />
        <span v-if="!isCollapsed" class="font-medium">Clientes</span>
      </button>

      <!-- Profissionais -->
      <button 
        :class="[
          'w-full flex items-center rounded-lg text-left transition-colors',
          isCollapsed ? 'justify-center px-2 py-3' : 'space-x-3 px-3 py-2',
          currentRoute === '/profissionais' 
            ? 'bg-primary-50 text-primary-700 border border-primary-200' 
            : 'text-neutral-700 hover:bg-neutral-50'
        ]"
        @click="handleProfissionais"
        :title="isCollapsed ? 'Profissionais' : ''"
      >
        <UserGroupIcon class="w-5 h-5" />
        <span v-if="!isCollapsed" class="font-medium">Profissionais</span>
      </button>
    </nav>

    <!-- Footer da Sidebar -->
    <footer :class="[
      'border-t border-neutral-200 relative',
      isCollapsed ? 'px-2 py-4' : 'px-4 py-4'
    ]">
      <DropdownMenu 
        v-if="!isCollapsed"
        :is-logging-out="isLoggingOut"
        @perfil="handlePerfil"
        @logout="handleLogout"
      />
      
      <!-- Menu colapsado com dropdown -->
      <div v-else class="relative sidebar-footer-collapsed">
        <!-- Menu Dropdown quando colapsado e aberto -->
        <div 
          v-if="isDropdownOpenCollapsed" 
          class="absolute bottom-full left-0 mb-2 bg-white border border-neutral-200 rounded-lg shadow-lg py-2 z-50 min-w-48 whitespace-nowrap"
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

        <!-- Botão de configurações quando colapsado -->
        <button 
          class="w-full flex items-center justify-center px-2 py-3 rounded-lg text-left transition-colors text-neutral-700 hover:bg-neutral-50"
          title="Configurações"
          @click="toggleDropdownCollapsed"
        >
          <CogIcon class="w-5 h-5" />
        </button>
      </div>
    </footer>
  </aside>
</template>

<script setup lang="ts">
import { 
  CalendarIcon, 
  ChartBarIcon, 
  WrenchScrewdriverIcon,
  CalendarDaysIcon,
  UsersIcon,
  UserGroupIcon,
  ChevronLeftIcon,
  CogIcon,
  UserIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/vue/24/outline'

// Auth
const { logout, isLoggingOut } = useAuth()

// User Store
import { useUserStore } from '../../stores/user'
const userStore = useUserStore()

// Estado do sidebar
const isCollapsed = ref(false)

// Estado do dropdown quando colapsado
const isDropdownOpenCollapsed = ref(false)

// Rota atual
const route = useRoute()
const currentRoute = computed(() => route.path)

// Handle especialidades
const handleEspecialidades = () => {
  navigateTo('/especialidades')
}

// Handle agendamentos
const handleAgendamentos = () => {
  navigateTo('/agendamentos')
}

// Handle clientes
const handleClientes = () => {
  navigateTo('/clientes')
}

// Handle profissionais
const handleProfissionais = () => {
  navigateTo('/profissionais')
}

// Handle perfil (ainda não implementado)
const handlePerfil = () => {
  console.log('Perfil clicado - funcionalidade em desenvolvimento')
  isDropdownOpenCollapsed.value = false
}

// Handle logout
const handleLogout = async () => {
  await logout()
  isDropdownOpenCollapsed.value = false
}

// Toggle sidebar
const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value
  // Fechar dropdown colapsado quando expandir
  if (!isCollapsed.value) {
    isDropdownOpenCollapsed.value = false
  }
}

// Toggle dropdown quando colapsado
const toggleDropdownCollapsed = () => {
  isDropdownOpenCollapsed.value = !isDropdownOpenCollapsed.value
}

// Handle configurações (quando colapsado)
const handleConfiguracoes = () => {
  console.log('Configurações clicado - funcionalidade em desenvolvimento')
}

// Fechar dropdown colapsado ao clicar fora
const closeDropdownCollapsedOnClickOutside = (event: Event) => {
  const target = event.target as HTMLElement
  const footer = document.querySelector('.sidebar-footer-collapsed')
  
  if (footer && !footer.contains(target)) {
    isDropdownOpenCollapsed.value = false
  }
}

// Lifecycle
onMounted(() => {
  document.addEventListener('click', closeDropdownCollapsedOnClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', closeDropdownCollapsedOnClickOutside)
})
</script>