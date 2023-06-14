


<script lang="ts">
import Layout from '@/components/common/PageLayout.vue';
import PageHeader from '@/components/common/PageHeader.vue';
  import { defineComponent } from 'vue';
  import { Chart } from 'highcharts-vue';

  export default defineComponent({
    name: 'Home-Page',
    components: {
      Chart
    },
    data (){
      return {
        chartOptions: {
          title: {
              text: 'Minutes trained'
          },
          subtitle: {
              text: ''
          },
          xAxis: {
              type: 'Date'
          },
          yAxis: {
              title: {
              text: 'Minutes trained'
              }
          },
          series: [{
              name: Date.now().toString(),
              data: [{x: Date.now(), y: 60}],
              yAxis: 0,
              visible: true
          },
        {
            name: "31.05.2023",
            data: [{x: "31.05.2023", y:10}],
            yAxis: 0,
            visible: true
        }]
        }
      }
    }
  });


</script>