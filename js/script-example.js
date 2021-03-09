// import { saveAs } from 'file-saver';

function ScriptExample(options) {
  const module = {};
  const mapList = options.mapList;
  // let script = '';
  let scriptTemplate = `system.reset_db

# Define properties
vertex.property.define -property title -type String
vertex.property.define -property path -type String
vertex.property.define -property x -type Double
vertex.property.define -property y -type Double
vertex.property.define -property color -type Color
vertex.property.define -property isCountry -type Boolean

# Import map and location data
vertex.import -table {MAP_NAME}.csv
vertex.import -table {MAP_NAME}_points.csv -vertex_column title

# Set supporting flag isCountry
vertex.property.set -property isCountry -value path!=null

# Set colors for map and locations
vertex.property.set -property color -value "'#c2c2c2'" -filter vertex.isCountry==true
vertex.property.set -property color -value "'#4990e2'" -filter vertex.isCountry==false

# Create dashboard
dashboard.new -version 2
dashboard.mappings.vertex.label -text title
dashboard.mappings.vertex -color color -size :::3
dashboard.mappings.vertex.hover -mappings vertex_id,title
dashboard.widget.network -x x -y y -custom_shape path
dashboard.save -file {MAP_NAME}
    `;

  function init() {
    mapList.addChangeListener(() => {
      updateScript();
    });
  }

  function updateScript() {
    const script = scriptTemplate.replaceAll(
      "{MAP_NAME}",
      mapList.selected.value
    );
    document.getElementById("script-textarea").value = script;
  }

  module.getScript = function() {
    return document.getElementById("script-textarea").value;
  }

  init();

  return module;
}
