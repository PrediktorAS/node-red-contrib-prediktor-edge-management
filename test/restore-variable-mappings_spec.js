var helper = require("node-red-node-test-helper");
var restoreVariableMappings = require("../src/nodes/restore-variable-mappings.js");

describe('restore-variable-mappings Node', function() {

  afterEach(function() {
    helper.unload();
  });

  it('should be loaded', function(done) {
    var flow = [{
      id: "n1",
      type: "restore-variable-mappings",
      name: "The One Name",
      configRepoUri: "The Magnificent Repo URI",
      revisionId: "The Best Revision",
      uploadEu: true,
      hiveName: "The Proper Hive Name",
      moduleName: "The Proper Module Name"
    }];

    helper.load(restoreVariableMappings, flow, function() {
      var n1 = helper.getNode("n1");
      n1.should.have.property('name', 'The One Name');
      n1.should.have.property('configRepoUri', "The Magnificent Repo URI");
      n1.should.have.property('revisionId', 'The Best Revision');
      n1.should.have.property('uploadEu', true);
      n1.should.have.property('hiveName', 'The Proper Hive Name');
      n1.should.have.property('moduleName', 'The Proper Module Name');
      done();
    });
  });
});
