<template>
    <div class="mt-14 flex flex-col gap-5">
            <workout-item v-for="(workout, index) in workouts" :key="index" v-show="workout.trainingsPlan" :workout="workout" :isPlan="true"/>
    </div>
</template>

<script lang="ts" setup>
import WorkoutItem from '@/components/workout_history/WorkoutItem.vue'
import { TrainingsInformation } from '@/services/TrainingsInformation';
import axios from 'axios';
import { ref } from 'vue';

function getWorkouts(token: string) {
    console.log(token);
    
    axios.get('https://student.cloud.htl-leonding.ac.at/nextfit/api/trainings/user/' + token)
    .then(function (response) {
        workouts.value = response.data.reverse()
        console.log(workouts.value);
    })
    .catch(function (error) {
        console.log(error);
    })
}



const training = new TrainingsInformation()

training.getToken().then((value) => {
    getWorkouts(value)
})

const workouts = ref()
</script>