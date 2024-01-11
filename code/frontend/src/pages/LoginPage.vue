<template>
    <ion-page class="bg-login_background_svg opacity-90 bg-no-repeat bg-center bg-cover">
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
import { success } from '@/services/Toastification';

const data = ref({
    email: '',
    password: '',
})

function submit() {
    loginRequest()
}

const loginRequest = async () => {
    await axios
        .post('http://localhost:8080/api/users/login', data.value)
        .then((response) => {
            console.log(response.data);
            
            if(response.data) {
                saveToken(response.data)
                
                success('Erfolgreich angemeldet.')
                router.push('/')
                clearData()
            } else {
                error()
            }
        })
}

async function error() {
  const toast = await toastController.create({
    message: 'Fehler! Falsche Anmelde Daten',
    duration: 3000,
    cssClass: 'z-index: 999',
    position: 'top',
    color: 'primary',
  })
  await toast.present()
}

async function saveToken(token: string) {
    console.log(token);
    
    await Preferences.set({
        key: 'token',
        value: token,
    });
}

function clearData() {
    data.value.email = ''
    data.value.password = ''
}


</script> 