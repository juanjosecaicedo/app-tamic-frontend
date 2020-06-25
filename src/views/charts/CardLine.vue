<script>
import { Line } from "vue-chartjs";
import { CustomTooltips } from "@coreui/coreui-plugin-chartjs-custom-tooltips";
import { hexToRgba } from "@coreui/coreui/dist/js/coreui-utilities";

export default {
  components: {
    hexToRgba,
    CustomTooltips
  },
  extends: Line,
  props: ["first_data", "second_data", "labels"],
  mounted() {
    this.renderChart(
      {
        labels: this.labels,
        datasets: [
          {
            label: "Recurrentes",
            backgroundColor: hexToRgba("#E46651", 90),
            data: this.first_data
          },
          {
            label: "Nuevos",
            backgroundColor: hexToRgba("#00D8FF", 90),
            data: this.second_data
          }
        ]
      },
      {
        responsive: true,
        maintainAspectRatio: true,
        tooltips: {
          enabled: false,
          custom: CustomTooltips,
          intersect: true,
          mode: "index",
          position: "nearest",
          callbacks: {
            labelColor: function(tooltipItem, chart) {
              return {
                backgroundColor:
                  chart.data.datasets[tooltipItem.datasetIndex].backgroundColor
              };
            }
          }
        }
      }
    );
  }
};
</script>
