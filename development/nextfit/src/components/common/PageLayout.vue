<template>
    <ion-page class="bg-gray-200">
        <div class="px-5 mt-10">
            <slot />
        </div>
        <Navigation />
    </ion-page>
</template>
<script lang="ts" setup>
import Navigation from './navigation/NavigationBar.vue';
import { IonPage } from '@ionic/vue';

</script>