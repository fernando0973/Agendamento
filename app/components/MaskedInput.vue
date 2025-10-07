<template>
  <div class="space-y-1">
    <!-- Label -->
    <label
      v-if="label"
      :for="inputId"
      class="block text-sm font-medium text-neutral-700"
    >
      {{ label }}
      <span v-if="required" class="text-error-500 ml-1">*</span>
    </label>

    <!-- Input Container -->
    <div class="relative">
      <!-- Icon Left -->
      <div
        v-if="hasIconLeft"
        class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
      >
        <slot name="icon-left" />
      </div>

      <!-- Input Element with Mask -->
      <input
        :id="inputId"
        ref="inputRef"
        :type="currentType"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :required="required"
        :autocomplete="autocomplete"
        :class="inputClasses"
        @input="handleInput"
        @blur="handleBlur"
        @focus="handleFocus"
      />

      <!-- Icon Right -->
      <div
        v-if="hasIconRight || showClearButton || (type === 'password' && showPasswordToggle)"
        class="absolute inset-y-0 right-0 pr-3 flex items-center space-x-1"
      >
        <!-- Password Toggle Button -->
        <button
          v-if="type === 'password' && showPasswordToggle"
          type="button"
          class="text-neutral-400 hover:text-neutral-600 transition-colors"
          @click="togglePasswordVisibility"
        >
          <EyeIcon v-if="!showPassword" class="h-4 w-4" />
          <EyeSlashIcon v-else class="h-4 w-4" />
        </button>

        <!-- Clear Button -->
        <button
          v-if="showClearButton && modelValue"
          type="button"
          class="text-neutral-400 hover:text-neutral-600 transition-colors"
          @click="clearInput"
        >
          <XMarkIcon class="h-4 w-4" />
        </button>
        
        <!-- Custom Icon Right -->
        <slot name="icon-right" />
      </div>
    </div>

    <!-- Help Text -->
    <p
      v-if="helpText && !computedError"
      class="text-sm text-neutral-500"
    >
      {{ helpText }}
    </p>

    <!-- Error Message -->
    <p
      v-if="computedError"
      class="text-sm text-error-500 flex items-center"
    >
      <ExclamationCircleIcon class="h-4 w-4 mr-1" />
      {{ computedError }}
    </p>

    <!-- Success Message -->
    <p
      v-if="success"
      class="text-sm text-success-500 flex items-center"
    >
      <CheckIcon class="h-4 w-4 mr-1" />
      {{ success }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, useSlots } from 'vue'
import { XMarkIcon, ExclamationCircleIcon, CheckIcon, EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/outline'

interface Props {
  modelValue?: string | number
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search'
  label?: string
  placeholder?: string
  helpText?: string
  error?: string
  success?: string
  disabled?: boolean
  readonly?: boolean
  required?: boolean
  autocomplete?: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'filled'
  showClearButton?: boolean
  showPasswordToggle?: boolean
  id?: string
  // Propriedades específicas para máscara
  maskPattern?: string
  validateEmail?: boolean
  validateCpf?: boolean
  validatePhone?: boolean
}

interface Emits {
  'update:modelValue': [value: string | number]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  type: 'text',
  label: '',
  placeholder: '',
  helpText: '',
  error: '',
  success: '',
  disabled: false,
  readonly: false,
  required: false,
  autocomplete: 'off',
  size: 'md',
  variant: 'default',
  showClearButton: false,
  showPasswordToggle: false,
  id: '',
  maskPattern: '',
  validateEmail: false,
  validateCpf: false,
  validatePhone: false
})

const emit = defineEmits<Emits>()

// Refs
const inputRef = ref<HTMLInputElement>()
const showPassword = ref(false)

// Computed
const currentType = computed(() => {
  if (props.type === 'password' && props.showPasswordToggle) {
    return showPassword.value ? 'text' : 'password'
  }
  return props.type
})

const slots = useSlots()
const hasIconLeft = computed(() => !!slots['icon-left'])
const hasIconRight = computed(() => !!slots['icon-right'])

const inputId = computed(() => {
  if (props.id) {
    return props.id
  }
  return `input-${props.type}-${props.label?.replace(/\s+/g, '-').toLowerCase() || 'field'}`
})

// Validações
const computedError = computed(() => {
  if (props.error) return props.error
  
  const value = String(props.modelValue || '')
  
  // Validação de email
  if (props.validateEmail && value && !isValidEmail(value)) {
    return 'Digite um email válido'
  }
  
  // Validação de CPF
  if (props.validateCpf && value && !isValidCpf(value)) {
    return 'Digite um CPF válido'
  }
  
  // Validação de telefone
  if (props.validatePhone && value && !isValidPhone(value)) {
    return 'Digite um telefone válido'
  }
  
  return ''
})

// Funções de validação
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

