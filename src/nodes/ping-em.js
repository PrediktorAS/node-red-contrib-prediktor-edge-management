let utils = require('../utils/grpc');
module.exports = function(RED) {
  function PingService(config) {
    RED.nodes.createNode(this, config);
    var node = this;
    this.server = RED.nodes.getNode(config.server);
    const url = this.server.host + ":" + this.server.port;
    const client = utils.getClient(url);

    node.on('input', function(msg) {
      client.ping({}, function(err, data) {
        msg.payload = data;
        msg.error = err ? err : '';
        msg.success = err ? false : true;

        node.send(msg);
      });
    });
  }
  RED.nodes.registerType("ping-em", PingService);
}
