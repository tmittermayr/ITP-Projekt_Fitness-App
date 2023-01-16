<script setup lang="ts">

interface Props {
    type?: string
    placeholder?: string
}

const props = withDefaults(defineProps<Props>(), {
    type: '',
    placeholder: '',
})
</script>

<template>
    <input :type="props.type"
        class="w-full py-1 font-base px-2 rounded border-2 focus:border-orange-400 outline-none focus:ring-orange-400 shadow-lg border-gray-200"
        :placeholder="props.placeholder">
</template>