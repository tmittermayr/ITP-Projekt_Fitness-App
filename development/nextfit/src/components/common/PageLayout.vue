<template>
    <ion-page class="bg-gray-200">
        <ion-content>
            <slot />
        </ion-content>
        <Navigation />
    </ion-page>
</template>
<script lang="ts" setup>
import Navigation from './navigation/NavigationBar.vue';
import { IonPage } from '@ionic/vue';

</script>