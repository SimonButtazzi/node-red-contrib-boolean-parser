node-red-contrib-boolean-parser
==============================

A [Node-RED](http://nodered.org) node to parse and convert several types of on/off, start/stop, true/false values.

---

**Be careful, this package is still under development.**

## Install

Run the following command in your Node-RED user directory - typically `~/.node-red`:

```
npm install node-red-contrib-power-monitor
```

### docker

running node-red in an docker environment this should do the job:

enter container:

```
docker exec -it <containername> /bin/bash
```
inside container:
```
cd /data
npm install node-red-contrib-power-monitor
```

## Usage

### Source Field

tbd 

### Target Field

tbd

### Input Formats

All input values which represent a supportet output format are detected automatically.

### Supportet Output Formats
for boolean true and false

* true / false
* "true" / "false"
* "True" / "False"
* "TRUE" / "FALSE"
* 1 / 0
* "1" / "0"
* "start" / "stop"
* "started" / "stopped"
* "enable" / "disable"
* "enabled" / "disabled"
* "activated" / "deactivated"
* "active" / "inactive"
* "running" / "stopped"
* "run" / "stop"
* "on" / "off"
* "On" / "Off"
* "ON" / "OFF"

## Examples
tbd

## Contribute

There are several ways to contribute to this project. You can [report](https://github.com/SimonButtazzi/node-red-contrib-boolean-parser/issues) bugs or [ask](https://github.com/SimonButtazzi/node-red-contrib-boolean-parser/issues) for new features directly on GitHub.
You can also submit your own new features of bug fixes via a [pull request](https://github.com/SimonButtazzi/node-red-contrib-boolean-parser/issueshttps://github.com/SimonButtazzi/node-red-contrib-boolean-parser/pr).

And of course you can always buy me a beer, coffee, ... via the donation button:

[![donate](https://img.shields.io/badge/donate-PayPal-blue.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=simon%2ebuttazzi%40gmail%2ecom&lc=US&no_note=0&currency_code=EUR&bn=PP%2dDonationsBF%3abtn_donate_LG%2egif%3aNonHostedGuest)

## License

tbd