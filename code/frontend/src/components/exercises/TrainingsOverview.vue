<template>
    <div class="px-3 mt-5 text-center" v-if="!addExerciseListOpened">
        <div class="mb-10 flex justify-around items-center">
            <h2 class="font-semibold">{{ training.title }}</h2>
            <ion-button id="click-trigger">
                <ion-icon :icon="informationCircleOutline" size="large"/>
            </ion-button>
            <ion-popover trigger="click-trigger" trigger-action="click" >
                <ion-content class="ion-padding">
                    <img src="assets/info.png" class="rounded-lg" />
                </ion-content>
            </ion-popover>
        </div>
        <div class="flex flex-col items-center">
            <div>
                <div v-for="(e, index) in training.trainingExercise" :key="index" class="mb-10">
                    <h2 class="uppercase text-orange-400 font-bold">{{ e.exercise.name }}</h2>
                    <div v-for="(set, index) in e.set" :key="index" class="flex gap-5 items-center justify-between my-2">
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
                    <div class="flex gap-5 items-center justify-between my-2" v-if="index == training.trainingExercise.length - 1">
                        <h3 class="m-0">{{ e.set.length + 1 }}</h3><!--{{ exercise?.sets.length + 1 }}-->
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
                    <div class="flex justify-end" v-if="index == training.trainingExercise.length - 1">
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
import { computed, ref } from 'vue';
import Button from '../common/ButtonComponent.vue';
import AddExerciseList from './AddExerciseList.vue';
import { TrainingsInformation } from '@/services/TrainingsInformation';
import { IonIcon } from '@ionic/vue';
import { informationCircleOutline } from 'ionicons/icons';
import { IonButton, IonContent, IonPopover } from '@ionic/vue';

const trainingsService = new TrainingsInformation()
const addExerciseListOpened = ref(false)

const training = computed(() => {
    return store.state.trainingsInformation
})

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

  const data = {
    'weight': Number.parseInt(currentWeight.value),
    'reps': Number.parseInt(currentReps.value),
    'attribute': currentType.value,
    'index': 2,
    'training_id': training.value.trainingExercise[training.value.trainingExercise.length - 1].id,
  }

  trainingsService.addSetToExercise(data)

  currentReps.value = ''
  currentWeight.value = ''
  currentType.value = 'standard'
}


/*

onMounted(() => {
  trainingsService.getCurrentTraining()
})

watch((store.state.trainingsInformation), () => {
  console.log(store.state.trainingsInformation)
    assignExercises(store.state.trainingsInformation)
})

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

async function assignExercises(training1) {
    console.log("assign");
    exercises.value = []
    for(let i = 0; i < training1.exerciseids?.length; i++) {
        exercises.value.push({
            id: training1.exerciseids[i].exerciseid,
            sets: training1.exerciseids[i].sets,
            name: await getName(training1.exerciseids[i].exerciseid),
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
    return await axios.get('http://localhost:8080/api/exercise/' + id)
    .then(async function (response) {
        return response.data.name
    })
    .catch(function (error) {
        console.log(error);
    })
}
*/

</script>