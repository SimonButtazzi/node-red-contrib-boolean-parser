node-red-contrib-boolean-parser
==============================

A [Node-RED](http://nodered.org) node to parse and convert several types of on/off, start/stop, true/false values.

---
**Be careful, this package is still under development.**

This packages provides an additional node in parser section. You can use it to transform properties describung boolean states. For example running or stopped (String) to 1 or 0 (int). Input values will be detected automatically.

![node-appearance](assets/node-boolean-parser.png "Node appearance")

## Install

Burgemenu on the right -> Manage palette -> Tab Install -> serach for  _node-red-contrib-boolean-parser_ -> press install

### CLI
Run the following command in your Node-RED user directory - typically `~/.node-red`:

```
npm install node-red-contrib-boolean-parser
```

### Docker

running node-red in an docker environment this should do the job:

enter container:

```
docker exec -it <containername> /bin/bash
```
inside container:
```
cd /data
npm install node-red-contrib-boolean-parser
```

## Usage

Think of a device stating running and stopped. You want to send string like ON or OFF in MQTT, write values like 1 and 0 to influxDB show messages status like enabled and disabled and following nodes exept boolean values.
 
To be honest nearly every type tranformation can be realized by multiple switch and change nodes or function nodes having individual code (see example tbd). But to keep it simple, stable and universal it is easier to have a node handling this and you don't need to blow up your flows.

![Node Configuration](assets/node-config.png "Node Configuration")

### Input field

A field of the message, which contains the value to be parsed.

### Output field

A field of the message, which should be used for output. A existing field will be overwritten.

### Supportet output formats
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

### Input formats

All input values which represent a supportet output format are detected automatically. Additionally common rules try to evaluate values to true or false. Examples:

* "foobar" -> true
* "" -> false
* 42 -> true

### Handle null value

If a value cant't be treaten as true or false, (e.g. _null_), it will be handled as defined by _Handle null values_:

* keep as null
* treat as true
* treat as false
* stop flow

## Examples

![Example: Several inputs and output conversion](assets/example-conversion.png "Example: Several inputs and output conversion")

See [JSON](examples/conversion.json) for import.

## Known Issues

* context documentation
* readme.md incomplete

## Contribute

There are several ways to contribute to this project. You can [report](https://github.com/SimonButtazzi/node-red-contrib-boolean-parser/issues) bugs or [ask](https://github.com/SimonButtazzi/node-red-contrib-boolean-parser/issues) for new features directly on GitHub.
You can also submit your own new features of bug fixes via a [pull request](https://github.com/SimonButtazzi/node-red-contrib-boolean-parser/issueshttps://github.com/SimonButtazzi/node-red-contrib-boolean-parser/pr).

And of course you can always buy me a beer, coffee, ... via the donation button:

[![donate](https://img.shields.io/badge/donate-PayPal-blue.svg "donate via Paypal")](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=simon%2ebuttazzi%40gmail%2ecom&lc=US&no_note=0&currency_code=EUR&bn=PP%2dDonationsBF%3abtn_donate_LG%2egif%3aNonHostedGuest)

## License

tbd