function MapLocations() {
  const module = {};
  const locations = [
    {
      title: "New York",
      lat: 40.73061,
      lon: -73.935242,
    },
    {
      title: "San Francisco",
      lat: 37.7749,
      lon: -122.4194,
    },
    // {
    //   title: "London",
    //   lat: 51.509865,
    //   lon: -0.118092,
    // },
    {
      title: "Dallas",
      lat: 32.779167,
      lon: -96.808891,
    },
  ];

  function init() {
    const csv = Papa.unparse(locations);
    document.getElementById("locations-textarea").value = csv;

    document.getElementById("show-locations").addEventListener("click", onShowLocation);

    document.getElementById("download-data").addEventListener("click", () => {
      const data = document.getElementById("result-textarea").value;
      const blob = new Blob([data], { type: "text/plain;charset=utf-8" });
      saveAs(blob, "map-locations.csv");
    });
      // var series = chart.get("points");
      // series.setData([]);
      //
      // const text = document.getElementById("locations-textarea").value;
      // const parsedText = Papa.parse(text, { header: true });
      // console.log(parsedText);
      //
      // parsedText.data.forEach((p) => {
      //   const coord = chart.fromLatLonToPoint(p);
      //   coord.lat = +p.lat;
      //   coord.lon = +p.lon;
      //   coord.title = p.title;
      //   series.addPoint(coord);
      // });
      //
      // convertPoints();
    //});
  }
  
  function onShowLocation() {
      var series = chart.get("points");
      series.setData([]);

      const text = document.getElementById("locations-textarea").value;
      const parsedText = Papa.parse(text, { header: true });
      // console.log(parsedText);

      parsedText.data.forEach((p) => {
        const coord = chart.fromLatLonToPoint(p);
        coord.lat = +p.lat;
        coord.lon = +p.lon;
        coord.title = p.title;
        series.addPoint(coord);
      });

      const scale = getMapScale();

      // var series = chart.get("points");
      // console.log(series.points);
      const result = [];
      series.points.forEach((p) => {
        // console.log(p);
        const coord = {
          title: p.title,
          x: p.plotX / scale.k - scale.offsetX,
          y: p.plotY / scale.k - scale.offsetY,
        };
        // console.log(coord);
        result.push(coord);
      });

      const csvResult = Papa.unparse(result);
      document.getElementById("result-textarea").value = csvResult;

  }

  init();

  return module;
}

// const points = [
//   {
//     title: "New York",
//     lat: 40.73061,
//     lon: -73.935242,
//   },
//   {
//     title: "San Francisco",
//     lat: 37.7749,
//     lon: -122.4194,
//   },
//   // {
//   //   title: "London",
//   //   lat: 51.509865,
//   //   lon: -0.118092,
//   // },
//   {
//     title: "Dallas",
//     lat: 32.779167,
//     lon: -96.808891,
//   },
// ];
//
// const csv = Papa.unparse(points);
// document.getElementById("locations-textarea").value = csv;
//
// document.getElementById("download-locations").addEventListener("click", () => {
//   const data = document.getElementById("result-textarea").value;
//   const blob = new Blob([data], { type: "text/plain;charset=utf-8" });
//   saveAs(blob, "map-locations.csv");
// });
//
// document.getElementById("show-locations").addEventListener("click", () => {
//   var series = chart.get("points");
//   series.setData([]);
//
//   const text = document.getElementById("locations-textarea").value;
//   const parsedText = Papa.parse(text, { header: true });
//   // console.log(parsedText);
//
//   parsedText.data.forEach((p) => {
//     const coord = chart.fromLatLonToPoint(p);
//     coord.lat = +p.lat;
//     coord.lon = +p.lon;
//     coord.title = p.title;
//     series.addPoint(coord);
//   });
//
//   const scale = getMapScale();
//
//   // var series = chart.get("points");
//   // console.log(series.points);
//   const result = [];
//   series.points.forEach((p) => {
//     // console.log(p);
//     const coord = {
//       title: p.title,
//       x: p.plotX / scale.k - scale.offsetX,
//       y: p.plotY / scale.k - scale.offsetY
//     };
//     // console.log(coord);
//     result.push(coord);
//   });
//
//   const csvResult = Papa.unparse(result);
//   document.getElementById("result-textarea").value = csvResult;
//
//   // convertPoints();
// });

// function convertPoints() {
//   const map = [chart.originalSize.width, chart.originalSize.height];
//   const box = [chart.plotWidth, chart.plotHeight];
//   let k = 1;
//   let scaleName = "";
//   let margin = [0, 0];
//
//   // calculate diff
//   const kw = box[0] - map[0];
//   const kh = box[1] - map[1];
//
//   // calculate scale
//   if (kw < 0 || kh < 0) {
//     const kwAbs = Math.abs(kw);
//     const khAbs = Math.abs(kh);
//     if (kwAbs > khAbs) {
//       k = box[1] / map[1];
//       scaleName = "zoomout-h";
//
//       const scaledSide = map[0] * k;
//       const center = (box[0] - scaledSide) / 2;
//       margin[0] = Math.round(center / k);
//     } else {
//       k = box[0] / map[0];
//       scaleName = "zoomout-w";
//
//       const scaledSide = map[1] * k;
//       const center = (box[1] - scaledSide) / 2;
//       margin[1] = Math.round(center / k);
//     }
//   } else {
//     if (kw > kh) {
//       k = box[1] / map[1];
//       scaleName = "zoomin-h";
//
//       const scaledSide = map[0] * k;
//       const center = (box[0] - scaledSide) / 2;
//       margin[0] = Math.round(center / k);
//     } else {
//       k = box[0] / map[0];
//       scaleName = "zoomin-w";
//
//       const scaledSide = map[1] * k;
//       const center = (box[1] - scaledSide) / 2;
//       margin[1] = Math.round(center / k);
//     }
//   }
//
//   // calculate margin
//   console.log(box, map, k, scaleName, margin);
//
//   var series = chart.get("points");
//   // console.log(series.points);
//   const result = [];
//   series.points.forEach((p) => {
//     // console.log(p);
//     const coord = {
//       title: p.title,
//       x: p.plotX / k - margin[0],
//       y: p.plotY / k - margin[1],
//     };
//     // console.log(coord);
//     result.push(coord);
//   });
//
//   const csvResult = Papa.unparse(result);
//   document.getElementById("result-textarea").value = csvResult;
// }
