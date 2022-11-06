/***************************************************************
This software is distributed under the terms of the MIT License.
Copyright (c) 2022 107-Systems
Author: Jonas Wühr (jonaswuehrmaintainger@gmail.com)
****************************************************************/
function render_nav_msgs_Odometry(name, type, message, visualizer) {

    if ("nav_msgs/Odometry" == type) {
        if (visualizer.getRequiredMessageTypes().includes("nav_msgs/OccupancyGrid")) {
            let grid;
            for (let [k, v] of visualizer.messages.entries()) {
                if ("nav_msgs/OccupancyGrid" == v.type) {
                    grid = v.data;
                    break;
                }
            }
            const originX = parseFloat(grid.info.origin.position.x).toFixed(2);
            const originY = parseFloat(grid.info.origin.position.y).toFixed(2);
            let x = message.pose.pose.position.x / grid.info.resolution;
            let y = message.pose.pose.position.y / grid.info.resolution;
            const q = message.pose.pose.orientation;
            let yaw = Math.atan2(2.0 * (q.w * q.z + q.w * q.y), q.w * q.w + q.x * q.x - q.y * q.y - q.z * q.z) + 0.5 * Math.PI;
            x += -originX / grid.info.resolution;
            y += -originY / grid.info.resolution;
            y = grid.info.height - y;
            let dx = 30 * Math.sin(yaw);
            let dy = 30 * Math.cos(yaw);
            visualizer.drawArrow(x, y, x + dx, y + dy, 1, 3, "#ff0000");
            visualizer.defaultDownload("map");
        } else {
            visualizer.context.fillStyle = "#000000";
            visualizer.context.fillRect(0, 0, visualizer.width, visualizer.height);
            visualizer.context.fillStyle = "#ff0000";
            visualizer.context.font = "20px Arial";
            visualizer.context.fillText(String(name + " (" + message.child_frame_id + ")"), 50, 50);

            visualizer.context.fillText("pose:", 50, 100);
            visualizer.context.fillStyle = "#ffffff";
            visualizer.context.fillText("orientation:", 50, 125);
            visualizer.context.fillText(String("x: " + message.pose.pose.orientation.x.toFixed(3)), 50, 150);
            visualizer.context.fillText(String("y: " + message.pose.pose.orientation.y.toFixed(3)), 50, 175);
            visualizer.context.fillText(String("z: " + message.pose.pose.orientation.z.toFixed(3)), 50, 200);
            visualizer.context.fillText(String("w: " + message.pose.pose.orientation.w.toFixed(3)), 50, 225);
            let q = message.pose.pose.orientation;
            let yaw = -Math.atan2(2.0 * (q.w * q.z + q.w * q.y), q.w * q.w + q.x * q.x - q.y * q.y - q.z * q.z) * 180 / Math.PI;
            visualizer.context.fillText(String("yaw: " + yaw.toFixed(3)), 50, 250);
            visualizer.context.fillText("position:", 50, 275);
            visualizer.context.fillStyle = "#ffffff";
            visualizer.context.fillText(String("x: " + message.pose.pose.position.x.toFixed(3)), 50, 300);
            visualizer.context.fillText(String("y: " + message.pose.pose.position.y.toFixed(3)), 50, 325);
            visualizer.context.fillText(String("z: " + message.pose.pose.position.z.toFixed(3)), 50, 350);

            visualizer.context.fillStyle = "#ff0000";
            visualizer.context.fillText("twist:", 350, 100);
            visualizer.context.fillStyle = "#ffffff";
            visualizer.context.fillText("angular:", 350, 125);
            visualizer.context.fillText(String("x: " + message.twist.twist.angular.x.toFixed(3)), 350, 150);
            visualizer.context.fillText(String("y: " + message.twist.twist.angular.y.toFixed(3)), 350, 175);
            visualizer.context.fillText(String("z: " + message.twist.twist.angular.z.toFixed(3)), 350, 200);
            visualizer.context.fillText("linear:", 350, 275);
            visualizer.context.fillText(String("x: " + message.twist.twist.linear.x.toFixed(3)), 350, 300);
            visualizer.context.fillText(String("y: " + message.twist.twist.linear.y.toFixed(3)), 350, 325);
            visualizer.context.fillText(String("z: " + message.twist.twist.linear.z.toFixed(3)), 350, 350);

            visualizer.defaultDownload(name);
        }
        return true;
    }
    return false;
}
