function SvgUtils() {
  let module = {};

  module.parseSvg = function (mapKey) {
    // const url = "https://code.highcharts.com/mapdata/" + mapKey + ".svg";
    const url = "./../maps/" + mapKey + ".svg"
    return MapParser.loadSVG(url);
  };

  return module;
}
