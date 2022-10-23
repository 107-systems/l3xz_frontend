/***************************************************************
This software is distributed under the terms of the MIT License.
Copyright (c) 2022 107-Systems
Author: Jonas Wühr
****************************************************************/
var mapShow = 0;
var trackShow = 0;

function select_topic_onchange() {
    var selected = document.getElementById("select_topic").value;
 
    visualizer.setCanvas();
    if(mapShow == selected)
    {
      topics = topicsManager.getAllTopicDescriptions();
      visualizer.clearCanvas();
      var subscribed = []
      for (i in topics) 
      {
        var current = topics[i];

        for (k in current) {
            var topic = current[k];
            if("/rtabmap/grid_map" == topic[1] || "/odom_slam" == topic[1])
            {
              subscribed.push(topic[0])
            }
        }
      }
      topicsManager.subscribeTopics(subscribed);
      visualizer.enableMap(true);
      visualizer.enableTrack(false);
    }
    else if(trackShow == selected)
    {
      topics = topicsManager.getAllTopicDescriptions();
      visualizer.clearCanvas();
      var subscribed = []
      for (i in topics) 
      {
        var current = topics[i];

        for (k in current) {
            var topic = current[k];
            if("/route" == topic[1] ||/* "/gps_data"*/ "/ublox_gps/fix" == topic[1])
            {
              subscribed.push(topic[0])
            }
        }
      }
      topicsManager.subscribeTopics(subscribed);
      visualizer.enableMap(false);
      visualizer.enableTrack(true);
    }
    else
    {
      visualizer.enableMap(false);
      visualizer.enableTrack(false);
      topicsManager.subscribeTopic(selected);
      visualizer.clearCanvas();
      visualizer.showIdle();
    }
}

function select_topic_refresh() {
    topics = topicsManager.getAllTopicDescriptions();

    var $select = $('#select_topic');
    $select.find('optgroup').remove().end();
    $select.find('option').remove().end();

    var value = 0;

    for (i in topics) {
        var current = topics[i];
        var $optgroup = $("<optgroup label = '" + String(i) + "'>");

        for (k in current) {
            var topic = current[k];
            value = topic[0];
            var opt = "<option value=" + value + ">" + String(topic[1]) + "</option>";
            $optgroup.append(opt)
        }
        $optgroup.appendTo($select);
    }
    var $optgroup = $("<optgroup label = 'special'>");
    mapShow = value;
    $optgroup.append(opt);
    $optgroup.appendTo($select);
    value = value + 1;
    var opt = "<option value=" + value + ">track</option>";
    trackShow = value;
    $optgroup.append(opt);
    $optgroup.appendTo($select);
}

function button_download_onclick()
{
    visualizer.download();
}
