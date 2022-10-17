/***************************************************************
This software is distributed under the terms of the MIT License.
Copyright (c) 2022 107-Systems
Author: Jonas Wühr
****************************************************************/
function button_up_onclick() {
    joydrive.up();
}

function button_down_onclick() {
    joydrive.down();
}

function button_left_onclick() {
    joydrive.left();
}

function button_right_onclick() {
    joydrive.right();
}

function button_emstop_onclick() {
    emergencyStop.press();
}

function button_emstop_change(pressed) {
    if(pressed)
    {
        joydrive.stop();
    }
    var btn = document.getElementById("button_emstop");
    if (btn == null) {
        return;
    }

    if (pressed) {
        btn.style.backgroundColor = 'yellow';
    }
    else {
        btn.style.backgroundColor = 'red';
    }
}

function button_download_onclick()
{
    vis1.download();
    vis2.download();
    vis3.download();
    vis4.download();
    vis5.download();
}

function set_rgb(topic, r_on, g_on, b_on)
{
  var client = new ROSLIB.Service({
    ros : ros,
    name : topic,
    serviceType : 'l3xz_openmv_camera/Rgb'
  });

  var request = new ROSLIB.ServiceRequest({
    r : r_on,
    g : g_on,
    b : b_on
  });

  client.callService(request, function(result) { console.log(result);});
}

function set_ir(topic, ir_on)
{
  var client = new ROSLIB.Service({
    ros : ros,
    name : topic,
    serviceType : 'l3xz_openmv_camera/Ir'
  });

  var request = new ROSLIB.ServiceRequest({
    on : ir_on
  });

  client.callService(request, function(result) { console.log(result);});
}

function thermal_lighting_onclick()
{
  set_rgb('/l3xz/openmv_thermal/rgb', document.getElementById("thermal_red").checked,
          document.getElementById("thermal_green").checked,
          document.getElementById("thermal_blue").checked);
  set_ir('/l3xz/openmv_thermal/ir', document.getElementById("thermal_ir").checked);
}

function rgb_lighting_onclick()
{
  set_rgb('/l3xz/openmv_rgb/rgb', document.getElementById("rgb_red").checked,
          document.getElementById("rgb_green").checked,
          document.getElementById("rgb_blue").checked);
  set_ir('/l3xz/openmv_rgb/ir', document.getElementById("rgb_ir").checked);
}

function button_log_onclick()
{
  switch(document.getElementById("select_tag").value)
  {
    case "thermal": logger.set_waypoint("/l3xz/thermal_recorder/set_waypoint", "thermal");  break;
    case "radiation": logger.set_waypoint("/l3xz/radiation_recorder/set_waypoint", "radiation"); break;
    default: console.log("tag not implemented"); break;
  }
}

function button_startlog_onclick()
{
  logger.set_startpoint("/l3xz/thermal_recorder/set_startpoint", document.getElementById("input_startlat").value, document.getElementById("input_startlon").value, document.getElementById("input_startbearing").value);
  logger.set_startpoint("/l3xz/radiation_recorder/set_startpoint", document.getElementById("input_startlat").value, document.getElementById("input_startlon").value, document.getElementById("input_startbearing").value);
  logger.set_startpoint("/l3xz/odom_recorder/set_startpoint", document.getElementById("input_startlat").value, document.getElementById("input_startlon").value, document.getElementById("input_startbearing").value);
}
