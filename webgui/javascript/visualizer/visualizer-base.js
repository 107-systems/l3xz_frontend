class Visualizer {
    constructor(divId, canvasId) {
        this.divId = divId;
        this.canvasId = canvasId;
        this.canvas = null;
        this.context = null;
        this.width = 0;
        this.height = 0;

        this.downloadData = null;
        this.downloadMIME = null;
        this.downloadName = null;

        this.messages = new Map();

        this.origin = new Map();
        this.origin.set('position', {
            'x': 0,
            'y': 0,
            'z': 0
        });
        this.origin.set('orientation', {
            'raw': 0,
            'pitch': 0,
            'yaw': 0
        });
        this.odometry = new Map(this.origin);
    }

    connectCanvas() {
        this.canvas = document.getElementById(this.canvasId);
        this.context = this.canvas.getContext("2d");
        this.width = this.canvas.width;
        this.height = this.canvas.height;
    }

    showCanvas(show) {
        var mode = "block";
        if (!show) {
            mode = "none";
        }

        document.getElementById(this.canvasId).style.display = mode;
    }

    clearCanvas() {
        this.showCanvas(true);
        this.context.fillStyle = "#000000";
        this.canvas.height = this.height;
        this.canvas.width = this.width;
        this.context.scale(1, 1);
        this.context.fillRect(0, 0, this.width, this.height);
        this.context.setTransform(1, 0, 0, 1, 0, 0);
    }

    insertMessage(messageName) {
        this.messages.set(messageName, {
            'data': null,
            'type': null
        });
    }

    deleteMessage(messageName) {
        this.messages.delete(messageName);
    }

    getRequiredMessages() {
        return this.messages.keys();
    }

    updateMessage(name, message, type) {
        if (this.messages.has(name)) {
            this.messages.set(messageName, {
                'data': message,
                'type': type
            });
        }
    }

    showIdle() {
        this.showCanvas(true);
        if (this.context != null) {
            this.context.fillStyle = "#000000";
            this.context.fillRect(0, 0, this.width, this.height);
            this.context.fillStyle = "#ffffff";
            this.context.font = "30px Arial";
            this.context.fillText("Waiting for next callback", 50, 50);
        }
    }

    defaultDownload(name) {
        this.downloadName = name;
        this.downloadMIME = "image/jpeg";
        this.downloadData = this.canvas.toDataURL("image/jpeg");
    }

    download() {
        if (null != this.downloadData) {
            console.log(this.downloadData);
            download(this.downloadData, this.downloadName, this.downloadMIME);
        }
    }

    render() {
       this.connectCanvas(); 
       this.showIdle();
    }
}
