ping = require("nodes/ping");
restoreNamespace = require("nodes/restore-namespace");
restoreVariableMappings = require("./nodes/restore-variable-mappings");
prediktorEdgeManagementNode = require("./nodes/prediktor-edge-management");
uploadHiveConfig = require("./nodes/upload-hive-config");

module.exports = function(RED){
    RED.nodes.registerType('ping', ping.PingService);
    RED.nodes.registerType('restore-namespace', restoreNamespace.RestoreNamespace);
    RED.nodes.registerType('restore-variable-mappings', restoreVariableMappings.restoreVariableMappings);
    RED.nodes.registerType('prediktor-edge-management', prediktorEdgeManagementNode.PrediktorEdgeManagementNode);
    RED.nodes.registerType('upload-hive-config', uploadHiveConfig.UploadHiveConfigNode);
}
