function showMap(mapKey, size) {
  const supportsLatLon = !!Highcharts.maps[mapKey]["hc-transform"];

  // Initiate the chart
  chart = Highcharts.mapChart("map", {
    chart: {
      // events: {
      //     click: function (e) {
      //         var series = this.get('points'),
      //             x = Math.round(e.xAxis[0].value),
      //             y = Math.round(e.yAxis[0].value);
      //
      //         series.addPoint(supportsLatLon ? this.fromPointToLatLon({
      //             x: x,
      //             y: y
      //         }) : {
      //             x: x,
      //             y: y
      //         });
      //     }
      // },
      animation: false,
    },

    title: {
      text: "Map Preview",
    },

    subtitle: supportsLatLon
      ? {}
      : {
          text:
            "This map does not support latitude/longitude - x/y coordinates will be used",
          style: {
            color: "red",
          },
        },

    mapNavigation: {
      enabled: false, // true to enable zoom/pan
      buttonOptions: {
        verticalAlign: "bottom",
      },
    },

    legend: {
      enabled: false,
    },

    tooltip: {
      pointFormatter: function () {
        return supportsLatLon
          ? "Name: " +
              this.title +
              "<br>Lat: " +
              this.lat.toFixed(3) +
              ", Lon: " +
              this.lon.toFixed(3)
          : "x: " + this.x + ", y: " + this.y;
      },
    },

    plotOptions: {
      series: {
        stickyTracking: false,
        point: {
          // events: {
          //     // Update lat/lon properties after dragging point
          //     drop: function () {
          //         var newLatLon;
          //         if (supportsLatLon) {
          //             newLatLon = this.series.chart.fromPointToLatLon(this);
          //             this.lat = newLatLon.lat;
          //             this.lon = newLatLon.lon;
          //         }
          //     }
          // }
        },
      },
    },

    series: [
      {
        mapData: Highcharts.maps[mapKey],
      },
      {
        type: "mappoint",
        id: "points",
        name: "Points",
        dragDrop: {
          draggableX: true,
          draggableY: true,
        },
        cursor: "move",
        point: {
          events: {
            click: function () {
              if (document.getElementById("delete").checked) {
                this.remove();
              }
            },
          },
        },
      },
      {
        type: "mappoint",
        id: "connected-points",
        name: "Connected points",
        draggableX: true,
        draggableY: true,
        cursor: "move",
        color: Highcharts.getOptions().colors[0],
        lineWidth: 2,
        point: {
          events: {
            click: function () {
              if (document.getElementById("delete").checked) {
                this.remove();
              }
            },
          },
        },
      },
    ],
  });

  chart.originalSize = size;
}
