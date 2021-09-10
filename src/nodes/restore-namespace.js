let utils = require('../utils/grpc');
module.exports = function(RED) {
  function RestoreNamespaceNode(config) {
    RED.nodes.createNode(this, config);
    var node = this;
    this.server = RED.nodes.getNode(config.server);

    node.on('input', function(msg) {
      const configRepoUri = msg.configRepoUri || config.configRepoUri;
      const namespaceUri = msg.namespaceUri || config.namespaceUri;
      const revisionId = msg.revisionId || config.revisionId;
      const checkMethods = msg.checkMethods || config.checkMethods;
      const overrideErrors = msg.overrideErrors || config.overrideErrors;
      const isNodeSetChanges = msg.isNodeSetChanges || config.isNodeSetChanges;
      const hiveName = msg.hiveName || config.hiveName;

      let restoreNamespaceRequest = {
        configRepoUri: configRepoUri,
        namespaceUri: namespaceUri,
        revisionId: revisionId,
        checkMethods: checkMethods,
        overrideErrors: overrideErrors,
        isNodeSetChanges: isNodeSetChanges,
        hiveName: hiveName
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
