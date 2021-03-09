function MapLocations(options) {
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
    document.getElementById("locations-textarea").value = Papa.unparse(locations);
    document.getElementById("show-points").addEventListener("click", onShowPoints);
  }
  
  function onShowPoints() {
      var series = chart.get("points");
      series.setData([]);

      const text = document.getElementById("locations-textarea").value;
      const parsedText = Papa.parse(text, { header: true });

      parsedText.data.forEach((p) => {
        const coord = chart.fromLatLonToPoint(p);
        coord.lat = +p.lat;
        coord.lon = +p.lon;
        coord.title = p.title;
        series.addPoint(coord);
      });

      const scale = getMapScale();

      const result = [];
      series.points.forEach((p) => {
          result.push({
          title: p.title,
          x: p.plotX / scale.k - scale.offsetX,
          y: p.plotY / scale.k - scale.offsetY,
        });
      });

      document.getElementById("points-textarea").value = Papa.unparse(result);

  }

  init();

  return module;
}
