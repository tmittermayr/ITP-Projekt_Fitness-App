<template>
    <div class="px-3 mt-5 text-center" v-if="!addExerciseListOpened">
        <div class="mb-10">
            <h2 class="font-semibold">{{ training.title }}</h2>
            <p class="text-red-500">{{ timer }}</p>
        </div>
        <div class="flex flex-col items-center">
            <div>
                
            </div>
            <Button class="w-full" @click="addExerciseListOpened = true">Übung auswählen</Button>
        </div>
    </div>
    <add-exercise-list v-else @close-modal="addExerciseListOpened = false"></add-exercise-list>
</template>
<script lang="ts" setup>
import store from '@/store/store';
import { ref } from 'vue';
import Button from '../common/ButtonComponent.vue';
import AddExerciseList from './AddExerciseList.vue';


const training = store.state.trainingsInformation
const timer = ref('...')
const addExerciseListOpened = ref(false)

window.setInterval(function(){
    // get total seconds between the times
    let delta = Math.abs((new Date(training.startdatetime)).getSeconds() - new Date().getSeconds());
    
    // calculate (and subtract) whole hours
    const hours = Math.floor(delta / 3600) % 24;
    delta -= hours * 3600;
    

    // calculate (and subtract) whole minutes
    const minutes = Math.floor(delta / 60) % 60;
    delta -= minutes * 60;

    // what's left is seconds
    const seconds = delta;  // in theory the modulus is not required
    if(hours < 10) {
        if(minutes < 10) {
            if(seconds < 10) {
                timer.value = '0' + hours + ':0' + minutes + ":0" + seconds
            } else {
                timer.value = '0' + hours + ':0' + minutes + ":" + seconds
            }
        } else {
            if(seconds < 10) {
                timer.value = '0' + hours + ':' + minutes + ":0" + seconds
            } else {
                timer.value = '0' + hours + ':' + minutes + ":" + seconds
            }
            
        }
    } else if(seconds < 10) {
        timer.value = hours + ':0' + minutes + ":" + seconds
    } else {
        timer.value = hours + ':' + minutes + ":" + seconds
    }
}, 500);


</script>