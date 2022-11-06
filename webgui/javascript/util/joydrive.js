/***************************************************************
This software is distributed under the terms of the MIT License.
Copyright (c) 2022 107-Systems
Author: Jonas Wühr (jonaswuehrmaintainer@gmail.com)
****************************************************************/
class Joydrive {
    constructor(maxX, maxR, xStep, rStep) {
        this.maxX = maxX;
        this.maxR = maxR;
        this.xStep = xStep;
        this.rStep = rStep;

        this.vX = 0.0;
        this.vR = 0.0;

        this.cmdVel = new ROSLIB.Topic({
            ros: ros,
            name: '/cmd_vel',
            messageType: 'geometry_msgs/Twist'
        });
    }

    publish() {
        if (emergencyStop.isPressed()) {
            this.vX = 0.0;
            this.vR = 0.0;
        }
        let twist = new ROSLIB.Message({
            linear: {
                x: this.vX,
                y: 0.0,
                z: 0.0
            },
            angular: {
                x: 0.0,
                y: 0.0,
                z: this.vR
            }
        });
        this.cmdVel.publish(twist);
    }

    up() {
        this.vX += this.xStep;
        if (this.vX > this.maxX) {
            this.vX = this.maxX;
        }

        this.publish();
    }

    down() {
        this.vX -= this.xStep;
        if (this.vX < -this.maxX) {
            this.vX = -this.maxX;
        }

        this.publish();
    }

    right() {
        this.vR += this.rStep;
        if (this.vR > this.maxR) {
            this.vR = this.maxR;
        }

        this.publish();
    }

    left() {
        this.vR -= this.rStep;
        if (this.vR < -this.maxR) {
            this.vR = -this.maxR;
        }

        this.publish();
    }

    stop() {
        this.vR = 0.0;
        this.vX = 0.0;
        this.publish();
    }
}

var joydrive = new Joydrive(2.0, 2.0, 0.1, 0.1);
