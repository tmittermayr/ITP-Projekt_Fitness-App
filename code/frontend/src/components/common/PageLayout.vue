<template>
    <ion-page>
        <ion-content>
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