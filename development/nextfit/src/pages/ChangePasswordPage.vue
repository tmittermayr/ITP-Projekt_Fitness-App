<template>
    <Layout>
        <div class="p-5 pt-10 bg-gray-100 w-full h-full absolute top-0 left-0 px-5">
            <ion-button router-link="/settings" router-direction="back"  class="absolute left-2 top-3 mb-10">
                <ion-icon :icon="chevronBackOutline" size="large"/>
            </ion-button>
            <page-header title="Passwort ändern"></page-header>
            <div class="flex flex-col gap-5 mt-10">
                <InputComponent v-model="password.new" label="Neues Passwort" type="password" />
                <InputComponent v-model="password.repeat" label="Passwort wiederholen" type="password" />
            </div>
            <p v-show="error" class="text-red-400 text-center font-bold my-5">Das Passwort muss übereinstimmen!</p>
            <div class="flex flex-col gap-5 mt-10">
                <Button class="font-bold" @click="submit">Speichern</Button>
            </div>
        </div>
    </Layout>
</template>

<script lang="ts" setup>
import Layout from '@/components/common/PageLayout.vue';
import PageHeader from '@/components/common/PageHeader.vue';
import InputComponent from '@/components/common/InputComponent.vue';
import Button from '@/components/common/ButtonComponent.vue';
import { chevronBackOutline } from 'ionicons/icons';
import { IonIcon } from '@ionic/vue';
import { ref } from 'vue';
import { IonButton } from '@ionic/vue';

const password = ref({
    new: '',
    repeat: '',
})

const error = ref(false)

function submit() {
    if(password.value.new == password.value.repeat) {
        console.log(true);
    } else {
        error.value = true;
    }
}

</script>