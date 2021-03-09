function MapList() {
  const module = {
    selected: undefined,
  };
  const svgUtils = new SvgUtils();
  const select$ = document.getElementById("maps-list");

  const list = [
    {
      value: "world-continents",
      name: "World Continents",
      mapKey: "custom/world-continents",
    },
    {
      value: "world-palestine-highres",
      name: "World Countries",
      mapKey: "custom/world-palestine-highres",
    },
    { value: "europe", name: "Europe", mapKey: "custom/europe" },
    {
      value: "south-america",
      name: "South America",
      mapKey: "custom/south-america",
    },
    {
      value: "north-america",
      name: "North America",
      mapKey: "custom/north-america",
    },
    { value: "asia", name: "Asia", mapKey: "custom/asia" },
    { value: "africa", name: "Africa", mapKey: "custom/africa" },
    {
      value: "british-isles",
      name: "British Isles",
      mapKey: "custom/british-isles",
    },
    { value: "cn-all", name: "China", mapKey: "countries/cn/cn-all" },
    { value: "de-all", name: "Germany", mapKey: "countries/de/de-all" },
    { value: "us-all", name: "USA", mapKey: "countries/us/us-all" },
    {
      value: "usa-and-canada",
      name: "USA and Canada",
      mapKey: "custom/usa-and-canada",
    },
  ];

  module.init = function (selected) {
    // console.log(Highcharts.mapDataIndex);
    // for (const group in Highcharts.mapDataIndex) {
    //     if (
    //         Object.prototype.hasOwnProperty.call(Highcharts.mapDataIndex, group)
    //     ) {
    //         if (group !== "version") {
    //             for (const name in Highcharts.mapDataIndex[group]) {
    //                 if (
    //                     Object.prototype.hasOwnProperty.call(
    //                         Highcharts.mapDataIndex[group],
    //                         name
    //                     )
    //                 ) {
    //                     const option = document.createElement("option");
    //                     const value = Highcharts.mapDataIndex[group][name].replace(
    //                         /\.js$/,
    //                         ""
    //                     );
    //                     option.value = value;
    //                     option.innerText = name;
    //                     option.selected = value === selected;
    //
    //                     mapNames.push(value);
    //
    //                     select$.append(option);
    //                 }
    //             }
    //         }
    //     }
    // }

    list.forEach((d) => {
      {
        const option = document.createElement("option");
        option.value = d.value;
        option.innerText = d.name;
        option.selected = d.value === selected;
        select$.append(option);
      }
    });

    module.selected = list.find((d) => d.value === selected);

    select$.addEventListener("change", () => {
      const value = select$.value;
      module.selected = list.find((d) => d.value === value);
      const mapKey = module.selected.mapKey;
      getScript("https://code.highcharts.com/mapdata/" + mapKey + ".js", () => {
        svgUtils.parseSvg(value).then((size) => {
          showMap(mapKey, size);
        });
      });
    });

    select$.dispatchEvent(new Event('change'));
  };

  function getScript(url, cb) {
    const script = document.createElement("script");
    script.src = url;
    script.onload = cb;
    document.head.appendChild(script);
  }

  return module;
}
