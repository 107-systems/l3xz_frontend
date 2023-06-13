/***************************************************************
This software is distributed under the terms of the MIT License.
Copyright (c) 2022 107-Systems
Author: Jonas Wühr (jonaswuehrmaintainer@gmail.com)
****************************************************************/

// Rendering elements
var vis1;
var vis2;
var vis3;
var vis4;
var vis5;
var topicsManager;

// Controllers
//var joyLeg;
//var joyHead;
//var cmdLeg;
//var cmdHead;
//var controlEnable;

// Adapt autoscale function
function autoscaleElrob() {
    scale(3000, 2000)
};

function loadJS(url) {
    return new Promise(function(resolve, reject) {
        let script = document.createElement('script');
        script.src = url;
        script.async = false;
        script.onload = function() {
            resolve(url);
        };
        script.onerror = function() {
            reject(url);
        };
        document.body.appendChild(script);
    });
}

function initElrob() {

    // Load all files from here to provide a clean HTML file
    urls = [
        "l3xz_frontend_base/base_js/3rdparty/download.min.js",
        "l3xz_frontend_base/base_js/3rdparty/eventemitter.js",
        "l3xz_frontend_base/base_js/3rdparty/joystick.js",
        "l3xz_frontend_base/base_js/3rdparty/jquery.js",
        "l3xz_frontend_base/base_js/3rdparty/plotly-latest.min.js",
        "l3xz_frontend_base/base_js/3rdparty/roslib.js",
        "javascript/frontend/frontend_elrob.js",
        "l3xz_frontend_base/base_js/rosinterface/rosinterface.js",
        "l3xz_frontend_base/base_js/rosinterface/topics.js",
        "l3xz_frontend_base/base_js/util/emergencystop.js",
        "l3xz_frontend_base/base_js/util/geoUtils.js",
        "l3xz_frontend_base/base_js/util/logger.js",
        "l3xz_frontend_base/base_js/util/scale.js",
        "l3xz_frontend_base/base_js/visualizer/base/visualizer-base.js",
        "l3xz_frontend_base/base_js/visualizer/renderers/sensor-msgs/laserscan.js",
        "l3xz_frontend_base/base_js/visualizer/renderers/sensor-msgs/compressedimage.js",
        "l3xz_frontend_base/base_js/visualizer/renderers/sensor-msgs/navsatfix.js",
        "l3xz_frontend_base/base_js/visualizer/renderers/sensor-msgs/map.js",
        "l3xz_frontend_base/base_js/visualizer/renderers/diagnostic-msgs/diagnosticstatus.js",
        "l3xz_frontend_base/base_js/visualizer/renderers/diagnostic-msgs/map.js",
        "l3xz_frontend_base/base_js/visualizer/renderers/std-msgs/numeric.js",
        "l3xz_frontend_base/base_js/visualizer/renderers/std-msgs/map.js",
        "l3xz_frontend_base/base_js/visualizer/renderers/nav-msgs/odometry.js",
        "l3xz_frontend_base/base_js/visualizer/renderers/nav-msgs/occupancygrid.js",
        "l3xz_frontend_base/base_js/visualizer/renderers/nav-msgs/map.js",
        "l3xz_frontend_base/base_js/visualizer/renderers/geometry-msgs/twist.js",
        "l3xz_frontend_base/base_js/visualizer/renderers/geometry-msgs/map.js",
        "l3xz_frontend_base/base_js/visualizer/renderers/maps.js"
    ];

    let promises = [];
    for (let url in urls) {
        promises.push(loadJS(urls[url]));
    }

    Promise.all(promises)
        .then(function() {
            let joystickParameters = {
                title: "control",
                internalFillColor: "#00E46F",
                internalStrokeColor: "#EA0052",
                internalLineWidth: 3,
                externalLineWidth: 3,
                externalStrokeColor: "#D40045",
                autoReturnToCenter: false,
            }
	    //joyLeg = new JoyStick('legstick', joystickParameters);
            //joystickParameters.title = "head";
            //joyHead = new JoyStick('headstick', joystickParameters);

            //cmdLeg = new ROSLIB.Topic({
            //    ros: ros,
            //    name: '/l3xz/joy_leg',
            //    messageType: 'sensor_msgs/Joy'
            //});
            //cmdHead = new ROSLIB.Topic({
            //    ros: ros,
            //    name: '/l3xz/joy_head',
            //    messageType: 'sensor_msgs/Joy'
            //});

            topicsManager = new TopicsManager(false);
            vis1 = new Visualizer("div_screen1", "canvas_screen1");
            vis2 = new Visualizer("div_screen2", "canvas_screen2");
            vis3 = new Visualizer("div_screen3", "canvas_screen3");
            vis4 = new Visualizer("div_screen4", "canvas_screen4");
            vis5 = new Visualizer("div_screen5", "canvas_screen5");
            vis1.insertMessage("/l3xz/openmv_thermal/image_color_compressed");
            vis2.insertMessage("/l3xz/openmv_rgb/image_color_compressed");
            vis3.insertMessage("/camera/depth/image_rect_raw/compressed");
            vis4.insertMessage("/camera/color/image_raw/compressed");
            //vis5.insertMessage("/rtabmap/grid_map");
            // vis5.insertMessage("/odom_slam");
            vis5.insertMessage("/l3xz/openmv_rgb/image_color_compressed");
            
            topicsManager = new TopicsManager(false);
            topicsManager.appendVisualizer(vis1);
            topicsManager.appendVisualizer(vis2);
            topicsManager.appendVisualizer(vis3);
            topicsManager.appendVisualizer(vis4);
            topicsManager.appendVisualizer(vis5);

            getTopics(topicsManager);

            controlEnable = false;

            // Start reconning interface
            setTimeout(function() {
                topicsManager.subscribeRequiredTopics();
                autoscaleElrob();
                window.onresize = autoscaleElrob
                let interval = setInterval(function() {
                    vis1.render();
                    vis2.render();
                    vis3.render();
                    vis4.render();
                    vis5.render();
                    //controlEnable = false;
                    //if (controlEnable) {
                    //    cmdLeg.publish(new ROSLIB.Message({
                    //        axes: [parseFloat(joyLeg.GetX() * 0.01), parseFloat(joyLeg.GetY() * 0.01)],
                    //        buttons: []
                    //    }));
                    //    cmdHead.publish(new ROSLIB.Message({
                    //        axes: [parseFloat(joyHead.GetX() * 0.01), parseFloat(joyHead.GetY() * 0.01)],
                    //        buttons: []
                    //    }));
                    //}
                }, 100);

            }, 2000);
            autoscaleElrob();
            window.onresize = autoscaleElrob
        }).catch(function(script) {
            console.log("Could not load " + script);
        });
}
