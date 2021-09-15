var helper = require("node-red-node-test-helper");
var restoreNamespace = require("../src/nodes/restore-namespace.js");

describe('restore-namespace Node', function() {

  afterEach(function() {
    helper.unload();
  });

  it('should be loaded', function(done) {
    var flow = [{
      id: "n1",
      type: "restore-namespace",
      name: "The One Name",
      configRepoUri: "The Magnificent Repo URI",
      namespaceUri: "The Only Namespace",
      revisionId: "The Best Revision",
      checkMethods: "The Real Check Methods",
      overrideErrors: true,
      isNodeSetChanges: true,
      hiveName: "The Proper Hive Name"
    }];

    helper.load(restoreNamespace, flow, function() {
      var n1 = helper.getNode("n1");
      n1.should.have.property('name', 'The One Name');
      n1.should.have.property('configRepoUri', "The Magnificent Repo URI");
      n1.should.have.property('namespaceUri', 'The Only Namespace');
      n1.should.have.property('revisionId', 'The Best Revision');
      n1.should.have.property('checkMethods', 'The Real Check Methods');
      n1.should.have.property('overrideErrors', true);
      n1.should.have.property('isNodeSetChanges', true);
      n1.should.have.property('hiveName', 'The Proper Hive Name');
      done();
    });
  });
});
