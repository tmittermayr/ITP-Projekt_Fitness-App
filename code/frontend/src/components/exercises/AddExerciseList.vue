<template>
    <ion-icon :icon="chevronBackOutline" class="absolute top-5 left-2" size="large" @click="emit('close-modal')"></ion-icon>
    <div class="my-5 text-center">
        <h2>Übungen hinzufügen</h2>
    </div>
    <ion-list class="mr-5 mb-20">
        <exercise-item v-for="(exercise, index) in exercises" :key="index" :exersise="exercise" @click="addExercise(exercise._id)"></exercise-item>
    </ion-list>
</template>

<script lang="ts" setup>   
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { IonIcon, IonList } from '@ionic/vue';
import ExerciseItem from './ExerciseItem.vue';
import { chevronBackOutline } from 'ionicons/icons';
import { TrainingsInformation } from '@/services/TrainingsInformation';

const exercises = ref([]);
const training = new TrainingsInformation()

const fetchExercises = async () => {
    await axios
        .get('http://localhost:3000/exercise')
        .then((response) => {
            exercises.value = response.data
        })
}

const emit = defineEmits<{
    (e: 'close-modal'): void
}>()

function addExercise(id: string) {
    training.addExerciseToTraining(id).then(function (response) {
        if(response) {
            training.getCurrentTraining()
            emit('close-modal')
        }
    })
}

onMounted(() => fetchExercises());
</script>