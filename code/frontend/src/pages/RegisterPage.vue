<template>
    <ion-page class="bg-login_background_svg opacity-90 bg-no-repeat bg-left bg-cover">
        <div class="my-auto">
            <h1 class="text-3xl font-bold text-orange-400  text-center">Registrieren</h1>
            <div class="mx-5 flex flex-col gap-5 mt-20">
                <Input placeholder="Vorname" type="text" v-model="data.firstname"/>
                <Input placeholder="Nachname" type="text" v-model="data.lastname"/>
                <Input placeholder="E-Mail" type="text" v-model="data.email"/>
                <Input placeholder="Passwort" type="password" v-model="data.password"/>
                <p class="text-sm text-end">
                    Sie haben bereits einen
                    <RouterLink to="/login" class="text-orange-400">
                        Account
                    </RouterLink>
                    ?
                </p>
                <Button @click="submit" class="font-bold text-xl">Registrieren</Button>
            </div>
        </div>
    </ion-page>
</template>
<script lang="ts" setup>
import { IonPage, toastController } from '@ionic/vue';
import Button from '@/components/common/ButtonComponent.vue';
import Input from '@/components/common/InputComponent.vue';
import { ref } from 'vue';
import axios from 'axios';
import router from '@/router';


const data = ref({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
})

function submit() {
    submitRegisterRequest();
}

const submitRegisterRequest = async () => {
  getAccessToken().then((response) => {
    createUser(response.data.access_token)
  })
}

function getAccessToken() {
  const body = {
    client_id: "nextfit-client",
    client_secret: "0yFjWSOgByROS4y6HiqSfO473Q02Bmjp",
    grant_type: "client_credentials",
  };

  return axios.post("/realms/nextfit-realm/protocol/openid-connect/token", body, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });
}

function createUser(token) {
  const registrationData = {
    firstname: data.value.firstname,
    lastname: data.value.lastname,
    email: data.value.email,
    credentials: [
      {
        type: "password",
        value: data.value.password,
        temporary: false,
      },
    ],
  };

  // Registrieren
  axios
      .post("/admin/realms/nextfit-realm/users", registrationData, {
        headers: { Authorization: "Bearer " + token },
      })
      .then(() => {
        axios
            .post(
              'https://student.cloud.htl-leonding.ac.at/nextfit/api/users/register', data.value
            )
            .then((response) => {
              console.log(response.data);
              success()
              clearData()
            })
            .catch((res) => {
              console.log(res)
            });
      });
}

async function success() {
    const toast = await toastController.create({
      message: 'Erfolgreich registriert.',
      duration: 3000,
      buttons: [
        {
          text: 'Anmelden',
          role: 'info',
          handler: () => { router.push('/login') }
        },
      ]
    })
    await toast.present()
}

async function error() {
    const toast = await toastController.create({
      message: 'Etwas ist schiefgelaufen',
      duration: 3000,
    })
    await toast.present()
}

function clearData() {
    data.value.email = ''
    data.value.firstname = ''
    data.value.lastname = ''
    data.value.password = ''
}

</script>