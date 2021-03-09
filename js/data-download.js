function DataDownload(options) {
    const module = {};
    const mapList = options.mapList;
    const scriptExample = options.scriptExample;

    function init() {
        document.getElementById('map-download').addEventListener('click', () => {
            const name = `${mapList.selected.value}.csv`;
            saveAs(`maps/coordinates/${name}`, name);
        });

        document.getElementById("points-download").addEventListener("click", () => {
            const data = document.getElementById("points-textarea").value;
            const blob = new Blob([data], { type: "text/plain;charset=utf-8" });
            saveAs(blob, mapList.selected.value + "_points.csv");
        });

        document.getElementById("script-download").addEventListener("click", () => {
            const script = scriptExample.getScript();
            const blob = new Blob([script], { type: "text/plain;charset=utf-8" });
            saveAs(blob, mapList.selected.value + ".txt");
        });
    }

    init();

    return module;
}
