<script>
import { Doughnut } from "vue-chartjs";
import { hexToRgba } from "@coreui/coreui/dist/js/coreui-utilities";

export default {
  extends: Doughnut,
  props: ["data", "labels"],
  mounted() {
    this.renderChart(
      {
        labels: this.labels,
        datasets: [
          {
            backgroundColor: [
              hexToRgba("#41B883", 90),
              hexToRgba("#E46651", 90),
              hexToRgba("#00D8FF", 90),
              hexToRgba("#DD1B16", 90)
            ],
            data: this.data
          }
        ]
      },
      { responsive: true, maintainAspectRatio: true }
    );
  }
};
</script>
