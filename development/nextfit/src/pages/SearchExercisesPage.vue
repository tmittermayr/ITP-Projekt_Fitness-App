<template>
    <Layout>
        <h1 class="text-orange-400">Übungen</h1>
        <ion-searchbar placeholder="Suchen" color="light"></ion-searchbar>
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
                <h2 class="text-center">{{ currentExercise.name }}</h2>
                <p>{{ currentExercise.description }}</p>
            </ion-content>
        </ion-modal>
    </Layout>
</template>
<script lang="ts" setup>
import Layout from '@/components/common/PageLayout.vue';
import ExerciseItem from '@/components/exercises/ExerciseItem.vue'
import { IonSearchbar, IonModal, IonHeader, IonToolbar, IonButton, IonContent } from '@ionic/vue';
import { ref } from 'vue';

interface Exercise {
    name: string,
    category: string,
    description: string,
}


const exercises : Array<Exercise> = [
    {
        name: "Bankdrücken",
        category: "Brust",
        description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
    },
    {
        name: "Bankdrücken",
        category: "Brust",
        description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
    },
    {
        name: "Bankdrücken",
        category: "Brust",
        description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
    },
    {
        name: "Bankdrücken",
        category: "Brust",
        description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
    },
]
const currentExercise = ref({});
const modalOpened = ref(false);

function openExercise(exercise: object) {
    modalOpened.value = true;
    currentExercise.value = exercise;
}

</script>