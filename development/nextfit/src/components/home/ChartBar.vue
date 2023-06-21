<template>
  <div id="chart" class="rounded-xl"></div>
</template>

<script>
import Highcharts from 'highcharts';

export default {
  data() {
    return {
      muscleData: [
        { name: 'Beine', percentage: 40 },
        { name: 'Rücken', percentage: 25 },
        { name: 'Brust', percentage: 20 },
        { name: 'Arme', percentage: 15 }
      ] // Beispiel: Array mit Muskelgruppen und prozentualen Daten
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
