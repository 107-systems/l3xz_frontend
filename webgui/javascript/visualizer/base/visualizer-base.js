/***************************************************************
This software is distributed under the terms of the MIT License.
Copyright (c) 2022 107-Systems
Author: Jonas Wühr (jonaswuehrmaintainer@gmail.com)
****************************************************************/
class Visualizer {
    constructor(divId, canvasId) {
        this.divId = divId;
        this.canvasId = canvasId;
        this.canvas = null;
        this.context = null;
        this.width = 0;
        this.height = 0;
        this.update = false;

        this.downloadAvailable = false;
        this.downloadData = null;
        this.downloadMIME = null;
        this.downloadName = null;

        this.messages = new Map();
    }

    connectCanvas() {
        this.canvas = document.getElementById(this.canvasId);
        this.context = this.canvas.getContext("2d");
        this.width = this.canvas.width;
        this.height = this.canvas.height;
    }

    showCanvas(show) {
        let mode = "block";
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
        let keys = [];
        for (let [k, v] of this.messages.entries()) {
            keys.push(k);
        }
        return keys;
    }

    getRequiredMessageTypes() {
        let types = [];
        for (let [k, v] of this.messages.entries()) {
            types.push(v.type);
        }
        return types;
    }

    updateMessage(name, type, message) {
        if (this.messages.has(name)) {
            this.update = true;
            this.messages.set(name, {
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

    download_nonblocking() {
        if (this.downloadAvailable) {
            if (null != this.downloadData) {
                download(this.downloadData, this.downloadName, this.downloadMIME);
            }
        } else {
            setTimeout(this.download_nonblocking, 100);
        }
    }

    download() {
        this.download_nonblocking();
    }
    show(name, type, message) {
        this.showIdle();
    }

    render() {
        if (this.update) {
            this.update = false;
            this.downloadAvailable = false;

            this.connectCanvas();
            this.clearCanvas();
            this.showCanvas(true);
            for (let name of this.messages.keys()) {
                const payload = this.messages.get(name);
                for (let rs = 0; rs < renderers.length; rs++) {
                    let all = renderers[rs];
                    for (let r = 0; r < all.length; r++) {
                        let current = all[r]
                        if (current(name, payload.type.replace('/msg', ''), payload.data, this)) {
                            break;
                        }
                    }
                }
            }
            this.downloadAvailable = true;
        }
    }

    drawArrow(fromx, fromy, tox, toy, lineWidth, headLength, style) {
        let ctx = this.context;
        const width = lineWidth;
        let headlen = headLength;

        let angle = Math.atan2(toy - fromy, tox - fromx);
        tox -= Math.cos(angle) * ((width * 1.15));
        toy -= Math.sin(angle) * ((width * 1.15));

        ctx.beginPath();
        ctx.moveTo(fromx, fromy);
        ctx.lineTo(tox, toy);
        ctx.strokeStyle = style;
        ctx.lineWidth = width;
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(tox, toy);
        ctx.lineTo(tox - headlen * Math.cos(angle - Math.PI / 7), toy - headlen * Math.sin(angle - Math.PI / 7));

        ctx.lineTo(tox - headlen * Math.cos(angle + Math.PI / 7), toy - headlen * Math.sin(angle + Math.PI / 7));
        ctx.lineTo(tox, toy);
        ctx.lineTo(tox - headlen * Math.cos(angle - Math.PI / 7), toy - headlen * Math.sin(angle - Math.PI / 7));

        ctx.strokeStyle = style;
        ctx.lineWidth = width;
        ctx.stroke();
        ctx.fillStyle = style;
        ctx.fill();
    }

}
