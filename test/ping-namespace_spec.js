var helper = require("node-red-node-test-helper");
var pingNamespace = require("../src/nodes/ping-namespace.js");

describe('ping-namespace Node', function() {

  afterEach(function() {
    helper.unload();
  });

  it('should be loaded', function(done) {
    var flow = [{
      id: "n2",
      type: "ping-namespace",
      name: "The One Name",
    }];

    helper.load(pingNamespace, flow, function() {
      var n2 = helper.getNode("n2");
      n2.should.have.property('name', 'The One Name');
      done();
    });
  });
});
