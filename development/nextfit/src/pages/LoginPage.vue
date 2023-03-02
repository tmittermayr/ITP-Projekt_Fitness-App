<template>
    <ion-page>
        <div class="w-full my-auto">
            <h1 class="text-3xl font-bold text-orange-400 text-center">Anmelden</h1>
            <div class="mx-5 flex flex-col gap-5 mt-20">
                <Input placeholder="E-Mail" type="text" v-model="data.email"/>
                <Input placeholder="Passwort" type="password" v-model="data.password" />
                <p class="text-sm text-end">
                    Sie sind noch nicht 
                    <RouterLink to="/register" class="text-orange-400">
                        registriert
                    </RouterLink>
                    ?
                </p>
                <Button @click="submit" class="font-bold text-xl">Anmelden</Button>
            </div> 
        </div>
    </ion-page>
</template>
<script lang="ts" setup>
import Button from '@/components/common/ButtonComponent.vue';
import Input from '@/components/common/InputComponent.vue';
import router from '@/router';
import { IonPage, toastController } from '@ionic/vue';
import axios from 'axios';
import { ref } from 'vue';
import { Preferences } from '@capacitor/preferences';

const data = ref({
    email: '',
    password: '',
})

function submit() {
    loginRequest()
}

const loginRequest = async () => {
    await axios
        .post('http://localhost:3000/auth/login', data.value)
        .then((response) => {
            saveToken(response.data.token)
            success()
            router.push('/')
            clearData()
        })
}

async function saveToken(token: string) {
    console.log(token);
    
    await Preferences.set({
        key: 'token',
        value: token,
    });
}

async function success() {
    const toast = await toastController.create({
      message: 'Erfolgreich angemeldet.',
      duration: 3000,
      cssClass: 'z-index: 999',
      position: 'top',
      color: 'success',
    })
    await toast.present()
}

function clearData() {
    data.value.email = ''
    data.value.password = ''
}


</script> 