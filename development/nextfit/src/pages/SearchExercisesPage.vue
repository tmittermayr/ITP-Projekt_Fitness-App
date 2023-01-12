<template>
    <Layout>
        <page-header title="Übungen">
            <ion-searchbar placeholder="Suchen" color="light" class="text-left"></ion-searchbar>
        </page-header>
        <ion-list>
            <exercise-item v-for="(exercise, index) in exercises" :key="index" :exersise="exercise"
                @click="openExercise(exercise)"></exercise-item>
        </ion-list>
        <ion-modal :isOpen="modalOpened">
            <ion-header>
                <ion-toolbar>
                    <ion-button @click="modalOpened = false" slot="end">Schließen</ion-button>
                </ion-toolbar>
            </ion-header>
            <ion-content>
                <div class="px-5 flex flex-col gap-5">
                    <h2 class="text-center">{{ currentExercise.name }}</h2>
                    <p>Kategorie: {{ currentExercise.target }}</p>
                    <p>Equipment: {{ currentExercise.equipment }}</p>
                    <img :src="currentGif" class="mt-10 rounded-xl" />
                </div>
                
            </ion-content>
        </ion-modal>
    </Layout>
</template>
<script lang="ts" setup>
import Layout from '@/components/common/PageLayout.vue';
import PageHeader from '@/components/common/PageHeader.vue';
import ExerciseItem from '@/components/exercises/ExerciseItem.vue'
import { IonSearchbar, IonModal, IonHeader, IonToolbar, IonButton, IonContent } from '@ionic/vue';
import { ref, onMounted } from 'vue';
import axios from 'axios'

const exercises = ref();

const fetchExercises = async () => {
    await axios
        .get('http://localhost:3000/exercise')
        .then((response) => {
            console.log(response.data);
            exercises.value = response.data
        })
}

onMounted(() => fetchExercises());

const currentExercise = ref({});
const currentGif = ref("");
const modalOpened = ref(false);

function openExercise(exercise: object) {
    modalOpened.value = true;
    currentExercise.value = exercise;
    currentGif.value = `http://d205bpvrqc9yn1.cloudfront.net/${("000" + exercise.gifid).slice(-4)}.gif`;
}

</script>