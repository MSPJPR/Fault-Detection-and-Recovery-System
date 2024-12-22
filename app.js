let errors = 0;
let mttr = 200; // Simulated Mean Time to Repair
let mtbf = 1000; // Simulated Mean Time Between Failures
const errorCounts = [];

// Generate error and log it
document.getElementById("generate-error").addEventListener("click", function () {
  errors++;
  errorCounts.push(errors);
  const errorLog = document.getElementById("error-log");
  errorLog.style.display = "block";
  errorLog.innerHTML = `<p>Error ${errors}: Simulated fault detected!</p>`;

  // Update metrics
  document.getElementById("mttr").textContent = mttr;
  document.getElementById("mtbf").textContent = mtbf;

  // Update chart
  updateChart();
});

// Calculate AVF
document.getElementById("calculate-avf").addEventListener("click", function () {
  const aceBits = parseInt(document.getElementById("ace-bits").value, 10);
  const totalBits = parseInt(document.getElementById("total-bits").value, 10);

  if (isNaN(aceBits) || isNaN(totalBits) || totalBits === 0) {
    alert("Please enter valid numbers for ACE Bits and Total Bits.");
    return;
  }

  const avf = (aceBits / totalBits).toFixed(2);
  document.getElementById("avf-result").textContent = avf;
});

// Chart visualization
const ctx = document.getElementById("errorChart").getContext("2d");
let errorChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: [],
    datasets: [
      {
        label: "Errors Over Time",
        data: [],
        borderColor: "#6200ea",
        backgroundColor: "rgba(98, 0, 234, 0.1)",
        fill: true,
      },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Time",
        },
      },
      y: {
        title: {
          display: true,
          text: "Number of Errors",
        },
      },
    },
  },
});

// Update chart data
function updateChart() {
  const currentTime = errorChart.data.labels.length + 1;
  errorChart.data.labels.push(currentTime);
  errorChart.data.datasets[0].data.push(errors);
  errorChart.update();
}
