<template>
    <ion-header>
        <ion-toolbar class="text-center">
            <ion-title class="text-orange-400 text-2xl">{{ props.title }}</ion-title>
            <slot />
        </ion-toolbar>
    </ion-header>
</template>
<script lang="ts" setup>
import { IonToolbar } from '@ionic/vue';
import { IonTitle } from '@ionic/vue';
import { IonHeader } from '@ionic/vue';

const props = defineProps({
    title: String,
})
</script>