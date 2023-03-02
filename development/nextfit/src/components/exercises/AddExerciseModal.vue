<template>
    <ion-modal :isOpen="props.modalOpened">
        <ion-header>
            <ion-toolbar>
                <ion-button class="mr-2" @click="emit('close-modal')" slot="end">Schließen</ion-button>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <add-exercise-list />
        </ion-content>
    </ion-modal>
</template>

<script lang="ts" setup>
import { IonModal, IonHeader, IonContent, IonToolbar, IonButton } from '@ionic/vue';
import AddExerciseList from './AddExerciseList.vue';

const props = defineProps({
    modalOpened: Boolean,
})
const emit = defineEmits(['close-modal'])


</script>