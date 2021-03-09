let chart;

(function Main() {
  const module = {};
  const mapList = new MapList();
  const mapLocations = new MapLocations({mapList: mapList});
  const scriptExample = new ScriptExample({mapList: mapList});
  const dataDownload = new DataDownload({
    mapList: mapList,
    scriptExample: scriptExample
  })

  function init() {
    const mapKey = "us-all";
    mapList.init(mapKey);
  }

  init();

  return module;
})();
