function MapDownload(options) {
    const module = {};
    const mapList = options.mapList

    function init() {
        document.getElementById('download-map').addEventListener('click', () => {
            // console.log(' click download', mapList.selected);
            //window.open(`maps/coordinates/${mapList.selected.value}.csv`, '_blank');
            const name = `${mapList.selected.value}.csv`;
            saveAs(`maps/coordinates/${name}`, name);
        })
    }

    init();

    return module;
}
