function render_sensor_msgs_NavSatFix(name, type, message, visualizer) {
    if ("sensor_msgs/NavSatFix" == type) {

        visualizer.context.fillStyle = "#000000";
        visualizer.context.fillRect(0, 0, visualizer.width, visualizer.height);
        visualizer.context.fillStyle = "#ffffff";
        visualizer.context.font = "30px Arial";
        visualizer.context.fillText(name, 50, 50);
        visualizer.context.fillText(message.latitude, 50, 100);
        visualizer.context.fillText(message.longitude, 50, 150);
        visualizer.defaultDownload(name);

        return true;
    }
    return false;
}
