const { loadPackageDefinition } = require('@grpc/grpc-js');
let utils = require('../utils/grpc');

module.exports = function(RED) {
    function UploadContentNode(config) {
        RED.nodes.createNode(this, config);
        //this.edgeManagementUri = config.edgeManagementUri;
        this.edgeManagementUri = RED.nodes.getNode(config.edgeManagementUri);
        this.hiveName = config.hiveName;
        this.configRepoUri = RED.nodes.getNode(config.configRepoUri);
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
          
            console.log("edgeManagementUri : " + edgeManagementUri);
            console.log("hiveName : " + hiveName);
            console.log("configRepoUri : " + configRepoUri);
            console.log("storeId : " + storeId);
            console.log("description : " + description);
            console.log("version : " + version);


            let apisConfig = {
                honeystore: false,
                configOnly: false,
                hiveIntanceName: hiveName
            }

            let uploadHiveConfigRequest = {
                configRepoUri: node.configRepoUri.host + ":" + node.configRepoUri.port,
                configName: hiveName,
                storeId: storeId,
                description: description,
                version: version,
                apisConfig: apisConfig
            }

            console.log("apisConfig : " + apisConfig);
            console.log("uploadHiveConfigRequest : " + uploadHiveConfigRequest);


            //const url = edgeManagementUri;
            const url = node.edgeManagementUri.host + ":" + node.edgeManagementUri.port;
            const client = utils.getClient(url);
            console.log("Shit dette funka");


            client.uploadHiveConfig(uploadHiveConfigRequest, function(err, data) {
                console.log("shit jeg kom inn her omggg");
                msg.payload = data;
                msg.success = true;
                msg.error = '';
        
                if(err) {
                    console.log("kom også inn her")
                  msg.error = err;
                  msg.success = false;
                  console.log("kom også inn her")
                }
                else if(!data?.success) {
                    console.log("kom også inn her")
                    msg.error = data.error;
                    msg.success = false;
                }
                console.log("kom også inn her")
                node.send(msg);
                console.log("kom også inn her")
            })
        });

       

       
    }

    RED.nodes.registerType("upload-content-em", UploadContentNode);
}
