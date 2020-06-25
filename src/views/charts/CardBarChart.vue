<script>
import { Bar } from "vue-chartjs";
import { CustomTooltips } from "@coreui/coreui-plugin-chartjs-custom-tooltips";

export default {
  extends: Bar,
  props: ["data", "labels", "height"],
  mounted() {
    const datasets4 = [
      {
        label: "Total",
        backgroundColor: "rgba(255,255,255,.3)",
        borderColor: "transparent",
        data: this.data
      }
    ];
    this.renderChart(
      {
        labels: this.labels,
        datasets: datasets4
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
              display: false,
              categoryPercentage: 1,
              barPercentage: 0.5
            }
          ],
          yAxes: [
            {
              display: false
            }
          ]
        }
      }
    );
  }
};
</script>
