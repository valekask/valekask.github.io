// import { saveAs } from 'file-saver';

function ScriptExample() {
    const module = {};

    const script = `system.reset_db

# Define properties
vertex.property.define -property title -type String
vertex.property.define -property path -type String
vertex.property.define -property x -type Double
vertex.property.define -property y -type Double
vertex.property.define -property color -type Color
vertex.property.define -property isCountry -type Boolean

# Import map and location data
vertex.import -table map.csv
vertex.import -table locations.csv -vertex_column title

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
dashboard.save -file map
    `

    function init() {
        document.getElementById('script-textarea').value = script;
        document.getElementById('download-script').addEventListener('click', () => {
            const blob = new Blob([script], {type: "text/plain;charset=utf-8"});
            saveAs(blob, 'map-script.txt');
        });
    }

    init();

    return module;
}
