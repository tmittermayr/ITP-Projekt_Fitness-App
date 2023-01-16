<template>
    <ion-page class="flex items-center justify-center">
        <div>
            <h1 class="text-orange-400 text-center">Anmelden</h1>
            <div class="mx-5 flex flex-col gap-5 mt-20">
                <Input placeholder="E-Mail" type="text"/>
                <Input placeholder="Passwort" type="password" />
                <p class="text-xs text-end">
                    Sie sind noch nicht 
                    <RouterLink to="/register" class="text-orange-400">
                        registriert
                    </RouterLink>
                    ?
                </p>
                <Button>Anmelden</Button>
            </div>
        </div>
    </ion-page>
</template>
<script lang="ts" setup>
import Button from '@/components/common/ButtonComponent.vue';
import Input from '@/components/common/InputComponent.vue';
import { IonPage } from '@ionic/vue';

</script> 