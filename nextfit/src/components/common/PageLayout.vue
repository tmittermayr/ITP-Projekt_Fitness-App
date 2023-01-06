<template>
    <ion-page>
        <div class="px-5">
            <slot />
        </div>
        <Navigation />
    </ion-page>
</template>
<script lang="ts" setup>
import Navigation from './navigation/NavigationBar.vue';
import { IonPage } from '@ionic/vue';

</script>