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
                <Button class="font-bold" @click="updateUser()">Speichern</Button>
                <router-link to="change-password" class="text-orange-400 my-5">Passwort ändern?</router-link>
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
import axios from 'axios';

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

    await getUser(value)
}

async function getUser(id : string | null)  {
    await axios.get('http://localhost:8080/api/users/' + id)
        .then(function (response) {
            user.value = response.data
        })
        .catch(function (error) {
            console.log(error);
        })
}

async function updateUser() {
    console.log(user.value);
    
    await axios.put('http://localhost:8080/api/users', user.value)
        .then(function (response) {
            user.value = response.data
        })
        .catch(function (error) {
            console.log(error);
        })
}

getToken()
</script>