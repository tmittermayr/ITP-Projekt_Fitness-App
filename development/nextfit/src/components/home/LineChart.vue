<template>
  <div id="chart"></div>
</template>

<script>
import Highcharts from 'highcharts';

export default {
  data() {
    return {
      minutesData: [120, 80, 140, 90, 110, 100, 130] // Beispiel: Array mit Minutenwerten
    };
  },
  mounted() {
    this.renderChart();
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
