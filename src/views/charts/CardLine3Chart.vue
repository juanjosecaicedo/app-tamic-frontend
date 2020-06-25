<script>
import { Line } from "vue-chartjs";
import { CustomTooltips } from "@coreui/coreui-plugin-chartjs-custom-tooltips";

export default {
  extends: Line,
  props: ["data", "labels", "height", "width"],
  mounted() {
    const datasets3 = [
      {
        label: "Total",
        backgroundColor: "rgba(255,255,255,.2)",
        borderColor: "rgba(255,255,255,.55)",
        data: this.data
      }
    ];
    this.renderChart(
      {
        labels: this.labels,
        datasets: datasets3
      },
      {
        tooltips: {
          enabled: false,
          custom: CustomTooltips
        },
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        scales: {
          xAxes: [
            {
              display: false
            }
          ],
          yAxes: [
            {
              display: false
            }
          ]
        },
        elements: {
          line: {
            borderWidth: 2
          },
          point: {
            radius: 0,
            hitRadius: 10,
            hoverRadius: 4
          }
        }
      }
    );
  }
};
</script>
