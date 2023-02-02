<template>
    <ion-item class="cursor-pointer">
        <div class="px-5 py-2">
            <h4 class="p-0 m-0">{{ props.exersise.name }}</h4>
            <p class="text-sm">Kategorie: {{ props.exersise.target }}</p>
        </div>
    </ion-item>
</template>
<script lang="ts" setup>
import { IonItem } from '@ionic/vue';

const props = defineProps({
    exersise: Object,
})
</script>