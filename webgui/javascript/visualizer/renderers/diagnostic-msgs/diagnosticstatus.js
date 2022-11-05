function render_diagnostic_msgs_DiagnosticStatus(name, type, message, visualizer) {
    if ("diagnostic_msgs/DiagnosticStatus" == type) {
        visualizer.context.fillStyle = "#000000";
        visualizer.context.fillRect(0, 0, visualizer.width, visualizer.height);
        visualizer.context.fillStyle = "#ffffff";
        visualizer.context.font = "30px Arial";
        visualizer.context.fillText(name, 50, 50);
        var text;
        switch (message.level) {
            case 0:
                text = "OK";
                break;
            case 1:
                text = "WARN";
                break;
            case 2:
                text = "ERROR";
                break;
            case 3:
                text = "STALE";
                break;
            default:
                text = "";
                break;
        }
        visualizer.context.fillText(text, 50, 100);
        visualizer.defaultDownload(name);
    return true;
    }
return false;
}
