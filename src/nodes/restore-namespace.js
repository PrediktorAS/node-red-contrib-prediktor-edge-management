let utils = require('../utils/grpc');

module.exports = function(RED) {
  function RestoreNamespaceNode(config) {
    RED.nodes.createNode(this, config);
    var node = this;
    this.serverUri = config.serverUri;
    this.revisionId = config.revisionId;
    this.checkMethods = config.checkMethods;
    this.overrideErrors = config.overrideErrors;
    this.useNodeSetChangesToReplace = config.useNodeSetChangesToReplace;
    this.hiveName = config.hiveName;
    this.assignIds = config.assignIds;

    node.on('input', function(msg) {
      
      let restoreNamespaceRequest = {
        configRepoUri: msg.configRepoUri || config.configRepoUri,
        namespaceUri: '',
        revisionId: msg.revisionId || config.revisionId,
        checkMethods: msg.checkMethods || config.checkMethods,
        overrideErrors: msg.overrideErrors || config.overrideErrors,
        useNodeSetChangesToReplace: msg.useNodeSetChangesToReplace || config.useNodeSetChangesToReplace,
        hiveName: msg.hiveName || config.hiveName,
        hiveProperties: []
      };

      let exchRate = parseInt(msg.exchangeRate || config.exchangeRate); 

      if(exchRate > 0) {
        restoreNamespaceRequest.hiveProperties.push({ id: '100', value: {intValue: exchRate}});
      }

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

      const url = msg.serverUri || node.serverUri;
      const client = utils.getClient(url);

      client.restoreNamespace(restoreNamespaceRequest, {}, function(err, data) {

        msg.payload = data;
        msg.success = true;
        msg.error = '';

        if(err) {
          msg.error = err;
          msg.success = false;
        }
        else if(!data?.result?.success) {
            msg.error = data.result.error;
            msg.success = false;
        }

        node.send(msg);
      });


    });
  }
  RED.nodes.registerType("restore-namespace", RestoreNamespaceNode);
}
