let utils = require('../utils/grpc');
module.exports = function(RED) {
  function RestoreVariableMappingsNode(config) {
    RED.nodes.createNode(this, config);
    var node = this;
    this.server = RED.nodes.getNode(config.server);
    this.configRepoUri = config.configRepoUri;
    this.revisionId = config.revisionId;
    this.transferEu = config.transferEu;
    this.hiveName = config.hiveName;
    this.moduleName = config.moduleName;

    node.on('input', function(msg) {
      let restoreVariableMappingsRequest = {
        configRepoUri: msg.configRepoUri || node.configRepoUri,
        revisionId: msg.revisionId || config.revisionId,
        transferEu: msg.transferEu || config.transferEu,
        hiveName: msg.hiveName || config.hiveName,
        moduleName: msg.moduleName || config.moduleName
      };

      const url = node.server.host + ":" + node.server.port;
      const client = utils.getClient(url);

      client.restoreVariableMappings(restoreVariableMappingsRequest, function(err, data) {

        msg.payload = data;
        if(err == null && !data?.success) {
          msg.error = data.error;
        }
        else {
          msg.error = err;
        }
        node.send(msg);
      });
    });
  }
  RED.nodes.registerType("restore-variable-mappings", RestoreVariableMappingsNode);
}
