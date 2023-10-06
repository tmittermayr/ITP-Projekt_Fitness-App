<template>
    <h1 class="text-orange-400 text-3xl font-bold mt-10">{{ props.title }}</h1>
    <p class="">{{ props.description }}</p>
</template>
<script lang="ts" setup>
const props = defineProps({
    title: String,
    description: String,
})
</script>