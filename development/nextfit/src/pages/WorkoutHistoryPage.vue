<template>
  <Layout>
    <div class="bg-gray-100 w-full min-h-full absolute top-0 left-0 p-5">
        <page-header title="Trainingsübersicht" description="Hier können Sie ihre letzten Trainings anschauen."></page-header>
        <div class="w-full mt-5 pb-20">
            <div class="flex justify-center">
                <button-component class="mx-auto font-bold">Add Exercise</button-component>
            </div>
            <workout-history />
        </div>
    </div>
  </Layout>
</template>
  
<script lang="ts" setup>
import Layout from '@/components/common/PageLayout.vue';
import PageHeader from '@/components/common/PageHeader.vue';
import ButtonComponent from '@/components/common/ButtonComponent.vue';
import WorkoutHistory from '@/components/workout_history/WorkoutHistory.vue';

</script>