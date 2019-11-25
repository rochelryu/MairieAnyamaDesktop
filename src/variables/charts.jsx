
const dashboard24HoursPerformanceChart = {
  data: canvas => {
    return {
      labels: [
        "2015",
        "2016",
        "2017",
        "2018",
        "2019",
        
      ],
      datasets: [
        {
          borderColor: "#51cbce",
          backgroundColor: "#51cbce",
          pointRadius: 0,
          pointHoverRadius: 0,
          borderWidth: 3,
          data: [600, 510, 416, 822, 530]
        },
        {
          borderColor: "#fbc658",
          backgroundColor: "#fbc658",
          pointRadius: 0,
          pointHoverRadius: 0,
          borderWidth: 3,
          data: [300, 310, 316, 322, 330]
        },
        {
          borderColor: "#f17e5d",
          backgroundColor: "#f17e5d",
          pointRadius: 0,
          pointHoverRadius: 0,
          borderWidth: 3,
          data: [320, 340, 365, 360, 370]
        },
        {
          borderColor: "#E3E3E3",
          backgroundColor: "#E3E3E3",
          pointRadius: 0,
          pointHoverRadius: 0,
          borderWidth: 3,
          data: [370, 394, 415, 409, 425]
        }
      ]
    };
  },
  options: {
    legend: {
      display: false
    },

    tooltips: {
      enabled: false
    },

    scales: {
      yAxes: [
        {
          ticks: {
            fontColor: "#9f9f9f",
            beginAtZero: false,
            maxTicksLimit: 5
            //padding: 20
          },
          gridLines: {
            drawBorder: false,
            zeroLineColor: "#ccc",
            color: "rgba(255,255,255,0.05)"
          }
        }
      ],

      xAxes: [
        {
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: "rgba(255,255,255,0.1)",
            zeroLineColor: "transparent",
            display: false
          },
          ticks: {
            padding: 20,
            fontColor: "#9f9f9f"
          }
        }
      ]
    }
  }
};

const dashboardEmailStatisticsChart = {
  data: canvas => {
    return {
      labels: [1, 2, 3],
      datasets: [
        {
          label: "Par Sexe",
          pointRadius: 10,
          pointHoverRadius: 10,
          backgroundColor: [ "#4acccd", "#fcc468"],
          borderWidth: 0,
          data: [342, 480]
        }
      ]
    };
  },
  options: {
    legend: {
      display: false
    },

    pieceLabel: {
      render: "percentage",
      fontColor: ["white"],
      precision: 2
    },

    tooltips: {
      enabled: false
    },

    scales: {
      yAxes: [
        {
          ticks: {
            display: false
          },
          gridLines: {
            drawBorder: false,
            zeroLineColor: "transparent",
            color: "rgba(255,255,255,0.05)"
          }
        }
      ],

      xAxes: [
        {
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: "rgba(255,255,255,0.1)",
            zeroLineColor: "transparent"
          },
          ticks: {
            display: false
          }
        }
      ]
    }
  }
};

const dashboardNASDAQChart = {
  data: {
    labels: [
      "Jour1",
      "Jour2",
      "Jour3",
      "Jour4",
      "Jour5",
      "Jour6",
      "Jour7",
      
    ],
    datasets: [
      {
        data: [0, 19, 15, 20, 30, 40, 40],
        fill: true,
        borderColor: "#fbc658",
        backgroundColor: "transparent",
        pointBorderColor: "#fbc658",
        pointRadius: 4,
        pointHoverRadius: 4,
        pointBorderWidth: 8
      },
      {
        data: [0, 5, 10, 12, 20, 27, 30],
        fill: true,
        borderColor: "#51CACF",
        backgroundColor: "transparent",
        pointBorderColor: "#51CACF",
        pointRadius: 4,
        pointHoverRadius: 4,
        pointBorderWidth: 8
      },
      {
        data: [0, 25, 11, 10, 70, 30, 20],
        fill: true,
        borderColor: "#e3e3e3",
        backgroundColor: "transparent",
        pointBorderColor: "#e3e3e3",
        pointRadius: 4,
        pointHoverRadius: 4,
        pointBorderWidth: 8
      },
      {
        data: [0, 10, 12, 14, 30, 20, 25],
        fill: true,
        borderColor: "#3f51b5",
        backgroundColor: "transparent",
        pointBorderColor: "#3f51b5",
        pointRadius: 4,
        pointHoverRadius: 4,
        pointBorderWidth: 8
      }
    ]
  },
  options: {
    legend: {
      display: false,
      position: "top"
    }
  }
};

module.exports = {
  dashboard24HoursPerformanceChart,
  dashboardEmailStatisticsChart,
  dashboardNASDAQChart
};
