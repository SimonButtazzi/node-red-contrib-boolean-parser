 module.exports = function(RED) {

    "use strict";

    function formatOutput(value, format) {
        switch (format) {
            case "bool":
                return Boolean(value);
            case "boolstr":
                return value ? "true" : "false";
            case "int":
                return value ? 1 : 0;
            case "intstr":
                return value ? "1" : "0";
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
        this.emitidle = Boolean(config.emitidle || false);

        /*
        start, stop
        started, stopped
        1,0
        "1" "0"
        true false
        enable, disable
        enabled, disabled
        activated, deactivated
        active, inactive
        running, stopped

         */


        this.on("input", function(msg) {
            //let value = node[node.inputField];
            msg.payload = formatOutput(msg.payload, node.outputFormat);
            msg.test = msg[node.inputField];

                node.send(msg);
        });
    }

    RED.nodes.registerType("boolean-parser", boolean_parser);

};
