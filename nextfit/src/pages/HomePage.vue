<template>
    <Layout>
            <h1 class="text-red-500">Hallo Timo</h1>
            <router-link to="/workouts">
                <button>Traingingsübersicht</button>
            </router-link>
    </Layout>
</template>
    
<script lang="ts" setup>
import Layout from '@/components/common/PageLayout.vue';

</script>