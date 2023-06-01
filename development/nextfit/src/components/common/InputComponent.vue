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
    <div>
        <label v-if="props.label" class="ml-1">{{ props.label }}</label>
        <input :type="props.type"
            class="text-lg w-full py-1 font-base px-3 rounded-xl focus:border-orange-400 bg-white outline-none shadow border-gray-300"
            :placeholder="props.placeholder" v-model="value">
    </div>
</template>