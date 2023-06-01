<template>
    <Layout>
        <div class="p-5 bg-gray-100 w-full min-h-full absolute top-0 left-0 px-5">
            <page-header title="Willkommen"></page-header>
            <p>Bereits absolvierte Trainings:</p>

            <div class="mt-10 flex flex-col gap-5 mb-20">
                <LineChart />
                <ChartBar />
            </div>
        </div>
    </Layout>
</template>

<script lang="ts" setup>
import Layout from '@/components/common/PageLayout.vue';
import PageHeader from '@/components/common/PageHeader.vue';
import LineChart from '@/components/home/LineChart.vue';
import ChartBar from '@/components/home/ChartBar.vue';

</script>