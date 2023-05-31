<template>
    <div class="px-3 mt-5 text-center" v-if="!addExerciseListOpened">
        <div class="mb-10">
            <h2 class="font-semibold">{{ training.title }}</h2>
        </div>
        <div class="flex flex-col items-center">
            <div>
                <div v-for="(exercise, index) in exercises" :key="index" class="mb-10">
                    <h2>{{ exercise.id }}</h2>
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
                    <div class="flex gap-5 items-center justify-between my-2">
                        <h3 class="m-0">{{ exercise?.sets.length + 1 }}</h3>
                        <input type="text" class="bg-gray-100 rounded border-gray-200 border-2 w-10 h-8 text-lg text-center" placeholder="10" v-model="currentReps" >
                        <div class="flex gap-1">
                            <input type="text" class="bg-gray-100 rounded border-gray-200 border-2 w-14 h-8 text-lg text-center" placeholder="80" v-model="currentWeight"  >
                            <p class="text-lg">kg</p>
                        </div>
                        <select name="type" class="bg-gray-100 rounded border-gray-200 border-2" >
                            <option value="warmup">Aufwärmen</option>
                            <option value="superset">Superset</option>
                        </select>
                    </div>
                    <div class="flex justify-end">
                        <Button @click="addSet(exercise?.id)" v-show="isValid">Speichern</Button>
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

const training = store.state.trainingsInformation
const addExerciseListOpened = ref(false)

const exercises = ref([])

onMounted(() => {
    for(let i = 0; i < training.exerciseids.length; i++) {
        exercises.value.push({
            id: training.exerciseids[i].exerciseid,
            sets: [],
        })
    }
    console.log(exercises.value);
})

function saveSets() {
    console.log("a");
}

const currentReps = ref('')
const currentWeight = ref('')

const isValid = computed(() => {
    if(currentReps.value != '' && currentWeight.value != '') {
        return true
    }
    return false
})

const isSetOpen = ref(true)

function addSet(id: string) {
    console.log(currentWeight.value);
    
    for(let i = 0; i < exercises.value.length; i++) {
        if(training.exerciseids[i].exerciseid == id) {
            exercises.value[i].sets.push({ weight: currentWeight.value, reps: currentReps.value })
        }
    }
    currentReps.value = ''
    currentWeight.value = ''
    
}


</script>