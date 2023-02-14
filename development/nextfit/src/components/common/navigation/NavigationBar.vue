<template>
    <div class="absolute bottom-0 left-0 w-full bg-white py-5 flex justify-around">
        <router-link to="/" class="flex flex-col justify-center gap-2 items-center">
            <ion-icon :icon="home" size="large" class="text-black"></ion-icon>
        </router-link>
        <router-link to="/workouts" class="flex flex-col justify-center gap-2 items-center">
            <ion-icon :icon="barbell" size="large" class="text-black"></ion-icon>
        </router-link>
        <router-link :to="!isTrainingActive ? '/start-training' : '#'" @click="isTrainingActive ? stopTraining() : ''" class="flex justify-center items-center w-16">
            <ion-fab>
                <div class="bg-orange-400 rounded-full">
                        <ion-fab-button color="primary" class="w-20 h-20">
                            <ion-icon :icon="isTrainingActive ? stop : add" size="large"></ion-icon>
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
import { home, barbell, search, settings, add, stop } from "ionicons/icons"
import { IonIcon, IonFab, IonFabButton, toastController } from "@ionic/vue"
import { computed, onMounted, ref } from "vue";
import axios from "axios";
import { Preferences } from "@capacitor/preferences";

const isTrainingActive = ref()

async function stopTraining() {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`;
    await axios.patch('http://localhost:3000/training/stop')
    .then(function (response) {
        success('Training beendet')
        isTrainingActive.value = false
    })
    .catch(function (error) {
        console.log(error);
    })
}

const token = ref()

async function getToken() {
    const { value } = await Preferences.get({ key: 'token' });
    token.value = value;
    checkIfActive()
}

getToken()

async function success(message: string) {
    const toast = await toastController.create({
      message: message,
      duration: 3000,
      cssClass: 'z-index: 999',
    })
    await toast.present()
}

function checkIfActive() {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`;
    axios.get('http://localhost:3000/training/isActive/active')
    .then(function (response) {
        console.log(response.data);
        isTrainingActive.value = response.data
    })
    .catch(function (error) {
        console.log(error);
    })
}

</script>