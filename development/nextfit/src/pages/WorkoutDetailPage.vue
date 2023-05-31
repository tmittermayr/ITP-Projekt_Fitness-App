<template>
    <Layout>
        <div class="pt-14 flex px-10 flex-col gap-5 bg-gray-100 min-h-screen">
            <h2 class="font-semibold text-3xl text-center text-orange-400">{{ workout?.title }}</h2>
            <div class="flex flex-col items-center">
                <div>
                    <div v-for="(exercise, index) in workout?.exerciseids" :key="index" class="mb-10">
                        <h2>{{ exercise?.exerciseid }}</h2>
                        <div v-for="(set, index) in exercise?.sets" :key="index" class="flex gap-5 items-center justify-between my-2">
                            <h3 class="m-0">{{ index + 1 }}</h3>
                            <input type="text" disabled class="bg-gray-100 rounded border-gray-200 border-2 w-10 h-8 text-lg text-center" placeholder="10" :value="set.reps" >
                            <div class="flex gap-1">
                                <input type="text" disabled class="bg-gray-100 rounded border-gray-200 border-2 w-14 h-8 text-lg text-center" placeholder="80" :value="set.weight" >
                                <p class="text-lg">kg</p>
                            </div>
                            <select name="type" class="bg-gray-100 rounded border-gray-200 border-2" >
                                <option value="warmup">Aufwärmen</option>
                                <option value="superset">Superset</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
</template>

<script lang="ts" setup>
import { TrainingsInformation } from '@/services/TrainingsInformation';
import axios from 'axios';
import { ref } from 'vue';
import { useRoute } from "vue-router";
import Layout from '@/components/common/PageLayout.vue';

const route = useRoute()

function getWorkout(token: string) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    axios.get('http://localhost:3000/training/' + route.params.id)
    .then(function (response) {
        console.log(response);
        
        workout.value = response.data
        console.log(workout.value);
        
    })
    .catch(function (error) {
        console.log(error);
    })
}

const training = new TrainingsInformation()

training.getToken().then((value) => {
    getWorkout(value)
})

const workout = ref()
</script>