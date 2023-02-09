<template>
    <div class="bg-white p-5 rounded-lg flex justify-between items-center shadow-lg">
        <div>
            <h2 class="text-xl mb-1 mt-0">{{ props.workout?.name }}</h2>
            <p>{{ props.workout?.type }}</p>
        </div>
        <ion-icon :icon="chevronForwardOutline" size="large" />
    </div>
</template>

<script lang="ts" setup>
import { IonIcon } from '@ionic/vue';
import { chevronForwardOutline } from 'ionicons/icons';

const props = defineProps({
    workout: Object,
})
</script>