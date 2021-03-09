function getMapScale() {
    const map = [chart.originalSize.width, chart.originalSize.height];
    const box = [chart.plotWidth, chart.plotHeight];
    let k = 1;
    let margin = [0, 0];

    // calculate diff
    const kw = box[0] - map[0];
    const kh = box[1] - map[1];

    // calculate scale
    if (kw < 0 || kh < 0) {
        const kwAbs = Math.abs(kw);
        const khAbs = Math.abs(kh);
        if (kw < 0 && kwAbs > khAbs) { // scale out width
            k = box[0] / map[0];
            const scaledSide = map[1] * k;
            const center = (box[1] - scaledSide) / 2;
            margin[1] = Math.round(center / k);
        } else { // scale out height
            k = box[1] / map[1];
            const scaledSide = map[0] * k;
            const center = (box[0] - scaledSide) / 2;
            margin[0] = Math.round(center / k);
        }
    } else {
        if (kw > kh) { // scale in height
            k = box[1] / map[1];
            const scaledSide = map[0] * k;
            const center = (box[0] - scaledSide) / 2;
            margin[0] = Math.round(center / k);
        } else {  // scale in width
            k = box[0] / map[0];
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
