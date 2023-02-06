<script setup lang="ts">
import { computed } from 'vue';


interface Props {
    type?: string
    placeholder?: string
    modelValue?: string
    label?: string
}

const props = withDefaults(defineProps<Props>(), {
    type: '',
    placeholder: '',
    modelValue: '',
    label: ''
})

const value = computed({
    get() {
        return props.modelValue
    },
    set(value: string) {
        emit('update:modelValue', value)
    },
})

const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void
}>()
</script>

<template>
    <label v-if="props.label">{{ props.label }}</label>
    <input :type="props.type"
        class="text-lg w-full py-2 font-base px-3 rounded border-2 focus:border-orange-400 bg-white outline-none shadow-lg border-gray-300"
        :placeholder="props.placeholder" v-model="value">
</template>