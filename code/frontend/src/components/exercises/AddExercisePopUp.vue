<template>
    <ion-modal :isOpen="props.modalOpened">
        <ion-header>
            <ion-toolbar>
                <ion-button class="mr-2" @click="emit('close-modal')" slot="end">Schließen</ion-button>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <div>
                <p class="text-center text-orange-500 font-bold mb-2">{{ currentExercise + 1 }} / {{ exercises.length }}</p>
                <div class="border-2 border-orange-500 mb-5" :style="progressWidthStyle"></div>
            </div>
            <h2 class="font-semibold">{{ training.title }}</h2>
            <div>
                <h2 class="text-center font-bold">{{ exercises[currentExercise].name }}</h2>
                <img :src="image" class="w-72 mx-auto" />
                <h3 class="text-center">Satz {{ setAmount }}:</h3>
                <div class="mb-5 flex justify-between">
                    <div class="flex flex-col items-center gap-2">
                        <p>Gewicht</p>
                        <input placeholder="80" class="px-5 py-2 bg-gray-100 rounded-lg border-2 w-1/3 text-center" :class="weightInputError ? 'border-red-500' : 'border-gray-200'" v-model="weight" />
                    </div>
                    <div class="flex flex-col items-center gap-2">
                        <p>Wiederholungen</p>
                        <input placeholder="10" class="px-5 py-2 bg-gray-100 rounded-lg border-2 border-gray-200 w-1/3 text-center" :class="repsInputError ? 'border-red-500' : 'border-gray-200'" v-model="reps" />
                    </div>
                </div>
                <div class="flex flex-col items-center gap-5">
                    <button-component @click="addSet()">Weiter</button-component>
                    <p class="text-orange-500" @click="nextExercise()">Übung beenden</p>
                </div>
            </div>
        </ion-content>
    </ion-modal>
</template>

<script lang="ts" setup>
import { TrainingsInformation } from '@/services/TrainingsInformation';
import store from '@/store/store';
import { IonModal, IonHeader, IonContent, IonToolbar, IonButton } from '@ionic/vue';
import axios from 'axios';
import { onMounted, ref } from 'vue';
import ButtonComponent from '../common/ButtonComponent.vue';

const props = defineProps({
    modalOpened: Boolean,
})
const emit = defineEmits(['close-modal'])

const training = new TrainingsInformation()

const exercises = ref<Exercise[]>([])

const currentExercise = ref(0)
const setAmount = ref(1)

const weight = ref()
const reps = ref()

const weightInputError = ref(false)
const repsInputError = ref(false)

onMounted(() => {
    training.getCurrentTraining().then(() => {
        assignExercises(store.state.trainingsInformation);
    })
})

interface Set {
    weight: string,
    reps: string,
    attribute: string,
}

interface Exercise {
    id: string,
    name: string,
}

const image = ref("")

async function getImage() {
    await axios.get('https://student.cloud.htl-leonding.ac.at/nextfit/api/exercise/' + exercises.value[currentExercise.value].id)
    .then(async function (response) {
        image.value = `nextfit-gifs/${response.data.gifId}.gif`
    })
    .catch(function (error) {
        console.log(error);
    })
}

const token = ref()

training.getToken().then((value) => {
    token.value = value
})

async function assignExercises(training1) {
    exercises.value = []
    for(let i = 0; i < training1.exerciseids?.length; i++) {
        exercises.value[i] = ({
            id:  training1.exerciseids[i].exerciseid,
            name: await getName(training1.exerciseids[i].exerciseid),
        })   
    }
    getImage()
    calcProgressWidth()
}

async function getName(id: string) {
    return await axios.get('https://student.cloud.htl-leonding.ac.at/nextfit/api/exercise/' + exercises.value[currentExercise.value].id)
    .then(async function (response) {
        return response.data.name
    })
    .catch(function (error) {
        console.log(error);
    })
}

function addSet() {
    if(!weight.value && !reps.value) {
        weightInputError.value = true
        repsInputError.value = true
    } else if(!weight.value) {
        weightInputError.value = true
    } else if(!reps.value) {
        repsInputError.value = true
    } else {
        const data = {
        'weight': Number.parseInt(weight.value),
        'reps': Number.parseInt(reps.value),
        'attribute': 'standard',
        'exerciseid': exercises.value[currentExercise.value].id,
        }

        weightInputError.value = false
        repsInputError.value = false

        setAmount.value++
        
        training.addSetToExercise(data)
    }
}

function nextExercise() {
    if(exercises.value.length == currentExercise.value) {
        return
    }
    currentExercise.value++
    setAmount.value = 1;
    calcProgressWidth()
    getImage()
}

const progressWidth = ref(0)
const progressWidthStyle = ref('')

function calcProgressWidth() {
    console.log(currentExercise.value + 1);
    console.log(exercises.value.length);
    
    
    progressWidth.value = 100 * ((currentExercise.value + 1) / exercises.value.length)

    progressWidthStyle.value = `width: ${progressWidth.value}%`
}


</script>