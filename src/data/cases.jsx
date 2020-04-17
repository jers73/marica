export const worldChart = (labels, info) => {
  return () => {
    const chartColor = "#FFFFFF";

    return {
      labels,
      datasets: [
        {
          label: "Data",
          borderColor: chartColor,
          pointBorderColor: chartColor,
          pointBackgroundColor: "#2c2c2c",
          pointHoverBackgroundColor: "#2c2c2c",
          pointHoverBorderColor: chartColor,
          pointBorderWidth: 1,
          pointHoverRadius: 7,
          pointHoverBorderWidth: 2,
          pointRadius: 5,
          fill: true,
          // backgroundColor: gradientFill,
          borderWidth: 2,
          data: info,
        }
      ]
    };
  }
};
worldChart.options = {
    layout: {
      padding: {
        left: 20,
        right: 20,
        top: 0,
        bottom: 0
      }
    },
    maintainAspectRatio: false,
    tooltips: {
      backgroundColor: "#fff",
      titleFontColor: "#333",
      bodyFontColor: "#666",
      bodySpacing: 4,
      xPadding: 12,
      mode: "nearest",
      intersect: 0,
      position: "nearest"
    },
    legend: {
      position: "bottom",
      fillStyle: "#FFF",
      display: false
    },
    scales: {
      yAxes: [
        {
          ticks: {
            fontColor: "rgba(255,255,255,0.4)",
            fontStyle: "bold",
            beginAtZero: true,
            maxTicksLimit: 5,
            padding: 10
          },
          gridLines: {
            drawTicks: true,
            drawBorder: false,
            display: true,
            color: "rgba(255,255,255,0.1)",
            zeroLineColor: "transparent"
          }
        }
      ],
      xAxes: [
        {
          gridLines: {
            display: false,
            color: "rgba(255,255,255,0.1)"
          },
          ticks: {
            padding: 10,
            fontColor: "rgba(255,255,255,0.4)",
            fontStyle: "bold"
          }
        }
      ]
    }
  };

export const getTotals = async () => {
  const response = await fetch("https://api.covid19api.com/world/total");
  return await response.json();
}

export const  getGraphic = async (country) => {
  const today = new Date()
  const priorDate = new Date().setDate(today.getDate()-30)
  const response = await fetch(`https://api.covid19api.com/total/country/${country}`);
  const data = (await response.json())
    .filter((item) => {
      const date = new Date(item.Date);
      return priorDate < date;
    })
    .map(({Confirmed, Deaths, Recovered, Date}) => {
      return {
        Confirmed,
        Date: Date.substring(0, 10)
      }
    });
  const labels = data.map((item) => item.Date);
  const info = data.map((item) => item.Confirmed);

  return worldChart(labels, info);
}
