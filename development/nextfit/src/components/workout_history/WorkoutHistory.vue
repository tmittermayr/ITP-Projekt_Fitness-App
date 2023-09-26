<template>
    <div class="flex justify-between p-3">
                <button-component  @click="changeComponent(true)">Trainings Pläne</button-component>
                <button-component  @click="changeComponent(false)">Letzte Trainings</button-component>
    </div>
    <div class="mt-14 flex flex-col gap-5">
        <div v-for="(workout, index) in workouts" :key="index" >
            <workout-item :workout="workout" v-if="currentComponent == workout.isTrainingsPlan"/>
        </div>
    </div>
</template>

<script lang="ts" setup>
import WorkoutItem from '@/components/workout_history/WorkoutItem.vue'
import { TrainingsInformation } from '@/services/TrainingsInformation';
import ButtonComponent from '@/components/common/ButtonComponent.vue';
import { Preferences } from '@capacitor/preferences';
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

const currentComponent = ref(true)

function changeComponent(component : boolean) {
  currentComponent.value = component;
}

</script>