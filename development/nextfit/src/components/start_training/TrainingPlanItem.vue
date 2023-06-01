<template>
    <div class="flex justify-between border-2 border-gray-200 text-left rounded-lg my-2 px-5 py-5 cursor-pointer shadow hover:bg-gray-200">
        <h6 class="m-0 font-normal tracking-wide">{{ props.plan.name }}</h6>
        <ion-icon :icon="chevronForwardOutline" />
    </div>
</template>

<script lang="ts" setup>
import { IonIcon } from '@ionic/vue';
import { chevronForwardOutline } from 'ionicons/icons';

interface Plan {
    name: string
}

const props = defineProps<{
  plan: Plan
}>()

</script>