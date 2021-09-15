let utils = require('../utils/grpc');
module.exports = function(RED) {
  function CompareNamespacesNode(config) {
    RED.nodes.createNode(this, config);
    var node = this;
    this.server = RED.nodes.getNode(config.server);

    node.on('input', function(msg) {
      const namespaceUri = msg.namespaceUri || config.namespaceUri;
      const hiveName = msg.hiveName || config.hiveName;
      const configRepoUri = msg.configRepoUri || config.configRepoUri;
      const revisionId = msg.revisionId || config.revisionId;
      const excludeValueSourceAttributes = msg.excludeValueSourceAttributes || config.excludeValueSourceAttributes;
      const revisionType = msg.revisionType || config.revisionType;
      const fileUri = msg.fileUri || config.fileUri;
      const compareDataType = msg.compareDataType || config.compareDataType;

      let namespaceCompareRequest = {
        namespaceUri: namespaceUri,
        hiveName: hiveName
      };

      if (compareDataType == "configRepoNamespaceCompare") {
        namespaceCompareRequest.configRepoNamespaceCompare = {
          configRepoUri: configRepoUri,
          revisionId: revisionId,
          excludeValueSourceAttributes: excludeValueSourceAttributes,
          revisionType: revisionType // namespaceNodeset = 1 or namespaceDatabase = 3
        }
      } else if (compareDataType == "fileNamespaceCompare") {
        namespaceCompareRequest.fileNamespaceCompare = {
          fileUri: fileUri
        }
      }

      const url = node.server.host + ":" + node.server.port;
      const client = utils.getClient(url);

      console.log(namespaceCompareRequest);

      var chunks = [];
      var call = client.compareNamespaces(namespaceCompareRequest);
      call.on('data', function(chunk) {
        console.log(chunk);
        /*if (config.contentType == "Binary") {
          chunks.push(chunk.bytes);
        }
        else{
          chunks.push(chunk.arr);
        }*/
      });
      call.on('end', function() {
        console.log("End");
        msg.payload = chunks.join();
        node.send(msg);
      });
      call.on('error', function(error) {
        console.log("Error");
        msg.error = error;
        node.send(msg);
      });

    });
  }
  RED.nodes.registerType("compare-namespaces", CompareNamespacesNode);
}
