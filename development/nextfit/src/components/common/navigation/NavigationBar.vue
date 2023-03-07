<template>
    <div class="absolute bottom-0 left-0 w-full bg-white py-5 flex justify-around">
        <router-link to="/" class="flex flex-col justify-center gap-2 items-center">
            <ion-icon :icon="home" size="large" class="text-black"></ion-icon>
        </router-link>
        <router-link to="/workouts" class="flex flex-col justify-center gap-2 items-center">
            <ion-icon :icon="barbell" size="large" class="text-black"></ion-icon>
        </router-link>
        <router-link :to="!training.isTrainingActive ? '/start-training' : '#'" @click="training.isTrainingActive ? training.stopTraining() : ''" class="flex justify-center items-center w-16">
            <ion-fab>
                <div class="bg-orange-400 rounded-full">
                        <ion-fab-button color="primary" class="w-20 h-20">
                            <ion-icon :icon="training.isTrainingActive ? stop : add" size="large"></ion-icon>
                        </ion-fab-button>
                    </div>
                </ion-fab>
        </router-link>
        <router-link to="/exercises" class="flex flex-col justify-center gap-2 items-center">
            <ion-icon :icon="search" size="large" class="text-black"></ion-icon>
        </router-link>
        <router-link to="/settings" class="flex flex-col justify-center gap-2 items-center">
            <ion-icon :icon="settings" size="large" class="text-black"></ion-icon>
        </router-link>
    </div>
</template>
  
<script lang="ts" setup>
import { home, barbell, search, settings, add, stop, train } from "ionicons/icons"
import { IonIcon, IonFab, IonFabButton, toastController } from "@ionic/vue"
import { onMounted, ref, watch } from "vue";
import axios from "axios";
import { TrainingsInformation } from "@/services/TrainingsInformation";

const training = new TrainingsInformation()

watch(() => training.isTrainingActive, (value) => {
    console.log(value);
    
})

</script>