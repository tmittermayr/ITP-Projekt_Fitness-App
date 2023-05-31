<template>
    <Layout>
        <div class="p-5 bg-gray-100 w-full h-full absolute top-0 left-0 px-5">
            <page-header title="Einstellungen"></page-header>
            <div>
                <InputComponent :model="getToken()" />
            </div>
            <router-link to="login" class="text-orange-400 text-center">Abmelden</router-link>
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

const token = ref()

async function getToken() {
    const { value } = await Preferences.get({ key: 'token' });
    
    token.value = value;
}
</script>