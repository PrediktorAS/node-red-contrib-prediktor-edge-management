const { loadPackageDefinition } = require('@grpc/grpc-js');
let utils = require('../utils/grpc');

module.exports = function(RED) {
    function UploadContentNode(config) {
        RED.nodes.createNode(this, config);
        this.edgeManagementUri = config.edgeManagementUri;
        this.hiveName = config.hiveName;
        this.configRepoUri = config.configRepoUri;
        this.storeId = config.storeId;
        this.description = config.description;
        this.version = config.version;
        let node = this;

        this.on('input', function (msg, send, done) {
            let edgeManagementUri = msg.edgeManagementUri || node.edgeManagementUri;
            let hiveName = msg.hiveName || node.hiveName;
            let configRepoUri  = msg.configRepoUri || node.configRepoUri;
            let storeId = msg.storeId || node.storeId;
            let description = msg.description || node.description;
            let version  = msg.version || node.version;
            uploadContent(msg);
        });

        function uploadContent(msg, send, done) {

        }
    }

    RED.nodes.registerType("upload-content", UploadContentNode);
}
