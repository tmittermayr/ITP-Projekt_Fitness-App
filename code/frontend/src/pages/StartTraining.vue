<template>
    <ion-page>
        <modal-header title="Training starten">
            <router-link to="/" class="absolute left-2 top-3">
                <ion-icon :icon="chevronBackOutline" size="large"/>
            </router-link>
        </modal-header>
        <div class="p-5 bg-gray-100 w-full h-full text-black">
            <input-component label="Name" v-model="name" />
            <div class="flex w-full justify-center mt-10"><ion-icon :icon="arrowDownOutline" size="large" /></div>
            <div class="mt-10">
                    <div class="bg-orange-400 text-white text-center text-left rounded-lg my-2 py-3 cursor-pointer shadow">
                        <h6 class="m-0 font-bold tracking-wide" @click="startTraining(name)">Individuelles Training starten</h6>
                    </div>
                    <!--<div class="mt-10">
                        <div class="flex justify-between items-center mb-5">
                            <h3 class="font-semibold m-0">Trainingspläne</h3>
                            <ion-icon :icon="addCircleOutline" size="large" />
                        </div>
                        <training-plan :plans="plans" />
                    </div>-->
            </div>
        </div>
    </ion-page>
</template>

<script lang="ts" setup>
import ModalHeader from '@/components/common/ModalHeader.vue';
import InputComponent from '@/components/common/InputComponent.vue';
import { IonPage } from '@ionic/vue';
import { inject, ref } from 'vue';
import { chevronBackOutline, arrowDownOutline, addCircleOutline } from 'ionicons/icons';
import { IonIcon } from '@ionic/vue';
import TrainingPlan from '@/components/start_training/TrainingPlans.vue'
import { Preferences } from '@capacitor/preferences';
import axios from 'axios';
import { toastController } from '@ionic/core';
import { TrainingsInformation } from '@/services/TrainingsInformation';

const training = new TrainingsInformation()

function getDate() {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1;
    let dd = today.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    return dd + '.' + mm + '.' + yyyy;
}

async function startTraining(name: string) {
    training.startTraining(name)

    await Preferences.set({ key: 'isFromPlan', value: 'false' });
}

const token = ref()

async function getToken() {
    const { value } = await Preferences.get({ key: 'token' });
    
    token.value = value;
}

getToken()

const name = ref("Training am " + getDate())

const plans = [
    {
        name: "Trainingsplan 1",
    },
    {
        name: "Trainingsplan 2",
    },
    {
        name: "Trainingsplan 3",
    },
    {
        name: "Trainingsplan 4",
    },
    {
        name: "Trainingsplan 5",
    },
    {
        name: "Trainingsplan 6",
    },
    {
        name: "Trainingsplan 7",
    },
    {
        name: "Trainingsplan 8",
    },
]


</script>