var test = require('prova');

test('npm version', function(t) {
  var cp = require('child_process');
  var sinon = require('sinon');
  var npmVersion = require('./');

  sinon.stub(cp, 'exec', function(cmd, cb) {
    cb(null, '1.4.26\n\n');
  });

  npmVersion(function(err, version) {
    t.error(err);
    t.equal(version, '1.4.26');
    cp.exec.restore();
    t.end();
  });


})