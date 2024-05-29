npm-version
===========

Get the npm version of the running system.

[![Build Status](http://img.shields.io/travis/vvo/npm-version/master.svg?style=flat-square)](https://travis-ci.org/vvo/npm-version)
[![Dependency Status](http://img.shields.io/david/vvo/npm-version.svg?style=flat-square)](https://david-dm.org/vvo/npm-version)
[![devDependency Status](http://img.shields.io/david/dev/vvo/npm-version.svg?style=flat-square)](https://david-dm.org/vvo/selenium-standalone#info=devDependencies)

```js
var npmVersion = require('npm-version');

npmVersion(function out(err, version) {
  console.log(version);
 // outputs your current npm version
});
```
