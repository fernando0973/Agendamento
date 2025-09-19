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

      <!-- Input Element -->
      <input
        :id="inputId"
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
      v-if="helpText && !error"
      class="text-sm text-neutral-500"
    >
      {{ helpText }}
    </p>

    <!-- Error Message -->
    <p
      v-if="error"
      class="text-sm text-error-500 flex items-center"
    >
      <ExclamationCircleIcon class="h-4 w-4 mr-1" />
      {{ error }}
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
  id: ''
})

const emit = defineEmits<Emits>()

// Password visibility toggle
const showPassword = ref(false)
const currentType = computed(() => {
  if (props.type === 'password' && props.showPasswordToggle) {
    return showPassword.value ? 'text' : 'password'
  }
  return props.type
})

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

// Slots detection
const slots = useSlots()
const hasIconLeft = computed(() => !!slots['icon-left'])
const hasIconRight = computed(() => !!slots['icon-right'])

// Generate unique ID for input - use provided ID or generate one that's consistent
const inputId = computed(() => {
  if (props.id) {
    return props.id
  }
  // Use a more predictable ID generation for SSR compatibility
  return `input-${props.type}-${props.label?.replace(/\s+/g, '-').toLowerCase() || 'field'}`
})

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
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

  // Size classes
  const sizeClasses = {
    sm: ['px-3', 'py-2', 'text-sm'],
    md: ['px-4', 'py-2.5', 'text-base'],
    lg: ['px-4', 'py-3', 'text-lg']
  }

  // Variant classes
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

  // Error state
  const errorClasses = props.error ? [
    'ring-error-500',
    'focus:ring-error-500'
  ] : []

  // Success state
  const successClasses = props.success && !props.error ? [
    'ring-success-500',
    'focus:ring-success-500'
  ] : []

  // Icon padding
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