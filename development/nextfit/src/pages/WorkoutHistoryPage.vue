<template>
  <Layout>
    <div class="bg-gray-100 w-full min-h-full absolute top-0 left-0 p-5">
        <page-header title="Trainingsübersicht" description="Hier können Sie ihre letzten Trainings anschauen."></page-header>
        <div class="w-full mt-5 pb-20">
            <div class="flex justify-center">
                <button-component class="mx-auto font-bold" @click="addExerciseIfActive()">Übung hinzufügen</button-component>
            </div>
            <workout-history />
        </div>
    </div>
    <add-exercise-modal :modal-opened="addExerciseModalOpened" @close-modal="addExerciseModalOpened = false"></add-exercise-modal>
  </Layout>
</template>
  
<script lang="ts" setup>
import Layout from '@/components/common/PageLayout.vue';
import PageHeader from '@/components/common/PageHeader.vue';
import ButtonComponent from '@/components/common/ButtonComponent.vue';
import WorkoutHistory from '@/components/workout_history/WorkoutHistory.vue';
import AddExerciseModal from '@/components/exercises/AddExerciseModal.vue';
import { ref } from 'vue';
import axios from 'axios';
import { Preferences } from '@capacitor/preferences';
import { toastController } from '@ionic/core';

const addExerciseModalOpened = ref(false);
const isActiveTraining = ref(false);

const token = ref()

async function getToken() {
    const { value } = await Preferences.get({ key: 'token' });
    token.value = value;
}

getToken()

function addExerciseIfActive() {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`;
    axios.get('http://localhost:3000/training/isActive/active')
    .then(function (response) {
        if(response.data) {
            addExerciseModalOpened.value = true
        } else {
            errorInfo()
        }
    })
    .catch(function (error) {
        console.log(error);
    })
}

async function errorInfo() {
    const toast = await toastController.create({
      message: 'Bitte starten Sie davor ein Training',
      duration: 3000,
      cssClass: 'z-index: 999',
      position: 'top',
      color: 'primary',
    })
    await toast.present()
}

</script>