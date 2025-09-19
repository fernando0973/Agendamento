<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :class="buttonClasses"
    @click="handleClick"
  >
    <!-- Loading Spinner -->
    <ArrowPathIcon
      v-if="loading"
      class="animate-spin -ml-1 mr-2 h-4 w-4"
    />

    <!-- Icon (Left) -->
    <slot name="icon-left" />

    <!-- Button Text -->
    <span v-if="!loading || showTextOnLoading">
      <slot>{{ label }}</slot>
    </span>

    <!-- Icon (Right) -->
    <slot name="icon-right" />
  </button>
</template>

<script setup lang="ts">
import { ArrowPathIcon } from '@heroicons/vue/24/outline'

interface Props {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  loading?: boolean
  showTextOnLoading?: boolean
  label?: string
  fullWidth?: boolean
}

interface Emits {
  click: [event: MouseEvent]
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  type: 'button',
  disabled: false,
  loading: false,
  showTextOnLoading: true,
  label: '',
  fullWidth: false
})

const emit = defineEmits<Emits>()

const handleClick = (event: MouseEvent) => {
  if (!props.disabled && !props.loading) {
    emit('click', event)
  }
}

const buttonClasses = computed(() => {
  const baseClasses = [
    'inline-flex',
    'items-center',
    'justify-center',
    'font-medium',
    'rounded-xl',
    'transition-all',
    'duration-200',
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-offset-2',
    'disabled:opacity-50',
    'disabled:cursor-not-allowed'
  ]

  // Size classes
  const sizeClasses = {
    sm: ['px-3', 'py-1.5', 'text-sm'],
    md: ['px-4', 'py-2', 'text-base'],
    lg: ['px-6', 'py-3', 'text-lg']
  }

  // Variant classes
  const variantClasses = {
    primary: [
      'bg-primary-500',
      'text-white',
      'hover:bg-primary-600',
      'focus:ring-primary-500',
      'shadow-soft'
    ],
    secondary: [
      'bg-neutral-100',
      'text-neutral-700',
      'hover:bg-neutral-200',
      'focus:ring-neutral-500',
      'shadow-soft'
    ],
    outline: [
      'border-2',
      'border-primary-500',
      'text-primary-500',
      'hover:bg-primary-50',
      'focus:ring-primary-500'
    ],
    ghost: [
      'text-neutral-700',
      'hover:bg-neutral-100',
      'focus:ring-neutral-500'
    ],
    danger: [
      'bg-error-500',
      'text-white',
      'hover:bg-error-600',
      'focus:ring-error-500',
      'shadow-soft'
    ]
  }

  // Full width
  const widthClasses = props.fullWidth ? ['w-full'] : []

  return [
    ...baseClasses,
    ...sizeClasses[props.size],
    ...variantClasses[props.variant],
    ...widthClasses
  ].join(' ')
})
</script>