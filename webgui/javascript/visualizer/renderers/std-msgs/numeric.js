/***************************************************************
This software is distributed under the terms of the MIT License.
Copyright (c) 2022 107-Systems
Author: Jonas Wühr (jonaswuehrmaintainer@gmail.com)
****************************************************************/
function render_std_msgs_Numeric(name, type, message, visualizer) {
    if ("std_msgs/Int8" == type ||
        "std_msgs/Int16" == type ||
        "std_msgs/Int32" == type ||
        "std_msgs/Int64" == type ||
        "std_msgs/UInt8" == type ||
        "std_msgs/UInt16" == type ||
        "std_msgs/UInt32" == type ||
        "std_msgs/UInt64" == type ||
        "std_msgs/Float32" == type ||
        "std_msgs/Float64" == type) {
        visualizer.context.fillStyle = "#000000";
        visualizer.context.fillRect(0, 0, visualizer.width, visualizer.height);
        visualizer.context.fillStyle = "#ffffff";
        visualizer.context.font = "30px Arial";
        visualizer.context.fillText(name, 50, 50);
        visualizer.context.fillText(message.data, 50, 100);
        visualizer.defaultDownload(name);

        return true;
    }
    return false;
}
