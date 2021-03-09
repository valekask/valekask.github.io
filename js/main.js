let chart;

(function Main() {
  const module = {};
  const mapList = new MapList();
  const mapLocations = new MapLocations();
  const mapDownload = new MapDownload({mapList: mapList});
  const scriptExample = new ScriptExample();

  function init() {
    const mapKey = "us-all";
    mapList.init(mapKey);
  }

  init();

  return module;
})();
