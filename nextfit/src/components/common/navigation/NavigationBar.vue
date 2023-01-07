<template>
    <div class="absolute bottom-0 left-0 w-full bg-white py-5 flex justify-around">
        <router-link to="/" class="flex flex-col justify-center gap-2 items-center">
            <ion-icon :icon="home" size="large" class="text-black"></ion-icon>
            <p class="text-black text-xs">Startseite</p>
        </router-link>
        <router-link to="/workouts" class="flex flex-col justify-center gap-2 items-center">
            <ion-icon :icon="barbell" size="large" class="text-black"></ion-icon>
            <p class="text-black text-xs">Training</p>
        </router-link>
        <router-link to="/exercises" class="flex flex-col justify-center gap-2 items-center">
            <ion-icon :icon="search" size="large" class="text-black"></ion-icon>
            <p class="text-black text-xs">Übungen</p>
        </router-link>
        <router-link to="/settings" class="flex flex-col justify-center gap-2 items-center">
            <ion-icon :icon="settings" size="large" class="text-black"></ion-icon>
            <p class="text-black text-xs">Einstellungen</p>
        </router-link>
    </div>
</template>
  
<script lang="ts" setup>
import { home, barbell, search, settings } from "ionicons/icons"
import { IonIcon } from "@ionic/vue"

</script>