<template>
    <router-link
        :to="{
            name: 'WorkoutDetail',
            params: {
                id: workout._id
            }
        }">
    <div class="bg-white p-5 rounded-lg flex justify-between items-center shadow-lg text-black">
        <div>
            <h2 class="text-xl mb-1 mt-0">{{ props.workout?.title }}</h2>
            <p>Ganzkörper</p>
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
})
</script>