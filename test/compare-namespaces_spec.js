var helper = require("node-red-node-test-helper");
var compareNamespaces = require("../src/nodes/compare-namespaces.js");

describe('compare-namespaces Node', function () {

  afterEach(function () {
    helper.unload();
  });

  it('should be loaded', function (done) {
    var flow = [{ id: "n1", type: "compare-namespaces", name: "test name" }];
    helper.load(compareNamespaces, flow, function () {
      var n1 = helper.getNode("n1");
      n1.should.have.property('name', 'test name');
      done();
    });
  });
});
