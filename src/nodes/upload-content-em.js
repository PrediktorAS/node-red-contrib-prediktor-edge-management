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

        


        
       
        this.on('input', function (msg, send) {

            let edgeManagementUri = msg.edgeManagementUri || node.edgeManagementUri;
            let hiveName = msg.hiveName || node.hiveName;
            let configRepoUri  = msg.configRepoUri || node.configRepoUri;
            let storeId = msg.storeId || node.storeId;
            let description = msg.description || node.description;
            let version  = msg.version || node.version;
          

            let apisConfig = {
                honeystore: false,
                configOnly: false,
                hiveIntanceName: hiveName
            }

            let uploadHiveConfigRequest = {
                configRepoUri: configRepoUri,
                configName: hiveName,
                storeId: storeId,
                description: description,
                version: version,
                apisConfig: apisConfig
            }

     
            const url = edgeManagementUri;
            const client = utils.getClient(url);


            client.uploadHiveConfig(uploadHiveConfigRequest, function(err, data) {
                msg.payload = data;
                msg.success = true;
                msg.error = '';

        
                if(err) {
                  msg.error = err;
                  msg.success = false;
                }
                else if(!data?.success) {
                    msg.error = data.error;
                    msg.success = false;
                }
                node.send(msg);
            })
        });
    }
    RED.nodes.registerType("upload-content-em", UploadContentNode);
}
