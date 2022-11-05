/***************************************************************
This software is distributed under the terms of the MIT License.
Copyright (c) 2022 107-Systems
Author: Jonas Wühr
****************************************************************/
var vis1;
var vis2;
var vis3;
var vis4;
var vis5;
var topicsManager;
var joyhead;
var joyvis;

function autoscaleElrob() {
    scale(3000, 2000)
};

function initElrob() {
    let parameters = {
        title: "control",
        internalFillColor: "#FF0000",
        internalStrokeColor: "#008000",
        internalLineWidth: 3,
        externalLineWidth: 3,
        externalStrokeColor: "#000000",
        autoReturnToCenter: false,
    }
    joysteer = new JoyStick('steerstick', parameters);
    parameters.title = "head";
    joyhead = new JoyStick('headstick', parameters);
    
    topicsManager = new TopicsManager(false);
    vis1 = new Visualizer("div_screen1", "canvas_screen1");
    vis2 = new Visualizer("div_screen2", "canvas_screen2");
    vis3 = new Visualizer("div_screen3", "canvas_screen3");
    vis4 = new Visualizer("div_screen4", "canvas_screen4");
    vis5 = new Visualizer("div_screen5", "canvas_screen5");
    vis1.insertMessage("/road_detector/road_lidar");
    vis2.insertMessage("/road_detector/roaddetector/out/compressed");
    vis3.insertMessage("/road_detector/roaddetector/way/compressed");
    vis4.insertMessage("/grid_planner/planner/out/compressed");
    vis5.insertMessage("/rtabmap/grid_map");

    topicsManager = new TopicsManager(false);
    topicsManager.appendVisualizer(vis1);
    topicsManager.appendVisualizer(vis2);
    topicsManager.appendVisualizer(vis3);
    topicsManager.appendVisualizer(vis4);
    topicsManager.appendVisualizer(vis5);
    
    getTopics(topicsManager);
    setTimeout(function() {
        topicsManager.subscribeRequiredTopics();
        autoscaleElrob();
        window.onresize = autoscaleElrob
        let interval =setInterval(function(){vis1.render();
        vis2.render();
        vis3.render();
        vis4.render();
        vis5.render();}, 100);
        }, 2000);
        autoscaleElrob();
        window.onresize = autoscaleElrob
}
