<style scoped>
  .block {
    width: 100%;
    height: 70vh;
    color: black;
    padding: 19px;
  }

  ion-modal {
    --height: auto;
    --width: 90%;
  }
</style>

<template>
  <div class="flex w-full justify-center">
    <ion-datetime presentation="date" :highlighted-dates="workout_dates" :value="currentDate" @ionChange="handleDateChange"></ion-datetime>
  </div>
  <ion-modal ref="modalRef" :initial-breakpoint="1" :breakpoints="[0, 1]">
    <div class="block flex flex-col gap-5">
      <h1 class="flex w-full justify-center">Trainings</h1>
      <ul v-if="selectedTrainings && selectedTrainings.length" :key="selectedTrainings._id">
        <li v-for="training in selectedTrainings" :key="training._id" class="border-t-2 border-gray-200 py-3 px-2 underline"  @click="handleTrainingClick(training)">
            {{ training.title }}
        </li>
      </ul>
      <p v-else>No trainings available for the selected date.</p>
    </div>
    <ion-button @click="closeModal" expand="block">Schließen</ion-button>
  </ion-modal>
</template>

<script lang="ts" setup>
import { IonDatetime } from '@ionic/vue';
import { TrainingsInformation } from '@/services/TrainingsInformation';
import axios from 'axios';
import { ref, onBeforeMount, computed } from 'vue';
import { IonModal, IonButton } from '@ionic/vue';
import router from '@/router';

const workout_dates = ref([]);
const currentDate = computed(() => {
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, '0'); 
  const day = today.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
});

const selectedDate = ref(currentDate.value);
const selectedTrainings = ref();
const allWorkouts = ref();

async function getWorkouts(token: string) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  try {
    const response = await axios.get('http://localhost:3000/training');
    const workouts = response.data.reverse();
    allWorkouts.value = workouts;

    const highlightedDates = workouts.map(training => {
      const date_format = training.startdatetime.split("T"); 
      return {
        date: date_format[0],
        textColor: '#09721b',
        backgroundColor: '#c8e5d0',
        trainings: [training]
      };
    });

    workout_dates.value = highlightedDates;
  } catch (error) {
    console.error(error);
  }
}

const training = new TrainingsInformation();

onBeforeMount(async () => {
  const token = await training.getToken();
  await getWorkouts(token);
});

const modalRef = ref();

const openModal = () => {
  const matchingDate = workout_dates.value.find(date => date.date === selectedDate.value);

  if (matchingDate) {
    selectedTrainings.value = allWorkouts.value.filter(workout =>
      workout.startdatetime.split('T')[0] === selectedDate.value
    );

    modalRef.value?.$el.present();
  }
};

const closeModal = () => {
  modalRef.value?.$el.dismiss();
};

const handleDateChange = (event) => {
  selectedDate.value = event.detail.value;
  openModal();
};

const handleTrainingClick = (training) => {
  closeModal();
  router.push(`/workouts/${training._id}`);
};
</script>
