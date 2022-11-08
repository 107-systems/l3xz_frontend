/***************************************************************
This software is distributed under the terms of the MIT License.
Copyright (c) 2022 107-Systems
Author: Jonas Wühr (jonaswuehrmaintainer@gmail.com) 
****************************************************************/
function render_nav_msgs_OccupancyGrid(name, type, message, visualizer) {

    if ("nav_msgs/OccupancyGrid" == type) {
        visualizer.lastGrid = message;
        visualizer.showCanvas(true);
        visualizer.clearCanvas(true);
        let width = visualizer.width;
        let height = visualizer.height;
        let arr = message.data;

        width = message.info.width;
        height = message.info.height;

        let img = visualizer.context.getImageData(0, 0, width, height);
        let pixels = img.data;

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                let idxOut = 4 * (x + y * width);
                let idxIn = (x + (height - y) * width);
                if (-1 == arr[idxIn]) {
                    pixels[idxOut] = 0;
                    pixels[idxOut + 1] = 0;
                    pixels[idxOut + 2] = 50;
                } else {
                    pixels[idxOut] = 0;
                    pixels[idxOut + 2] = 0;
                    pixels[idxOut + 1] = parseInt(255 * arr[idxIn] * 0.01);
                }
                pixels[idxOut + 3] = 255;
            }
        }

        let pose = message.info.origin;

        visualizer.context.putImageData(img, 0, 0);

        visualizer.originX = parseFloat(pose.position.x).toFixed(2);
        visualizer.originY = parseFloat(pose.position.y).toFixed(2);
        visualizer.resolution = parseFloat(message.info.resolution).toFixed(2);
        visualizer.context.font = "15px Arial";
        visualizer.context.fillStyle = "#ffffff";
        visualizer.context.fillText("m/cell: " + String(parseFloat(message.info.resolution).toFixed(2)) +
            ", P0(" + String(parseFloat(pose.position.x).toFixed(2)) + "|" + String(parseFloat(pose.position.y).toFixed(2)) + "), Size: " + String(width) + "x" + String(height), 100, 25);

        visualizer.defaultDownload(name);
        return true;
    }
    return false;
}
