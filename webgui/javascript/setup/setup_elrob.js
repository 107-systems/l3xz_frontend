var vis1;
var vis2;
var vis3;
var vis4;
var vis5;
var joyhead;
var joyvis;

function autoscaleElrob() {
    scale(3000, 2000)
};

function initElrob() {
    vis1 = new Visualizer("div_screen5", "canvas_screen5");
    vis1.insertMessage("/cmd_vel");
    let topicsManager1 = new TopicsManager(false);
    topicsManager1.appendVisualizer(vis1);
/*    vis2 = new Visualizer("div_filter", "canvas_screen2");
    var topicsManager2 = new TopicsManager(vis2, false);
    vis3 = new Visualizer("div_global", "canvas_screen3");
    var topicsManager3 = new TopicsManager(vis3, false);
    vis4 = new Visualizer("div_local", "canvas_screen4");
    var topicsManager4 = new TopicsManager(vis4, false);
    vis5 = new Visualizer("div_local", "canvas_screen5");
    var topicsManager5 = new TopicsManager(vis5, false);*/
    getTopics(topicsManager1);
/*    getTopics(topicsManager2);
    getTopics(topicsManager3);
    getTopics(topicsManager4);
    getTopics(topicsManager5);
*/
    let subscribed1 = [];
/*    var subscribed2 = [];
    var subscribed3 = [];
    var subscribed4 = [];
    var subscribed5 = [];
*/
 //   function init() {
        setTimeout(function() {
            var topics = topicsManager1.getAllTopicDescriptions();
            for (i in topics) {
                let current = topics[i];
                for (k in current) {
                    let topic = current[k];
                    console.log(topic);
                    if ("/cmd_vel" == topic[1]) {
                        subscribed1.push(topic[0]);
                    }
 /*                   if ("/l3xz/openmv_rgb/image_color_compressed" == topic[1]) {
                        subscribed2.push(topic[0]);
                    }
                    if ("/camera/depth/image_rect_raw/compressed" == topic[1]) {
                        subscribed3.push(topic[0]);
                    }
                    if ("/camera/color/image_raw/compressed" == topic[1]) {
                        subscribed4.push(topic[0]);
                    }
                    if ("/rtabmap/grid_map" == topic[1] || "/odom_slam" == topic[1]) {
                        subscribed5.push(topic[0]);
                    }
 */               }
            }
            console.log(subscribed1);
            topicsManager1.subscribeTopics(subscribed1);
/*            topicsManager2.subscribeTopics(subscribed2);
            topicsManager3.subscribeTopics(subscribed3);
            topicsManager4.subscribeTopics(subscribed4);
            topicsManager5.subscribeTopics(subscribed5);
            vis5.enableMap(true);
 */     
        autoscaleElrob();
        window.onresize = autoscaleElrob
        console.log(vis1);
        let interval =setInterval(function(){vis1.render()}, 100);
        }, 2000);
        autoscaleElrob();
        window.onresize = autoscaleElrob
 //   }
 //   document.addEventListener('DOMContentLoaded', init, false);
}
