<script setup lang="ts">
import { computed } from 'vue';


interface Props {
    type?: string
    placeholder?: string
    modelValue?: string,
}

const props = withDefaults(defineProps<Props>(), {
    type: '',
    placeholder: '',
    modelValue: '',
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
    <input :type="props.type"
        class="text-lg w-full py-1 font-base px-2 rounded border-2 focus:border-orange-400 outline-none shadow-lg border-gray-400"
        :placeholder="props.placeholder" v-model="value">
</template>