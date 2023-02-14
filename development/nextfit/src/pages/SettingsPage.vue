<template>
    <Layout>
        <div class="p-5 bg-gray-100 w-full h-full absolute top-0 left-0 px-5">
            <page-header title="Einstellungen"></page-header>
            <router-link to="login" class="text-orange-400 text-center">Abmelden</router-link>
        </div>
    </Layout>
</template>
<script lang="ts" setup>
import Layout from '@/components/common/PageLayout.vue';
import PageHeader from '@/components/common/PageHeader.vue';
import { RouterLink } from 'vue-router';
</script>