<template>
    <Layout>
        <page-header title="Einstellungen"></page-header>
        <router-link to="login" class="text-orange-400 text-center">Abmelden</router-link>
    </Layout>
</template>
<script lang="ts" setup>
import Layout from '@/components/common/PageLayout.vue';
import PageHeader from '@/components/common/PageHeader.vue';
import { RouterLink } from 'vue-router';
</script>