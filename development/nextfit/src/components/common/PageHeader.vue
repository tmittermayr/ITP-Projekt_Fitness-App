<template>
    <ion-header>
        <ion-toolbar class="text-center">
            <ion-title class="text-orange-400 text-2xl my-5">{{ props.title }}</ion-title>
            <slot />
        </ion-toolbar>
    </ion-header>
</template>
<script lang="ts" setup>

const props = defineProps({
    title: String,
})
</script>