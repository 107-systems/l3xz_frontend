/***************************************************************
This software is distributed under the terms of the MIT License.
Copyright (c) 2022 107-Systems
Author: Jonas Wühr
****************************************************************/
function render_sensor_msgs_CompressedImage(name, type, message, visualizer) {
    if ("sensor_msgs/CompressedImage" == type) {
        visualizer.context.fillStyle = "#000000";
        visualizer.context.fillRect(0, 0, visualizer.width, visualizer.height);
        let image = "data:image/jpg;base64," + message.data;
        let img = new Image();
        img.src = image;
        img.onload = () => {
            let w = img.width;
            let h = img.height;
            let sizer = Math.min((visualizer.width / w), (visualizer.height / h));
            visualizer.context.drawImage(img, 0, 0, w, h, 0, 0, w * sizer, h * sizer);
            visualizer.defaultDownload(name);
        }

        return true;
    }
    return false;
}
