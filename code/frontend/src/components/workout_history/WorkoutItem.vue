<template>
    <router-link
        :to="props.isPlan ? {
            name: 'TrainingsplanDetail',
            params: {
                id: workout._id
            }
        } : {
            name: 'WorkoutDetail',
            params: {
                id: workout._id
            }
        }">
    <div class="bg-white p-5 rounded-lg flex justify-between items-center shadow-lg text-black">
        <div>
            <h2 class="text-xl mb-1 mt-0">{{ props.workout?.title }}</h2>
            <p>{{ formatDate(props.workout.startdatetime) }}</p>
        </div>
        <ion-icon :icon="chevronForwardOutline" size="large" />
    </div>
</router-link>
</template>

<script lang="ts" setup>
import { IonIcon } from '@ionic/vue';
import { chevronForwardOutline } from 'ionicons/icons';


const props = defineProps({
    workout: Object,
    isPlan: Boolean,
})

function formatDate(date: string) {
    const d = new Date(date);
    const yyyy = d.getFullYear();
    let mm = d.getMonth() + 1;
    let dd = d.getDate();
    let hh = d.getHours();
    let min = d.getMinutes();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    if (hh < 10) hh = '0' + hh;
    if (min < 10) min = '0' + min;

    return dd + '.' + mm + '.' + yyyy + ' ' + hh + ':' + min;
}

</script>