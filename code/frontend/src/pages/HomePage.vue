<template>
    <Layout>
        <div class="p-5 bg-gray-100 w-full min-h-full absolute top-0 left-0 px-5">
            <page-header title="NextFit"></page-header>
            <p class="font-semibold">Willkommen zurück {{ user.firstname }}.</p>

            <div class="mt-10 flex flex-col gap-5 mb-20">
                <IonDatetime></IonDatetime>
                <LineChart v-if="currentComponent == 'LineChart'" />
                <ChartBar v-if="currentComponent == 'ChartBar'" />
                <!--<div class="flex justify-between">
                    <ButtonComponent  @click="changeComponent('LineChart')">Trainierte Minuten</ButtonComponent>
                    <ButtonComponent  @click="changeComponent('ChartBar')">Muskelgruppen</ButtonComponent>
                </div>-->
            </div>
        </div>
    </Layout>
</template>

<script lang="ts" setup>
import Layout from '@/components/common/PageLayout.vue';
import PageHeader from '@/components/common/PageHeader.vue';
import LineChart from '@/components/home/LineChart.vue';
import ChartBar from '@/components/home/ChartBar.vue';
import { Preferences } from '@capacitor/preferences';
import { ref } from 'vue';
import ButtonComponent from '@/components/common/ButtonComponent.vue';
import IonDatetime from '@/components/home/Ion-datetime.vue';

interface User {
    id: string,
    firstname: string,
    lastname: string,
    email: string,
}

const user = ref<User>({
    id: '',
    firstname: '',
    lastname: '',
    email: '',
})

async function getToken() {
    const { value } = await Preferences.get({ key: 'token' });

    user.value = parseJwt(value || '').user
}

function parseJwt (token: string) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    console.log(JSON.parse(jsonPayload));
    

    return JSON.parse(jsonPayload);
}

getToken()

const currentComponent = ref('ChartBar')

function changeComponent(component : string) {
  currentComponent.value = component;
}

</script>