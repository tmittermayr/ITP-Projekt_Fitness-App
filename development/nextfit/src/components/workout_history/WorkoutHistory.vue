<template>
    <div class="mt-14 flex flex-col gap-5">
        <workout-item v-for="(workout, index) in workouts" :key="index" :workout="workout" />
    </div>
</template>

<script lang="ts" setup>
import WorkoutItem from '@/components/workout_history/WorkoutItem.vue'

const workouts = [
    {
        name: "Training am 06/02/2023",
        type: "Rücken, Bizeps",
    },
    {
        name: "Training am 05/02/2023",
        type: "Brust, Schultern, Trizeps",
    },
    {
        name: "Training am 03/02/2023",
        type: "Beine",
    },
    {
        name: "Training am 20/01/2023",
        type: "Brust, Schultern, Trizeps",
    }
]
</script>