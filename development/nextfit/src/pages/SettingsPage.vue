<template>
    <Layout>
        <div class="p-5 bg-gray-100 w-full h-full absolute top-0 left-0 px-5">
            <page-header title="Einstellungen"></page-header>
            <div class="flex flex-col gap-5 mt-10">
                <InputComponent v-model="user.firstname" label="Vorname" />
                <InputComponent v-model="user.lastname" label="Nachname" />
                <InputComponent v-model="user.email" label="Email" />
            </div>
            <div class="flex flex-col gap-5 mt-10">
                <Button class="font-bold">Speichern</Button>
                <router-link to="login" class="text-orange-400 text-center"><Button>Abmelden</Button></router-link>
            </div>
        </div>
    </Layout>
</template>
<script lang="ts" setup>
import Layout from '@/components/common/PageLayout.vue';
import PageHeader from '@/components/common/PageHeader.vue';
import { RouterLink } from 'vue-router';
import InputComponent from '@/components/common/InputComponent.vue';
import { ref } from 'vue';
import { Preferences } from '@capacitor/preferences';
import Button from '@/components/common/ButtonComponent.vue';

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
</script>