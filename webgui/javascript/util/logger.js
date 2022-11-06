/***************************************************************
This software is distributed under the terms of the MIT License.
Copyright (c) 2022 107-Systems
Author: Jonas Wühr (jonaswuehrmaintainer@gmail.com)
****************************************************************/
class Logger {
    constructor(odom_topic) {
        this.odom = null;
        this.odomSub = new ROSLIB.Topic({
            ros: ros,
            name: odom_topic,
            messageType: '/nav_msgs/Odometry'
        });
        this.subscribe_odom();
    }

    subscribe_odom() {
        function handle(message) {
            logger.odom = message;
        }
        this.odomSub.subscribe(function(message) {
            handle(message);
        });
    }

    set_waypoint(topic, infotag) {
        if (this.odom) {
            let client = new ROSLIB.Service({
                ros: ros,
                name: topic,
                serviceType: 'l3xz_mapping/SetWaypoint'
            });

            let request = new ROSLIB.ServiceRequest({
                waypoint: {
                    header: {
                        seq: 0,
                        frame_id: 'waypoint'
                    },
                    position: {
                        x: logger.odom.pose.pose.position.x,
                        y: logger.odom.pose.pose.position.y,
                        z: logger.odom.pose.pose.position.z
                    },
                    tag: infotag
                }
            });

            client.callService(request, function(result) {
                console.log(result);
            });
        }
    }

    set_startpoint(topic, lat, lon, bearing_deg) {
        console.log(this.odom)
        console.log(bearing_deg)
        if (this.odom) {
            let client = new ROSLIB.Service({
                ros: ros,
                name: topic,
                serviceType: 'l3xz_mapping/SetStartpoint'
            });

            let request = new ROSLIB.ServiceRequest({
                startpoint: {
                    position: {
                        x: logger.odom.pose.pose.position.x,
                        y: logger.odom.pose.pose.position.y,
                        z: logger.odom.pose.pose.position.z
                    },
                    latitude: parseFloat(lat),
                    longitude: parseFloat(lon),
                    bearing: parseFloat(bearing_deg)
                }
            });

            client.callService(request, function(result) {
                console.log(result);
            });
        }
    }

}

var logger = new Logger('/odom_slam');
