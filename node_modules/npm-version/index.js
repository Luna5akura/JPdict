module.exports = npmVersion;

function npmVersion(cb) {
  var cp = require('child_process');
  cp.exec('npm -v', readVersion)

  function readVersion(err, stdout, stderr) {
    if (err) {
      cb(err)
    }

    var semver = require('semver');

    cb(null, semver(stdout).version);
  }
}