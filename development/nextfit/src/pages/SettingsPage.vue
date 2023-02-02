<template>
    <Layout>
        <page-header title="Einstellungen"></page-header>
        <div class="p-5 bg-gray-100 w-full h-full">
            <router-link to="login" class="text-orange-400 text-center">Abmelden</router-link>
        </div>
    </Layout>
</template>
<script lang="ts" setup>
import Layout from '@/components/common/PageLayout.vue';
import PageHeader from '@/components/common/PageHeader.vue';
import { RouterLink } from 'vue-router';
</script>