<a href="https://107-systems.org/"><img align="right" src="https://raw.githubusercontent.com/107-systems/.github/main/logo/107-systems.png" width="15%"></a>
:floppy_disk: `l3xz_frontend`
=============================
[![Spell Check status](https://github.com/107-systems/l3xz_frontend/actions/workflows/spell-check.yml/badge.svg)](https://github.com/107-systems/l3xz_frontend/actions/workflows/spell-check.yml)

Web based frontend for the [L3X-Z hexapod robot](https://github.com/107-systems/l3xz).

<p align="center">
  <a href="https://github.com/107-systems/l3xz"><img src="https://raw.githubusercontent.com/107-systems/.github/main/logo/l3xz-logo-memento-mori-github.png" width="40%"></a>
</p>

# Setup

To run the frontend You need a http-Server, e. g. the one included in Python. Also the [rosbridge_server](http://wiki.ros.org/rosbridge_server) package is required to communicate with the ROS-system on the robot.

~~~bash
# Clone this repository
git clone https://github.com/107-systems/l3xz_frontend
# Launch rosbridge socket server
ros2 launch rosbridge_server rosbridge_websocket.launch &
# Start a http server in the webgui folder
cd webgui
python3 -m http.server 8080
~~~

Finally You can access the landing page in any browser.
<p align="center">
    <img src="doc/indexpage.png">
</p>

# Pages
## Reconning dashboard
<p align="center">
    <img src="doc/reconningpage.png">
</p>
The reconning dashboard page can be used to monitor and operate the exploration of areas.

It has the following features:

* Visualization of multiple sensor messages
* Rendering of a map of the environment
* In time download of sensordata
* Interface for the documentation of selected locations using the recorder node in the [mapping package](https://github.com/107-systems/l3xz-mapping)
* Control of the robot's LEDs
* Optional control of the robot's motion (left joystick: legs, right joystick: sensor head)
* Emergency stop

### Published Topics

TBD

### Subscribed Topics

TBD

### Services

TBD

# Implementation overview

~~~bash
─── webgui                              Root with html and css resources
    ├── javascript                      Javascript root
    │   ├── 3rdparty                    Third party libraries
    │   ├── frontend                    Callbacks for frontend elements
    │   ├── rosinterface                Rosbridge socket interaction 
    │   ├── setup                       Setup routines for pages
    │   ├── util                        Helpers like geocalculation or logging
    │   └── visualizer                  Topic visualization
    │       ├── base                    Rendering cores that can be attached via DOM
    │       └── renderers               Rendering functions sorted by ROS topics
    │           ├── diagnostic-msgs
    │           ├── geometry-msgs
    │           ├── nav-msgs
    │           ├── sensor-msgs
    │           └── std-msgs
    └── resources                       General static resources
~~~

## Adding a new page

To add a new page, a HTML document needs to be created in the root (```webgui```) and linked in ```index.html```. The setup functions, called after loading the static page, are expected to be implemented in ```javascript/setup``` in a new file. The callbacks for static webpage elements should be implemented in a new file in ```javascript/frontend```.

## Adding visualization for a topic

A rendering function for a new topic should be created in a new file according to the hierarchy in ```javascript/visualizer/renderers```. It is important to extend the entries in the ```map.js``` files to make the new function available for the visualizer base. Then, if a topic of the right type is found, the rendering function will be called automatically. A rendering function must have the following signature:

~~~js
/**
 * @param name          Name of the topic
 * @param type          Type of the topic
 * @param message       Current message payload
 * @param visualizer    Visualizer object
 *
 * @return suitable     True, if the topic can be rendered with this function
 **/
function render_message_packet_topic(name, type, message, visualizer)
~~~

The visualizer base is attached to a canvas, which and also it's context are parameters of the ```visualizer``` object.
The function ```visualizer.defaultDownload(name)``` takes a named screenshot of the current rendering. Note, that also the download content can be overwritten by changing the self-explaining parameters ```visualizer.downloadName```, ```visualizer.downloadMIME```, ```visualizer.downloadData```.

## Third-party 

* [download](https://github.com/rndme/download)
* [eventemitter](https://github.com/Olical/EventEmitter)
* [joystick (patched)](https://github.com/bobboteck/JoyStick)
* [jquery](https://github.com/jquery/jquery)
* [plotly](https://github.com/plotly/plotly.js)
* [roslib](https://github.com/RobotWebTools/roslibjs)