function isValidCpf(cpf: string): boolean {
  // Remove caracteres não numéricos
  const cleanCpf = cpf.replace(/\D/g, '')
  
  // Verifica se tem 11 dígitos
  if (cleanCpf.length !== 11) return false
  
  // Verifica se todos os dígitos são iguais
  if (/^(\d)\1{10}$/.test(cleanCpf)) return false
  
  // Validação dos dígitos verificadores
  let sum = 0
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleanCpf.charAt(i)) * (10 - i)
  }
  let remainder = (sum * 10) % 11
  if (remainder === 10 || remainder === 11) remainder = 0
  if (remainder !== parseInt(cleanCpf.charAt(9))) return false
  
  sum = 0
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cleanCpf.charAt(i)) * (11 - i)
  }
  remainder = (sum * 10) % 11
  if (remainder === 10 || remainder === 11) remainder = 0
  if (remainder !== parseInt(cleanCpf.charAt(10))) return false
  
  return true
}

function isValidPhone(phone: string): boolean {
  // Remove caracteres não numéricos
  const cleanPhone = phone.replace(/\D/g, '')
  
  // Verifica se tem 10 ou 11 dígitos (com DDD)
  return cleanPhone.length === 10 || cleanPhone.length === 11
}

// Event handlers
const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  let value = target.value
  
  // Aplicar máscaras baseadas no tipo
  if (props.validateCpf) {
    value = applyCpfMask(value)
  } else if (props.validatePhone) {
    value = applyPhoneMask(value)
  } else if (props.maskPattern) {
    value = applyCustomMask(value, props.maskPattern)
  }
  
  // Atualizar o valor do input se foi modificado pela máscara
  if (target.value !== value) {
    target.value = value
  }
  
  emit('update:modelValue', value)
}

const handleFocus = (event: FocusEvent) => {
  emit('focus', event)
}

const handleBlur = (event: FocusEvent) => {
  emit('blur', event)
}

const clearInput = () => {
  emit('update:modelValue', '')
}

// Funções de máscara
function applyCpfMask(value: string): string {
  const numericValue = value.replace(/\D/g, '')
  const limitedValue = numericValue.slice(0, 11)
  
  if (limitedValue.length <= 3) {
    return limitedValue
  } else if (limitedValue.length <= 6) {
    return limitedValue.replace(/(\d{3})(\d+)/, '$1.$2')
  } else if (limitedValue.length <= 9) {
    return limitedValue.replace(/(\d{3})(\d{3})(\d+)/, '$1.$2.$3')
  } else {
    return limitedValue.replace(/(\d{3})(\d{3})(\d{3})(\d+)/, '$1.$2.$3-$4')
  }
}

function applyPhoneMask(value: string): string {
  const numericValue = value.replace(/\D/g, '')
  const limitedValue = numericValue.slice(0, 11)
  
  if (limitedValue.length <= 2) {
    return limitedValue
  } else if (limitedValue.length <= 6) {
    return limitedValue.replace(/(\d{2})(\d+)/, '($1) $2')
  } else if (limitedValue.length <= 10) {
    return limitedValue.replace(/(\d{2})(\d{4})(\d+)/, '($1) $2-$3')
  } else {
    return limitedValue.replace(/(\d{2})(\d{5})(\d+)/, '($1) $2-$3')
  }
}

function applyCustomMask(value: string, pattern: string): string {
  if (!pattern) return value
  
  const numericValue = value.replace(/\D/g, '')
  let result = ''
  let numIndex = 0
  
  for (let i = 0; i < pattern.length && numIndex < numericValue.length; i++) {
    if (pattern[i] === '#') {
      result += numericValue[numIndex]
      numIndex++
    } else {
      result += pattern[i]
    }
  }
  
  return result
}

// Classes do input
const inputClasses = computed(() => {
  const baseClasses = [
    'block',
    'w-full',
    'rounded-xl',
    'border-0',
    'transition-all',
    'duration-200',
    'focus:ring-2',
    'focus:ring-offset-0',
    'disabled:opacity-50',
    'disabled:cursor-not-allowed',
    'placeholder:text-neutral-400'
  ]

  const sizeClasses = {
    sm: ['px-3', 'py-2', 'text-sm'],
    md: ['px-4', 'py-2.5', 'text-base'],
    lg: ['px-4', 'py-3', 'text-lg']
  }

  const variantClasses = {
    default: [
      'bg-white',
      'ring-1',
      'ring-inset',
      'ring-neutral-300',
      'focus:ring-primary-500'
    ],
    filled: [
      'bg-neutral-50',
      'ring-1',
      'ring-inset',
      'ring-neutral-200',
      'focus:ring-primary-500',
      'focus:bg-white'
    ]
  }

  const errorClasses = computedError.value ? [
    'ring-error-500',
    'focus:ring-error-500'
  ] : []

  const successClasses = props.success && !computedError.value ? [
    'ring-success-500',
    'focus:ring-success-500'
  ] : []

  const iconLeftPadding = hasIconLeft.value ? ['pl-10'] : []
  const iconRightPadding = hasIconRight.value || props.showClearButton || (props.type === 'password' && props.showPasswordToggle) ? ['pr-10'] : []

  return [
    ...baseClasses,
    ...sizeClasses[props.size],
    ...variantClasses[props.variant],
    ...errorClasses,
    ...successClasses,
    ...iconLeftPadding,
    ...iconRightPadding
  ].join(' ')
})
</script>