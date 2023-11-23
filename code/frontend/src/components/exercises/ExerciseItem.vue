<template>
    <ion-item class="cursor-pointer">
        <div class="px-2 py-2 flex items-center gap-4">
            <img :src="image" class="w-20" />
            <div>
                <h4 class="p-0 m-0">{{ props.exersise?.name }}</h4>
                <p class="text-sm">Kategorie: {{ props.exersise?.target }}</p>
            </div>
        </div>
    </ion-item>
</template>
<script lang="ts" setup>
import { IonItem } from '@ionic/vue';
import { computed, onMounted, ref } from 'vue';

const props = defineProps({
    exersise: Object,
})

const image = ref("")

onMounted(() => {
    const gif = `nextfit-gifs/${ props.exersise?.gifId}.gif`;
    image.value = gif
})


</script>