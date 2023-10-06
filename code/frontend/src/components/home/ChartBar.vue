<template>
  <div id="chart" class="rounded-xl"></div>
</template>

<script>
import Highcharts from 'highcharts';
import axios from 'axios';
import { Preferences } from "@capacitor/preferences";

export default {
  data() {
    return {
      muscleData: [
        { name: 'Beine', percentage: 40 },
        { name: 'Rücken', percentage: 25 },
        { name: 'Brust', percentage: 20 },
        { name: 'Arme', percentage: 15 }
      ], // Beispiel: Array mit Muskelgruppen und prozentualen Daten
      token: ''
    };
  },
  mounted() {
    this.renderChart();
  },
  methods: {
    renderChart() {
      const data = this.muscleData.map((item) => ({
        name: item.name,
        y: item.percentage
      })); // Konvertiere das Array in das erforderliche Datenformat

      Highcharts.chart('chart', {
        chart: {
          type: 'pie'
        },
        title: {
          text: 'Trainierte Muskelgruppen'
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        series: [
          {
            name: 'Anteil',
            colorByPoint: true,
            data: data
          }
        ]
      });
    },
    async getData() {
      axios.defaults.headers.common['Authorization'] = `Bearer ${await this.getToken()}`;
      axios
        .get('http://localhost:3000/stats/total')
        .then(function (response) {
          console.log(response) 
          
        })
    },
    async  getToken() {
        const { value } = await Preferences.get({ key: 'token' })
        return value ? value : ''
    }
  }
};
</script>

<style>
.chart {
  width: 100%;
  height: 400px;

}

</style>
