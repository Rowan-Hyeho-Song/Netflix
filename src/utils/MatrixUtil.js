export default {
    getTransformCoords: (element) => {
        const coordinates = { x: 0, y: 0, z: 0 };
        const style = window.getComputedStyle(element);
        const matrix = style.transform || style.webkitTransform || style.mozTransform || style.msTransform;

        if (matrix != "none") {
            const type = matrix.includes("3d") ? "3d" : "2d";
            const translate = matrix.match(/matrix.*\((.+)\)/)[1].split(", ");
            if (type === "2d") {
                coordinates.x = translate[4];
                coordinates.y = translate[4];
            } else {
                coordinates.x = translate[12];
                coordinates.y = translate[13];
                coordinates.z = translate[14];
            }
        }

        return coordinates;
    },
};
