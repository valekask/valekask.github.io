function getMapScale() {
    const map = [chart.originalSize.width, chart.originalSize.height];
    const box = [chart.plotWidth, chart.plotHeight];
    let k = 1;
    let scaleName = "";
    let margin = [0, 0];

    // calculate diff
    const kw = box[0] - map[0];
    const kh = box[1] - map[1];

    // calculate scale
    if (kw < 0 || kh < 0) {
        const kwAbs = Math.abs(kw);
        const khAbs = Math.abs(kh);
        if (kwAbs > khAbs) {
            k = box[1] / map[1];
            scaleName = "zoomout-h";

            const scaledSide = map[0] * k;
            const center = (box[0] - scaledSide) / 2;
            margin[0] = Math.round(center / k);
        } else {
            k = box[0] / map[0];
            scaleName = "zoomout-w";

            const scaledSide = map[1] * k;
            const center = (box[1] - scaledSide) / 2;
            margin[1] = Math.round(center / k);
        }
    } else {
        if (kw > kh) {
            k = box[1] / map[1];
            scaleName = "zoomin-h";

            const scaledSide = map[0] * k;
            const center = (box[0] - scaledSide) / 2;
            margin[0] = Math.round(center / k);
        } else {
            k = box[0] / map[0];
            scaleName = "zoomin-w";

            const scaledSide = map[1] * k;
            const center = (box[1] - scaledSide) / 2;
            margin[1] = Math.round(center / k);
        }
    }

    return {
        k: k,
        offsetX: margin[0],
        offsetY: margin[1]
    }
}
