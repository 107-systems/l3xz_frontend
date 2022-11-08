/***************************************************************
This software is distributed under the terms of the MIT License.
Copyright (c) 2022 107-Systems
Author: Jonas Wühr
****************************************************************/
function render_sensor_msgs_LaserScan(name, type, message, visualizer) {
    if ("sensor_msgs/LaserScan" == type) {
        let centerX = visualizer.width / 2;
        let centerY = visualizer.height;
        let angle = 0;
        let max = message.ranges.reduce(function(a, b) {
            return Math.max(a, b);
        });
        let distToPixel = centerX / max;

        visualizer.context.fillStyle = "#000000";
        visualizer.context.fillRect(0, 0, visualizer.width, visualizer.height);

        visualizer.context.strokeStyle = "#ff0000";
        visualizer.context.beginPath();

        for (i in message.ranges) {
            let pointX = centerX + Math.cos(angle) * message.ranges[i] * distToPixel;
            let pointY = centerY - Math.sin(angle) * message.ranges[i] * distToPixel;
            visualizer.context.moveTo(centerX, centerY);
            visualizer.context.lineTo(pointX, pointY);
            angle += message.angle_increment;
        }
        visualizer.context.stroke();
        visualizer.defaultDownload(name);
        return true;
    }
    return false;
}
