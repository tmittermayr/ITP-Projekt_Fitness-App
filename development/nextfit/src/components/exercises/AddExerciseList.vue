<template>
    <div class="my-5 text-center">
        <h2>Add an Exercise</h2>
    </div>
    <ion-list>
        <exercise-item v-for="(exercise, index) in exercises" :key="index" :exersise="exercise"></exercise-item>
    </ion-list>
</template>

<script lang="ts" setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { IonList } from '@ionic/vue';
import ExerciseItem from './ExerciseItem.vue';

const exercises = ref([]);

const fetchExercises = async () => {
    await axios
        .get('http://localhost:3000/exercise')
        .then((response) => {
            exercises.value = response.data
        })
}

onMounted(() => fetchExercises());
</script>