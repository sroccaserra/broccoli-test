var staticCompiler = require('broccoli-static-compiler');
var fileRemover = require('broccoli-file-remover');
var sixToFiveTranspiler = require('broccoli-6to5-transpiler');
var mergeTrees = require('broccoli-merge-trees');

var app = fileRemover('app', {path: '/vendor'});
var transpiled = sixToFiveTranspiler(app, {modules: 'amd'});

var libs = staticCompiler('app', {srcDir: '/vendor', destDir: '/vendor'})

module.exports = mergeTrees([transpiled, libs]);
