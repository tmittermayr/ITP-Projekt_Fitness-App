<template>
    <Layout>
        <div class="p-5 bg-gray-100 w-full h-full absolute top-0 left-0 px-5">
            <page-header title="Welcome, "></page-header>
            Bereits absolvierte Trainings:<br>
            <br>
            <ButtonComponent  @click="changeComponent('LineChart')">Trainierte Minuten</ButtonComponent>
            <ButtonComponent  @click="changeComponent('ChartBar')">Muskelgruppen</ButtonComponent>
            <br><br>
            <div class="component-container">
            <LineChart v-if="currentComponent === 'LineChart'" />
            <ChartBar v-if="currentComponent === 'ChartBar'" />
            </div>

        </div>

    </Layout>
                   
</template>

<script lang="ts" setup>
import Layout from '@/components/common/PageLayout.vue';
import PageHeader from '@/components/common/PageHeader.vue';
import ChartBar from '@/components/home/ChartBar.vue';
import LineChart  from '@/components/home/LineChart.vue';
import ButtonComponent from '@/components/common/ButtonComponent.vue';

//console.log(Preferences.get('token'));

// decode the logged in user
function parseJwt(token: string) {
    if (!token) {
      return;
    }
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    //console.log(JSON.parse(window.atob(base64)).user.firstname);
    
    return JSON.parse(window.atob(base64)).user.firstname;
}

async function getToken() {
    //console.log(Preferences.get());
    
}


//getToken();

</script>

<script lang="ts">

export default {
  components: {
    ButtonComponent,
    LineChart,
    ChartBar
  },
  data() {
    return {
      currentComponent: 'LineChart' // Standardmäßig LineChart anzeigen
    };
  },
  methods: {
    changeComponent(component) {
      this.currentComponent = component; // Aktuellen Component aktualisieren
    }
  }
};
</script>