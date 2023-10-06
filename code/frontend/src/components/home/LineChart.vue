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
      minutesData: [120, 80, 140, 90, 110, 100, 130] // Beispiel: Array mit Minutenwerten
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    renderChart() {
      const data = this.generateData(); // Generiere das Array mit den Daten

      Highcharts.chart('chart', {
        title: {
          text: 'Minuten trainiert (min):'
        },
        xAxis: {
          type: 'datetime',
          title: {
            text: 'Datum'
          },
          labels: {
            formatter: function() {
              return Highcharts.dateFormat('%e. %b', this.value); // Formatierung des Datums
            }
          },
          tickPositioner: function() {
            const positions = [];
            const currentDate = new Date();

            for (let i = 6; i >= 0; i--) {
              const date = new Date(currentDate.getTime() - i * 24 * 60 * 60 * 1000);
              positions.push(date.getTime());
            }

            return positions;
          }
        },
        yAxis: {
          title: {
            text: 'Minuten'
          }
        },
        series: [{
          name: 'Minuten',
          data: data,
          type: 'line',
          color: '#FBA92C'
        }]
      });
    },
    generateData() {
      const data = [];
      const currentDate = new Date();

      for (let i = 6; i >= 0; i--) {
        const date = new Date(currentDate.getTime() - i * 24 * 60 * 60 * 1000);
        const minutes = this.minutesData[i];

        data.push({
          x: date.getTime(),
          y: minutes
        });
      }

      return data;
    },
    async getData() {
      await this.calcData()
      axios.defaults.headers.common['Authorization'] = `Bearer ${await this.getToken()}`;
      axios
        .get('http://localhost:3000/stats/total')
        .then(function (response) {
          console.log(response.data) 
        })
      this.renderChart()
    },
    async calcData() {
      axios.defaults.headers.common['Authorization'] = `Bearer ${await this.getToken()}`;
      return axios
        .post('http://localhost:3000/stats/calc')
        .then(function (response) {
          console.log(response.data) 
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
