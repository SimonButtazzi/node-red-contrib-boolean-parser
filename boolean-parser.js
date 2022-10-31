 module.exports = function(RED) {

    "use strict";

     function formatOutput(value, format, formats)  {
         if (typeof(formats[format]) != "undefined") {
             return value ? formats[format].true : formats[format].false;
         }
         return Boolean(value);
     }

     function parseIntput(value, formats, strict) {
         if (value === null) return null;
         for (var format in formats) {
             if (value === formats[format].true) return true;
             if (value === formats[format].false) return false;
         }
         if (!strict) {
             if (typeof value === "number") return Boolean(value);
             if (typeof value === 'string' || value instanceof String) {
                 var valuemod = value.toLowerCase().trim();
                 for (var format in formats) {
                     if (valuemod === formats[format].true) return true;
                     if (valuemod === formats[format].false) return false;
                 }
             }
             return Boolean(value);
         }
         return null;
     }

    function bool(config) {

        RED.nodes.createNode(this, config);

        var node = this;

        this.name = config.name || "";
        this.inputField = config.inputField || "payload";
        this.outputField = config.outputField || "payload";
        this.outputFormat = config.outputFormat || "bool";
        this.handleNull = config.handleNull || "null";
        this.handleNullOpts = {
            "null": null,
            "true": true,
            "false": false,
            "stopflow": null
        };
        this.formats = {
            "boolstr": {"true": "true", "false": "false"},
            "True-False": {"true": "True", "false": "False"},
            "TRUE-FALSE": {"true": "TRUE", "false": "FALSE"},
            "int": {"true": 1, "false": 0},
            "intstr": {"true": "1", "false": "0"},
            "start-stop": {"true": "start", "false": "stop"},
            "started-stopped": {"true": "started", "false": "stopped"},
            "enable-disable": {"true": "enable", "false": "disable"},
            "enabled-disabled": {"true": "enabled", "false": "disabled"},
            "activated-deactivated": {"true": "activated", "false": "deactivated"},
            "active-inactive": {"true": "active", "false": "inactive"},
            "running-stopped": {"true": "running", "false": "stopped"},
            "run-stop": {"true": "run", "false": "stop"},
            "on-off": {"true": "on", "false": "off"},
            "On-Off": {"true": "On", "false": "Off"},
            "ON-OFF": {"true": "ON", "false": "OFF"}
        };


        this.on("input", function(msg) {
            let value = null;
            if (typeof(msg[node.inputField]) != "undefined") {
                value = msg[node.inputField];
                value = parseIntput(value, node.formats, false);
            }
            if (!(value === null && node.handleNull == "stopflow")) {
                value = (value === null) ? node.handleNullOpts[node.handleNull] : value;
                msg[node.outputField] = formatOutput(value, node.outputFormat, node.formats);
                node.send(msg);
            }
        });
    }

    RED.nodes.registerType("bool", bool);

};
