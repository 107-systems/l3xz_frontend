function render_sensor_msgs_CompressedImage(name, type, message, visualizer) {
    if ("sensor_msgs/CompressedImage" == type) {
        visualizer.context.fillStyle = "#000000";
        visualizer.context.fillRect(0, 0, visualizer.width, visualizer.height);
        var image = "data:image/jpg;base64," + message.data;
        var img = new Image();
        img.src = image;
        img.onload = () => {
            var w = img.width;
            var h = img.height;
            var sizer = Math.min((visualizer.width / w), (visualizer.height / h));
            visualizer.context.drawImage(img, 0, 0, w, h, 0, 0, w * sizer, h * sizer);
            visualizer.defaultDownload(name);
        }

        return true;
    }
    return false;
}
