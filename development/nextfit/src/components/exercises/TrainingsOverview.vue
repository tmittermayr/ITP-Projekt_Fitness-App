<template>
    <div class="px-3 mt-5 text-center" v-if="!addExerciseListOpened">
        <div class="mb-10">
            <h2 class="font-semibold">{{ training.title }}</h2>
        </div>
        <div class="flex flex-col items-center">
            <div>
                <div v-for="(exercise, index) in exercises" :key="index" class="mb-10">
                    <h2 class="uppercase text-orange-400 mb-4 font-bold">{{ exercise.name }}</h2>
                    <div v-for="(set, index) in exercise?.sets" :key="index" class="flex gap-5 items-center justify-between my-2">
                        <h3 class="m-0">{{ index + 1 }}</h3>
                        <input type="text" disabled class="bg-gray-100 rounded border-gray-200 border-2 w-10 h-8 text-lg text-center" placeholder="10" :value="set.reps" >
                        <div class="flex gap-1">
                            <input type="text" disabled class="bg-gray-100 rounded border-gray-200 border-2 w-14 h-8 text-lg text-center" placeholder="80" :value="set.weight" >
                            <p class="text-lg">kg</p>
                        </div>
                        <select name="type" class="bg-gray-100 rounded border-gray-200 border-2" v-model="set.attribute" disabled >
                            <option value="standard">Standard</option>
                            <option value="warmup">Aufwärmen</option>
                            <option value="superset">Superset</option>
                        </select>
                    </div>
                    <div class="flex gap-5 items-center justify-between my-2" v-if="index == exercises.length - 1">
                        <h3 class="m-0">{{ exercise?.sets.length + 1 }}</h3>
                        <input type="text" class="bg-gray-100 rounded border-gray-200 border-2 w-10 h-8 text-lg text-center" placeholder="10" v-model="currentReps" >
                        <div class="flex gap-1">
                            <input type="text" class="bg-gray-100 rounded border-gray-200 border-2 w-14 h-8 text-lg text-center" placeholder="80" v-model="currentWeight"  >
                            <p class="text-lg">kg</p>
                        </div>
                        <select name="type" class="bg-gray-100 rounded border-gray-200 border-2" v-model="currentType" >
                            <option value="standard">Standard</option>
                            <option value="warmup">Aufwärmen</option>
                            <option value="superset">Superset</option>
                        </select>
                    </div>
                    <div class="flex justify-end" v-if="index == exercises.length - 1">
                        <Button @click="addSet()" v-show="isValid">Speichern</Button>
                    </div>
                </div>
            </div>
            <Button class="w-full" @click="addExerciseListOpened = true">Übung auswählen</Button>
        </div>
    </div>
    <add-exercise-list v-else @close-modal="addExerciseListOpened = false"></add-exercise-list>
</template>
<script lang="ts" setup>
import store from '@/store/store';
import { computed, onMounted, ref } from 'vue';
import Button from '../common/ButtonComponent.vue';
import AddExerciseList from './AddExerciseList.vue';
import { TrainingsInformation } from '@/services/TrainingsInformation';
import axios from 'axios';

const trainingsService = new TrainingsInformation()
const training = store.state.trainingsInformation
const addExerciseListOpened = ref(false)

interface Set {
    weight: string,
    reps: string,
    attribute: string,
}

interface Exercise {
    id: string,
    name: string,
    sets: Array<Set>,
}

const exercises = ref<Exercise[]>([])

onMounted(async () => {
    assignExercises()
})

async function assignExercises() {
    for(let i = 0; i < training.exerciseids.length; i++) {
        exercises.value.push({
            id: training.exerciseids[i].exerciseid,
            sets: training.exerciseids[i].sets,
            name: await getName(training.exerciseids[i].exerciseid),
        })
    }
}

const currentReps = ref('')
const currentWeight = ref('')
const currentType = ref('standard')

const isValid = computed(() => {
    if(currentReps.value != '' && currentWeight.value != '') {
        return true
    }
    return false
})

function addSet() {
    exercises.value[exercises.value.length - 1].sets.push({ weight: currentWeight.value, reps: currentReps.value, attribute: currentType.value })
    
    const data = {
        'weight': Number.parseInt(currentWeight.value),
        'reps': Number.parseInt(currentReps.value),
        'attribute': currentType.value,
        'exerciseid': exercises.value[exercises.value.length - 1].id,
    }
    
    trainingsService.addSetToExercise(data)

    currentReps.value = ''
    currentWeight.value = ''
    currentType.value = 'standard'
}

const token = ref()

trainingsService.getToken().then((value) => {
    token.value = value
})


async function getName(id: string) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`;
    return await axios.get('http://localhost:3000/exercise/name/' + id)
    .then(async function (response) {
        return response.data[0].name
    })
    .catch(function (error) {
        console.log(error);
    })
}


</script>