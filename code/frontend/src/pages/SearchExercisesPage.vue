<template>
    <Layout>
        <div class="flex flex-col w-full h-full px-5">
            <page-header title="Übungen"></page-header>
            <ion-searchbar v-model="input" placeholder="Suchen" color="light" class="text-left my-2"></ion-searchbar>
            <ion-list class="pb-20">
                <exercise-item v-for="(exercise, index) in filteredExercises()" :key="index" :exersise="exercise"
                    @click="openExercise(exercise)"></exercise-item>
            </ion-list>
        </div>
        <ion-modal :isOpen="modalOpened">
            <ion-header>
                <ion-toolbar>
                    <ion-button class="mr-2" @click="modalOpened = false" slot="end">Schließen</ion-button>
                </ion-toolbar>
            </ion-header>
            <ion-content>
                <h2 class="text-center uppercase">{{ currentExercise.name }}</h2>
                <div class="px-5 flex flex-col gap-5">
                    <p><span class="font-bold">Kategorie:</span> {{ currentExercise.target }}</p>
                    <p><span class="font-bold">Equipment:</span> {{ currentExercise.equipment }}</p>
                    <img :src="currentGif" class="mt-5 rounded-xl" alt="Exercise Preview" />
                </div>
            </ion-content>
        </ion-modal>
    </Layout>
</template>
<script lang="ts" setup>
import Layout from '@/components/common/PageLayout.vue';
import PageHeader from '@/components/common/PageHeader.vue';
import ExerciseItem from '@/components/exercises/ExerciseItem.vue'
import { IonSearchbar, IonModal, IonHeader, IonToolbar, IonButton, IonContent, IonList } from '@ionic/vue';
import { ref, onMounted } from 'vue';
import axios from 'axios'

const exercises = ref([]);

const fetchExercises = async () => {
    await axios
        .get('http://localhost:8080/api/exercise/get-all')
        .then((response) => {
            console.log(response.data);
            
            exercises.value = response.data
        })
}


onMounted(() => fetchExercises());

const input = ref('');

function filteredExercises() {
    if(input.value != '') {
        return exercises.value.filter((element) => 
            element.name.toLowerCase().includes(input.value.toLowerCase())
        )
    } else {
        return exercises.value
    }
}

const currentExercise = ref({});
const currentGif = ref("");
const modalOpened = ref(false);

function openExercise(exercise: object) {
    currentExercise.value = exercise
    modalOpened.value = true;
    const gif = `nextfit-gifs/${ exercise.gifId}.gif`;
    currentGif.value = gif
}

</script>