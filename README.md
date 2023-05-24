<a href="https://107-systems.org/"><img align="right" src="https://raw.githubusercontent.com/107-systems/.github/main/logo/107-systems.png" width="15%"></a>
:floppy_disk: `l3xz_frontend`
=============================
[![Build Status](https://github.com/107-systems/l3xz_frontend/actions/workflows/ros2.yml/badge.svg)](https://github.com/107-systems/l3xz_frontend/actions/workflows/ros2.yml)
[![Spell Check status](https://github.com/107-systems/l3xz_frontend/actions/workflows/spell-check.yml/badge.svg)](https://github.com/107-systems/l3xz_frontend/actions/workflows/spell-check.yml)

Web based frontend for the [L3X-Z hexapod robot](https://github.com/107-systems/l3xz).

<p align="center">
  <a href="https://github.com/107-systems/l3xz"><img src="https://raw.githubusercontent.com/107-systems/.github/main/logo/l3xz-logo-memento-mori-github.png" width="40%"></a>
</p>

**Note**: To run the frontend you need a http-Server, e.g. the one included in Python. Furthermore the [rosbridge_server](http://wiki.ros.org/rosbridge_server) package is required to communicate with the ROS-system on the robot.

#### How-to-build
##### Build via `colcon`
```bash
cd $COLCON_WS/src
git clone --recursive https://github.com/107-systems/l3xz_frontend
cd $COLCON_WS
source /opt/ros/humble/setup.bash
PYTHONWARNINGS=ignore:::setuptools.command.install,ignore:::setuptools.command.easy_install,ignore:::pkg_resources colcon build --packages-select l3xz_frontend
```

#### How-to-run
```bash
cd $COLCON_WS
. install/setup.bash
ros2 launch rosbridge_server rosbridge_websocket_launch.xml &
ros2 run l3xz_frontend l3xz_frontend
```

# Pages
## L3X-Z dashboard
<p align="center">
    <img src="doc/reconningpage.png">
</p>
The L3X-Z dashboard page can be used to monitor and operate the exploration of areas.

It has the following features:

* Visualization of multiple sensor messages
* Rendering of a map of the environment
* In time download of sensor data
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
    │   ├── setup                       Setup routines for pages
    │
    ├── l3xz_frontend_base              Submodule with base functionality
    └── resources                       General static resources
~~~

## Adding a new page

To add a new page, a HTML document needs to be created in the root (```webgui```) and linked in ```index.html```. The setup functions, called after loading the static page, are expected to be implemented in ```javascript/setup``` in a new file. The callbacks for static webpage elements should be implemented in a new file in ```javascript/frontend```.
