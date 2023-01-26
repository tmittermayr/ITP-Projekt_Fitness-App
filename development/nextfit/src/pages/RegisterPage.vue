<template>
    <ion-page>
        <div class="my-auto">
            <h1 class="text-3xl font-bold text-orange-400 text-center">Registrieren</h1>
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
                <Button @click="submit" class="font-bold text-xl">Anmelden</Button>
            </div>
        </div>
    </ion-page>
</template>
<script lang="ts" setup>
import { IonPage } from '@ionic/vue';
import Button from '@/components/common/ButtonComponent.vue';
import Input from '@/components/common/InputComponent.vue';
import { ref } from 'vue';
import axios from 'axios';

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
    await axios
        .post('http://localhost:3000/auth/register', data.value)
        .then((response) => {
            console.log("erfolgreich registriert");
            
        })
}

</script>