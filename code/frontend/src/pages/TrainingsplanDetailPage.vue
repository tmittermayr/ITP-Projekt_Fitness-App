<template>
    <Layout>
        <ion-button router-link="/workouts" router-direction="back"  class="absolute left-2 top-3">
                <ion-icon :icon="chevronBackOutline" size="large"/>
        </ion-button>
        <div class="pt-14 flex px-10 flex-col gap-5 bg-gray-100 min-h-screen">
            <h2 class="font-semibold text-3xl text-center text-orange-400">{{ workout?.title }}</h2>
            <div class="flex flex-col items-center">
                <button-component @click="startPlan(workout._id)" v-if="!active">Trainingsplan starten</button-component>
                <p class="text-red-500" v-else>Es ist bereits ein Training gestartet.</p>
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
import { computed, onMounted, ref } from 'vue';
import { useRoute } from "vue-router";
import Layout from '@/components/common/PageLayout.vue';
import { chevronBackOutline } from 'ionicons/icons';
import { IonIcon } from '@ionic/vue';
import { IonButton } from '@ionic/vue';
import ButtonComponent from '@/components/common/ButtonComponent.vue';
import { useStore } from 'vuex';
import { Preferences } from '@capacitor/preferences';

const route = useRoute()
const token = ref()

function getWorkout(token: string) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    axios.get('http://localhost:8080/api/trainings/user/' + route.params.id)
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

async function startPlan(id: string) {
    training.startPlan(id)

    await Preferences.set({ key: 'isFromPlan', value: 'true' });
}

const training = new TrainingsInformation()

training.getToken().then((value) => {
    getWorkout(value)
    token.value = value
})

const store = useStore()

const active = computed(() => {
    return store.state.isActive
})

const workout = ref()
</script>