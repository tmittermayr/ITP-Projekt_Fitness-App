<template>
    <Layout>
        <ion-button router-link="/workouts" router-direction="back"  class="absolute left-2 top-3">
                <ion-icon :icon="chevronBackOutline" size="large"/>
        </ion-button>
        <div class="pt-14 flex px-10 flex-col gap-5 bg-gray-100 min-h-screen">
            <h2 class="font-semibold text-3xl text-center text-orange-400">{{ workout?.title }}</h2>
            <div class="flex justify-center">
                <button-component v-if="!workout?.isTrainingsPlan" @click="openPlanAlert()">Trainingsplan erstellen</button-component>
                <p class="text-green-500 text-lg" v-else>Ist bereits ein Trainingsplan.</p>
            </div>
         
            <div class="flex flex-col items-center">
                <div>
                    <div v-for="(exercise, index) in workout?.exerciseids" :key="index" class="mb-10">
                        <h2 class="uppercase text-orange-400 mb-4 font-bold">{{ exercise?.name }}</h2>
                        <div v-for="(set, index) in exercise?.sets" :key="index" class="flex gap-5 items-center justify-between my-2">
                            <h3 class="m-0">{{ index + 1 }}</h3>
                            <input type="text" disabled class="bg-gray-100 rounded border-gray-200 border-2 w-10 h-8 text-lg text-center" placeholder="10" :value="set.reps" >
                            <div class="flex gap-1">
                                <input type="text" disabled class="bg-gray-100 rounded border-gray-200 border-2 w-14 h-8 text-lg text-center" placeholder="80" :value="set.weight" >
                                <p class="text-lg">kg</p>
                            </div>
                            <select name="type" class="bg-gray-100 rounded border-gray-200 border-2" v-model="set.attribute" disabled>
                                <option value="standard">Standard</option>
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
import { onMounted, ref } from 'vue';
import { useRoute } from "vue-router";
import Layout from '@/components/common/PageLayout.vue';
import { chevronBackOutline, create } from 'ionicons/icons';
import { IonIcon, alertController } from '@ionic/vue';
import ButtonComponent from '@/components/common/ButtonComponent.vue';
import router from "@/router";
import { IonAlert, IonButton } from '@ionic/vue';

async function openPlanAlert(){
            const alert = await alertController.create({
                header: 'Name für deinen Trainingsplan:',
                buttons: [
                    {
                        text: 'Abbrechen',
                        role: 'cancel'
                    },
                    {
                        text: 'Speichern',
                        role: 'confirm',
                    }
                ],
                inputs: [
                    {
                        placeholder: 'Name',
                    }
                ]
            });
            
            await alert.present();
            
            const result = await alert.onDidDismiss();
            
            if(result.role == 'confirm') {
                createTrainingsplan(workout.value._id, result.data.values[0])
            }
            
        }

const route = useRoute()
const token = ref()

function getWorkout(token: string) {
    axios.get('http://localhost:8080/api/trainings/' + route.params.id)
    .then(function (response) {
        workout.value = response.data
        console.log(workout.value);
        assignNames()
    })
    .catch(function (error) {
        console.log(error);
    })
}

async function getName(id: string) {
    return await axios.get('http://localhost:8080/api/exercise/' + id)
    .then(async function (response) {
        return response.data.name
    })
    .catch(function (error) {
        console.log(error);
    })
}

async function assignNames() {
    for(const exercise of workout.value.exerciseids) {
        exercise.name = await getName(exercise.exerciseid)
    }
}

async function createTrainingsplan(id: string, name: string) {    
    console.log(id, name);
    await axios.patch('http://localhost:8080/api/training/' + id + 'to-plan', {
        title: name == '' ? workout.value.title : name
    })
    .then(async function (response) {
        router.push('/workouts')
    })
    .catch(function (error) {
        console.log(error);
    })
}

const training = new TrainingsInformation()

training.getToken().then((value) => {
    getWorkout(value)
    token.value = value
})

const workout = ref()
</script>