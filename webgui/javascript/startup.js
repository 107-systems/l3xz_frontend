function autoscale()
{ 
  scale(2000, 1000)
};

function autoscale2()
{ 
  scale(3000, 2000)
};

function scale(facX, facY)
{
    ratioW = window.innerWidth / facX;
    ratioH = window.innerHeight / facY;
    ratio = 2 * Math.min(ratioH, ratioW);
    $('body').css('-moz-transform', 'scale(' + ratio + ')');
    $('body').css('-o-transform', 'scale(' + ratio + ')');
    $('body').css('-webkit-transform', 'scale(' + ratio + ')');
    $('body').css('transform', 'scale(' + ratio + ')');
    console.log("autoscale")
}

var visualizer = new Visualizer("div_screen", "canvas_screen");
var topicsManager = new TopicsManager(visualizer, true); 
function init()
{
//    autoscale();
    getTopics(topicsManager);
//    window.onresize = autoscale;
    document.addEventListener('DOMContentLoaded', init, false);	
    prepareJoydrive(true);
}

var vis1;
var vis2;
var vis3;
var vis4;
var vis5;
function initElrob()
{
          vis1 = new Visualizer("div_road", "canvas_screen1");
          var topicsManager1 = new TopicsManager(vis1, false);
          vis2 = new Visualizer("div_filter", "canvas_screen2");
          var topicsManager2 = new TopicsManager(vis2, false);
          vis3 = new Visualizer("div_global", "canvas_screen3");
          var topicsManager3 = new TopicsManager(vis3, false);
          vis4 = new Visualizer("div_local", "canvas_screen4");
          var topicsManager4 = new TopicsManager(vis4, false);
          vis5 = new Visualizer("div_local", "canvas_screen5");
          var topicsManager5 = new TopicsManager(vis5, false);
          getTopics(topicsManager1);
          getTopics(topicsManager2);
          getTopics(topicsManager3);
          getTopics(topicsManager4);
          getTopics(topicsManager5);
         
          var subscribed1 = [];
          var subscribed2 = [];
          var subscribed3 = [];
          var subscribed4 = [];
          var subscribed5 = [];
          
          function init(){setTimeout(function(){
          var topics = topicsManager1.getAllTopicDescriptions();
          for (i in topics) {
                    var current = topics[i];
                    for (k in current) {
                      var topic = current[k];
                      console.log(topic);
                      if("/l3xz/openmv_thermal/image_color_compressed" == topic[1])
                      {
                        subscribed1.push(topic[0]);
                      }
                      if("/l3xz/openmv_rgb/image_color_compressed" == topic[1])
                      {
                        subscribed2.push(topic[0]);
                      }
                      if("/camera/depth/image_rect_raw/compressed" == topic[1])
                      {
                        subscribed3.push(topic[0]);
                      }
                      if("/camera/color/image_raw/compressed" == topic[1])
                      {
                        subscribed4.push(topic[0]);
                      }
                      if("/rtabmap/grid_map" == topic[1] || "/odom_slam" == topic[1])
                      {
                        subscribed5.push(topic[0]);
                      }
                   }
                   }
                   topicsManager1.subscribeTopics(subscribed1);
                   topicsManager2.subscribeTopics(subscribed2);
                   topicsManager3.subscribeTopics(subscribed3);
                   topicsManager4.subscribeTopics(subscribed4);
                   topicsManager5.subscribeTopics(subscribed5);
                   vis5.enableMap(true);
        window.onresize = autoscale2 }, 2000)}
        document.addEventListener('DOMContentLoaded', init, false);
}
