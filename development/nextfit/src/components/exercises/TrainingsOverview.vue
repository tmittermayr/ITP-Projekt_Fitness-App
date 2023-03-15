<template>
    <div class="px-3 mt-5">
        <h2 class="font-semibold">{{ training.title }}</h2>
        <p>{{ timer }}</p>

    </div>
</template>
<script lang="ts" setup>
import store from '@/store/store';
import { computed, onMounted } from 'vue';

const training = store.state.trainingsInformation

console.log(training);

const timer = setInterval(() =>  (new Date()).valueOf() - (new Date(training.startdatetime)).valueOf(), 1000)



</script>