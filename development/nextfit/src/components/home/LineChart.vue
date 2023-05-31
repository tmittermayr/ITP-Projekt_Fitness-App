<template>
  <ion-page>
    
      <div id="container">
        <Chart :options="chartOptions" />
      </div>

  </ion-page>
</template>

<script lang="ts">
import { IonPage } from '@ionic/vue';
import { defineComponent } from 'vue';
import { Chart } from 'highcharts-vue'
import { BarChart } from 'vue-chart-3';
import { returnDownBack } from 'ionicons/icons';

const practice = [2,3,45,56,233,89,23,45,89,122,90,34,34,23,56,2,3,45,56,233,89,23,45,89,122,90,34,34,23,56];

const current_Date = new Date();


export default defineComponent({
  name: 'Home-Page-Chart',
  components: {
    IonPage,
    Chart
  },
  data (){
    return {
      chartOptions: {
        chart: {
        renderTo: 'container',
        type: 'line',
        },
        title: {
            text: 'Übungsanzahl:'
        },
        xAxis: {
          title: {
            type: 'Tage'
          }
        },
        yAxis: {
            title: {
            text: 'Anzahl'
            }
        },
        series: [{
            name: "Anzahl der Übungen pro Tag",
            data: [           
            {x: new Date().getDate() - 29, y: practice[0]},
            {x: new Date().getDate() - 28 , y: practice[1]},
            {x: new Date().getDate() - 27 , y: practice[2]},
            {x: new Date().getDate() - 26 , y: practice[3]},
            {x: new Date().getDate() - 25 , y: practice[4]},
            {x: new Date().getDate() - 24 , y: practice[5]},
            {x: new Date().getDate() - 23 , y: practice[6]},
            {x: new Date().getDate() - 22 , y: practice[7]},
            {x: new Date().getDate() - 21 , y: practice[8]},
            {x: new Date().getDate() - 20 , y: practice[9]},
            {x: new Date().getDate() - 19 , y: practice[10]},
            {x: new Date().getDate() - 18 , y: practice[11]},
            {x: new Date().getDate() - 17 , y: practice[12]},
            {x: new Date().getDate() - 16 , y: practice[13]}, 
            {x: new Date().getDate() - 15, y: practice[14]}, 
            {x: new Date().getDate() - 14 , y: practice[15]},
            {x: new Date().getDate() - 13 , y: practice[16]},
            {x: new Date().getDate() - 12 , y: practice[17]},
            {x: new Date().getDate() - 11 , y: practice[18]},
            {x: new Date().getDate() - 10 , y: practice[19]},
            {x: new Date().getDate() - 9 , y: practice[20]},
            {x: new Date().getDate() - 8 , y: practice[21]},
            {x: new Date().getDate() - 7 , y: practice[22]},
            {x: new Date().getDate() - 6 , y: practice[23]},
            {x: new Date().getDate() - 5 , y: practice[24]},
            {x: new Date().getDate() - 4 , y: practice[25]},
            {x: new Date().getDate() - 3 , y: practice[26]},
            {x: new Date().getDate() - 2 , y: practice[27]},
            {x: new Date().getDate() - 1 , y: practice[28]}, 
            {x: new Date().getDate(), y: practice[29]}],
            yAxis: 0,
            visible: true,
            color: '#FBA92C'
        }]
      }
    }
  }
});
</script>

<style scoped>
#container {
  text-align: center;
  
  position: absolute;
  top:35vh;
  left: 5vw;
  right: 5vw;
  transform: translateY(-50%);
  height: 35vh;
  width: 90vw;
}
#container strong {
  font-size: 20px;
  line-height: 26px;
}
#container p {
  font-size: 16px;
  line-height: 22px;
  color: #8c8c8c;
  margin: 0;
}
#container a {
  text-decoration: none;
}
</style>