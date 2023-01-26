 module.exports = function(RED) {

    "use strict";

     function formatOutput(value, format, formats, node)  {
         if (typeof(formats[format]) != "undefined") {
             if (value === true) {
                 return formats[format].true;
             } else if (value === false) {
                 return formats[format].false;
             } else {
                 return null;
             }
         }
        return (value === null) ? null : Boolean(value);
     }

     function parseIntput(value, formats, strict) {
         if (typeof value === "undefined"
             || value === null
             || value === "null"
             || value === "undefined"
             || value === "unknown"
             || value === "invalid"
             || value === {}
             || value === []) {
             return null;
         }
         for (var format in formats) {
             if (value === formats[format].true) return true;
             if (value === formats[format].false) return false;
         }
         if (!strict) {
             if (typeof value === "number") return Boolean(value);
             if (typeof value === 'string' || value instanceof String) {
                 var valuemod = value.toLowerCase().trim();
                 for (format in formats) {
                     if (valuemod === formats[format].true) return true;
                     if (valuemod === formats[format].false) return false;
                 }
                 return Boolean(valuemod);
             }
             else
             {
                 return Boolean(value);
             }
         }
         return null;
     }

     // see https://dirask.com/posts/JavaScript-get-object-property-by-path-pBvmmp
     function getObjectPropertyByPath(object, path) {
         if (object == null) { // null or undefined
             return object;
         }
         const parts = path.split('.');
         return parts.reduce((object, key) => object?.[key], object);
     }

     // see https://dirask.com/posts/JavaScript-set-object-property-by-path-DNKXOp
     function setObjectPropertyByPath(object, path, value) {
         const parts = path.split('.');
         const limit = parts.length - 1;
         for (let i = 0; i < limit; ++i) {
             const key = parts[i];
             object = object[key] ?? (object[key] = { });
         }
         const key = parts[limit];
         object[key] = value;
     }

     function handleInvert(value, invert) {
         if(typeof value == "boolean" && invert === true) {
             value = !value;
         }
         return value;
     }

    function bool(config) {

        RED.nodes.createNode(this, config);

        var node = this;

        this.name = config.name || "";
        this.outputs = config.outputs || 1;
        this.inputField = config.inputField || "payload";
        this.outputField = config.outputField || "payload";
        this.outputFormat = config.outputFormat || "bool";
        this.handleNull = config.handleNull || "null";
        this.invert = Boolean(config.invert  || false);

        this.handleNullOpts = {
            "null": null,
            "true": true,
            "false": false,
            "stopflow": null
        };
        this.formats = {
            "bool": {"true": true, "false": false},
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
        this.statuses = {
            true: {"fill": "green", "shape":"dot"},
            false: {"fill": "red", "shape":"ring"},
            null: {"fill": "grey", "shape":"dot"}
        };

        this.on("input", function(msg, send, done) {
            let valueRaw = getObjectPropertyByPath(msg, node.inputField);
            let valueIn = parseIntput(
                valueRaw,
                node.formats,
                false);
            let valueUnformatted = null;
            let valueOut = null;
            if (!(valueIn === null && node.handleNull === "stopflow")) {
                valueUnformatted = (valueIn === null) ? node.handleNullOpts[node.handleNull] : handleInvert(valueIn, node.invert);
                valueOut = formatOutput(valueUnformatted, node.outputFormat, node.formats, node);
                setObjectPropertyByPath(msg, node.outputField, valueOut);
                if (node.outputs == 1) {
                    node.send(msg);
                } else {
                    switch (valueUnformatted) {
                        case true:
                            node.send([[msg], [], []]);
                            break;
                        case false:
                            node.send([[], [msg], []]);
                            break;
                        default:
                            node.send([[], [], [msg]]);
                            break;
                    }
                }
            }
            node.status({
                fill: node.statuses[valueUnformatted].fill,
                shape: node.statuses[valueUnformatted].shape,
                text: '' + valueRaw +  ' ' + ((valueIn === null && node.handleNull === "stopflow") ? '#' : (node.invert ? '!' : '') + '> ' + valueOut)
            });
            if (done) {
                done();
            }
        });
    }

    RED.nodes.registerType("bool", bool);
};
