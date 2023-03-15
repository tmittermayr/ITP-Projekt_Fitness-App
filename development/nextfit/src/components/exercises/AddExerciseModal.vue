<template>
    <ion-modal :isOpen="props.modalOpened">
        <ion-header>
            <ion-toolbar>
                <ion-button class="mr-2" @click="emit('close-modal')" slot="end">Schließen</ion-button>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <trainings-overview />
        </ion-content>
    </ion-modal>
</template>

<script lang="ts" setup>
import { TrainingsInformation } from '@/services/TrainingsInformation';
import { IonModal, IonHeader, IonContent, IonToolbar, IonButton } from '@ionic/vue';
import { onMounted, ref } from 'vue';
import TrainingsOverview from './TrainingsOverview.vue';

const props = defineProps({
    modalOpened: Boolean,
})
const emit = defineEmits(['close-modal'])

const training = new TrainingsInformation()

onMounted(() => {
    training.getCurrentTraining()
})

</script>