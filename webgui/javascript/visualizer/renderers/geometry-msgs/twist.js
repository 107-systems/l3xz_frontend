/***************************************************************
This software is distributed under the terms of the MIT License.
Copyright (c) 2022 107-Systems
Author: Jonas Wühr (jonaswuehrmaintainer@gmail.com)
****************************************************************/
function render_geometry_msgs_Twist(name, type, message, visualizer) {
    if ("geometry_msgs/Twist" == type) {
        visualizer.context.fillStyle = "#000000";
        visualizer.context.fillRect(0, 0, visualizer.width, visualizer.height);
        visualizer.context.fillStyle = "#ff0000";
        visualizer.context.font = "20px Arial";
        visualizer.context.fillText(String(name), 50, 50);

        visualizer.context.fillText("linear:", 50, 100);
        visualizer.context.fillStyle = "#ffffff";
        visualizer.context.fillText(String("x: " + message.linear.x.toFixed(3)), 50, 125);
        visualizer.context.fillText(String("y: " + message.linear.y.toFixed(3)), 50, 150);
        visualizer.context.fillText(String("z: " + message.linear.z.toFixed(3)), 50, 175);

        visualizer.context.fillStyle = "#ff0000";
        visualizer.context.fillText("angular:", 350, 100);
        visualizer.context.fillStyle = "#ffffff";
        visualizer.context.fillText(String("x: " + message.angular.x.toFixed(3)), 350, 125);
        visualizer.context.fillText(String("y: " + message.angular.y.toFixed(3)), 350, 150);
        visualizer.context.fillText(String("z: " + message.angular.z.toFixed(3)), 350, 175);
        return true;
    }
    return false;
}
