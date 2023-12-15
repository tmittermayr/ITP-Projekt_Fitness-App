<template>
    <div class="mt-14 flex flex-col gap-5">
            <workout-item v-for="(workout, index) in workouts" :key="index" v-show="workout.isTrainingsPlan" :workout="workout" :isPlan="true"/>
    </div>
</template>

<script lang="ts" setup>
import WorkoutItem from '@/components/workout_history/WorkoutItem.vue'
import { TrainingsInformation } from '@/services/TrainingsInformation';
import axios from 'axios';
import { ref } from 'vue';

function getWorkouts(token: string) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    axios.get('http://localhost:3000/training')
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