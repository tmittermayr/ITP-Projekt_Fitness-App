<template>
    <ion-item class="cursor-pointer">
        <div>
            <h4>{{ props.exersise.name }}</h4>
            <p class="text-sm">Kategorie: {{ props.exersise.category }}</p>
        </div>
    </ion-item>
</template>
<script lang="ts" setup>

const props = defineProps({
    exersise: Object,
})
</script>