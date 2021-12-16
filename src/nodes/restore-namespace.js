let utils = require('../utils/grpc');

module.exports = function(RED) {
  function RestoreNamespaceNode(config) {
    RED.nodes.createNode(this, config);
    var node = this;
    this.server = RED.nodes.getNode(config.server);
    this.configRepoUri = config.configRepoUri;
    this.revisionId = config.revisionId;
    this.checkMethods = config.checkMethods;
    this.overrideErrors = config.overrideErrors;
    this.isNodeSetChanges = config.isNodeSetChanges;
    this.hiveName = config.hiveName;
    this.assignIds = config.assignIds;

    node.on('input', function(msg) {
      
      let restoreNamespaceRequest = {
        configRepoUri: msg.configRepoUri || node.configRepoUri,
        namespaceUri: '',
        revisionId: msg.revisionId || config.revisionId,
        checkMethods: msg.checkMethods || config.checkMethods,
        overrideErrors: msg.overrideErrors || config.overrideErrors,
        isNodeSetChanges: msg.isNodeSetChanges || config.isNodeSetChanges,
        hiveName: msg.hiveName || config.hiveName,
        hiveProperties: []
      };

      let assignIds = msg.assignIds || config.assignIds; 

      if(assignIds) {
        restoreNamespaceRequest.hiveProperties.push({ id: '1080', value: {boolValue: true}});
      }

      let namingOption = parseInt(msg.nameoptions || config.nameoptions);

      if(namingOption > 0 && namingOption < 6) {
        restoreNamespaceRequest.hiveProperties.push({ id: '1050', value: {enumValue: namingOption }});
      }

      let nameTerm = parseInt(msg.nametermination || config.nametermination);

      if(nameTerm > 0 && nameTerm < 4) {
        restoreNamespaceRequest.hiveProperties.push({ id: '1095', value: {enumValue: nameTerm }});
      }

      const url = node.server.host + ":" + node.server.port;
      const client = utils.getClient(url);

      client.restoreNamespace(restoreNamespaceRequest, {}, function(err, data) {

        msg.payload = data;
        msg.error = (err == null && !data?.result?.success) ? data.result.error : err;
        node.send(msg);
      });


    });
  }
  RED.nodes.registerType("restore-namespace", RestoreNamespaceNode);
}
