<template>
    <div>
        <training-plan-item v-for="(plan, index) in props.plans" :key="index" :plan="plan"/>
    </div>
</template>

<script lang="ts" setup>
import TrainingPlanItem from './TrainingPlanItem.vue';

interface Plan {
    name: string
}

const props = defineProps({
    plans: Array<Plan>,
})

</script>