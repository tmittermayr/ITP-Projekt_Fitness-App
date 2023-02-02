<template>
    <ion-page >
        <ion-content class="w-full h-full bg-gray-200">
            <slot />
        </ion-content>
        <Navigation />
    </ion-page>
</template>
<script lang="ts" setup>
import Navigation from './navigation/NavigationBar.vue';
import { IonPage } from '@ionic/vue';
import { IonContent } from '@ionic/vue';

</script>