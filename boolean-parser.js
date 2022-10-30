 module.exports = function(RED) {

    "use strict";

    function formatOutput(value, format) {
        switch (format) {
            case "bool": return Boolean(value);
            case "boolstr": return value ? "true" : "false";
            case "int": return value ? 1 : 0;
            case "intstr": return value ? "1" : "0";
            case "startstop": return value ? "start" : "stop";
            case "startedtstopped": return value ? "started" : "stopped";
            case "": return value ? "" : "";
            case "enabledisable": return value ? "enable" : "disable";
            case "enableddisabled": return value ? "enabled" : "disabled";
            case "activateddeactivated": return value ? "activated" : "deactivated";
            case "activeinactive": return value ? "active" : "inactive";
            case "runningstopped": return value ? "running" : "stopped";
            case "runstop": return value ? "run" : "stop";
            case "onoff": return value ? "on" : "off";
            case "OnOff": return value ? "On" : "Off";
            case "ONOFF": return value ? "ON" : "OFF";
        }
        return Boolean(value);
    }

    function boolean_parser(config) {

        RED.nodes.createNode(this, config);

        var node = this;

        this.name = config.name || "";
        this.inputField = config.inputField || "payload";
        this.outputField = config.outputField || "payload";
        this.outputFormat = config.outputFormat || "bool";


        this.on("input", function(msg) {
            msg[node.outputField] = formatOutput(msg[node.inputField], node.outputFormat);
            node.send(msg);
        });
    }

    RED.nodes.registerType("boolean-parser", boolean_parser);

};
