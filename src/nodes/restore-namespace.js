let utils = require('../utils/grpc');
module.exports = function(RED) {
  function RestoreNamespaceNode(config) {
    RED.nodes.createNode(this, config);
    var node = this;
    this.server = RED.nodes.getNode(config.server);
    this.configRepoUri = config.configRepoUri;
    this.namespaceUri = config.namespaceUri;
    this.revisionId = config.revisionId;
    this.checkMethods = config.checkMethods;
    this.overrideErrors = config.overrideErrors;
    this.isNodeSetChanges = config.isNodeSetChanges;
    this.hiveName = config.hiveName;

    node.on('input', function(msg) {
      let restoreNamespaceRequest = {
        configRepoUri: msg.configRepoUri || node.configRepoUri,
        namespaceUri: msg.namespaceUri || node.namespaceUri,
        revisionId: msg.revisionId || config.revisionId,
        checkMethods: msg.checkMethods || config.checkMethods,
        overrideErrors: msg.overrideErrors || config.overrideErrors,
        isNodeSetChanges: msg.isNodeSetChanges || config.isNodeSetChanges,
        hiveName: msg.hiveName || config.hiveName
      };

      const url = node.server.host + ":" + node.server.port;
      const client = utils.getClient(url);

      console.log(restoreNamespaceRequest);

      client.restoreNamespace(restoreNamespaceRequest, function(err, data) {
        msg.payload = data;
        msg.error = err;
        node.send(msg);
      });
    });
  }
  RED.nodes.registerType("restore-namespace", RestoreNamespaceNode);
}
