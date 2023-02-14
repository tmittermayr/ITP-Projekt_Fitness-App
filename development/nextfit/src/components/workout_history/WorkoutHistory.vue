<template>
    <div class="mt-14 flex flex-col gap-5">
        <workout-item v-for="(workout, index) in workouts" :key="index" :workout="workout" />
    </div>
</template>

<script lang="ts" setup>
import WorkoutItem from '@/components/workout_history/WorkoutItem.vue'
import { Preferences } from '@capacitor/preferences';
import axios from 'axios';
import { ref } from 'vue';

function getWorkouts(token: string) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    axios.get('http://localhost:3000/training')
    .then(function (response) {
        workouts.value = response.data.reverse()
    })
    .catch(function (error) {
        console.log(error);
    })
}

async function getToken() {
    const { value } = await Preferences.get({ key: 'token' });
    getWorkouts(value)
}

getToken()

const workouts = ref()
</script>