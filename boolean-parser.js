 module.exports = function(RED) {

    "use strict";

 //   function kwh(value, energydecimals) {
 //       return parseFloat(Number(value / 360 / 10000).toFixed(energydecimals));
 //   }



    function boolean_parser(config) {

        RED.nodes.createNode(this, config);

        var node = this;

        this.name = config.name || "";
        this.inputField = config.inputField || "payload";
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
            msg.payload = Boolean(msg.payload);
            msg.test = "test123";


                node.send(msg);
        });
    }

    RED.nodes.registerType("boolean-parser", boolean_parser);

};
