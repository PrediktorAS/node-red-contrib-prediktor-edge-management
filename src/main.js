ping = require("nodes/ping");
restoreNamespace = require("nodes/restore-namespace");
restoreVariableMappings = require("./nodes/restore-variable-mappings");
prediktorEdgeManagementNode = require("./nodes/prediktor-edge-management");

module.exports = function(RED){
    RED.nodes.registerType('ping-namespace', ping.PingNamespaceNode);
    RED.nodes.registerType('restore-namespace', restoreNamespace.RestoreNamespace);
    RED.nodes.registerType('restore-variable-mappings', restoreVariableMappings.restoreVariableMappings);
    RED.nodes.registerType('prediktor-edge-management', prediktorEdgeManagementNode.PrediktorEdgeManagementNode);
}
