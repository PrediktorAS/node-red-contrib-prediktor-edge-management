module.exports = function(RED) {
    function PrediktorEdgeManagementNode(n) {
        RED.nodes.createNode(this,n);
        this.host = n.host;
        this.port = n.port;
    }
    RED.nodes.registerType("prediktor-edge-management",PrediktorEdgeManagementNode);
}
