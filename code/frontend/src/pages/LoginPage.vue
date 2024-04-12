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
    //getAccessToken()
    loginRequest()
}

const loginRequest = async () => {
    await axios
        .post('https://student.cloud.htl-leonding.ac.at/nextfit/api/users/login', data.value)
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

function getAccessToken() {
  const body = {
    client_id: "nextfit-client",
    client_secret: "0yFjWSOgByROS4y6HiqSfO473Q02Bmjp",
    grant_type: "client_credentials",
  };

  axios
      .post("/realms/nextfit-realm/protocol/openid-connect/token", body, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })
      .then((response) => {
        console.log(response.data)
        getUserToken(response.data.access_token);
      })
      .catch(() => {
        console.log(
            "User existiert nicht oder Email wurde noch nicht bestätigt."
        );
      });
}

function getUserToken(token) {
  const body = {
    client_id: "nextfit-client",
    client_secret: "LBsTilYvuz6HUy2DnfDzaUtCR3pNWj5L",
    grant_type: "password",
    username: data.value.email,
    password: data.value.password,
  };

  axios
      .get("/admin/realms/nextfit-realm/users?email=" + data.value.email, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((response) => {
        console.log(response)
          axios
              .post("realms/nextfit-realm/protocol/openid-connect/token", body, {
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
                },
              })
              .then((response) => {
                saveKey(response.data.access_token)

                /*success('Erfolgreich angemeldet.')
                router.push('/')
                clearData()*/
              });
      })
      .catch(() => {
        console.log(
            "User existiert nicht oder Email wurde noch nicht bestätigt."
        );
      });
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

async function saveKey(key: string) {
  console.log(key);

  await Preferences.set({
    key: 'key',
    value: key,
  });
}

function clearData() {
    data.value.email = ''
    data.value.password = ''
}


</script> 