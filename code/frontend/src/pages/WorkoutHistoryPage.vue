<template>
  <Layout>
    <div class="bg-gray-100 w-full min-h-full absolute top-0 left-0 p-5">
        <page-header title="Trainingsübersicht" description="Hier können Sie ihre letzten Trainings anschauen."></page-header>
        <div class="w-full mt-5 pb-20">
            <div class="flex justify-center">
                <button-component class="mx-auto font-bold" @click="!store.state.isActive ? error() : addExerciseModalOpened = true">Übung hinzufügen</button-component>
            </div>
            <div class="flex mt-5">
                <button class="p-2 px-5 rounded-l-lg text-white font-bold w-full" :class="pageSelected == 'trainings' ? 'bg-orange-300' : 'bg-orange-400'" @click="pageSelected = 'trainings-plan'">
                    Trainingsplan
                </button>
                <button class="p-2 px-5 rounded-r-lg text-white font-bold w-full" :class="pageSelected == 'trainings' ? 'bg-orange-400' : 'bg-orange-300'" @click="pageSelected = 'trainings'">
                    Training
                </button>
            </div>
            <workout-history v-if="pageSelected == 'trainings'"/>
            <trainings-plan v-if="pageSelected == 'trainings-plan'" />
        </div>
    </div>
    <add-exercise-modal :modal-opened="addExerciseModalOpened" @close-modal="addExerciseModalOpened = false" v-if="isFromPlan == 'false'"></add-exercise-modal>
    <add-exercise-modal-plan :modal-opened="addExerciseModalOpened" @close-modal="addExerciseModalOpened = false" v-else></add-exercise-modal-plan>
  </Layout>
</template>
  
<script lang="ts" setup>
import Layout from '@/components/common/PageLayout.vue';
import PageHeader from '@/components/common/PageHeader.vue';
import ButtonComponent from '@/components/common/ButtonComponent.vue';
import WorkoutHistory from '@/components/workout_history/WorkoutHistory.vue';
import TrainingsPlan from '@/components/workout_history/TrainingsPlan.vue';
import AddExerciseModal from '@/components/exercises/AddExerciseModal.vue';
import AddExerciseModalPlan from '@/components/exercises/AddExercisePopUp.vue';
import { ref, computed, onMounted } from 'vue';
import store from '@/store/store';
import { error } from '@/services/Toastification'
import { TrainingsInformation } from '../services/TrainingsInformation';
import { Preferences } from '@capacitor/preferences';

const addExerciseModalOpened = ref(false);

const pageSelected = ref('trainings')

const isFromPlan = ref("false")

onMounted(async () => {
    isFromPlan.value = (await Preferences.get({ key: 'isFromPlan'})).value;
    console.log(isFromPlan);
    
})

</script>