var staticCompiler = require('broccoli-static-compiler');
var fileRemover = require('broccoli-file-remover');
var sixToFive = require('broccoli-6to5-transpiler');
var mergeTrees = require('broccoli-merge-trees');

var app = fileRemover('app', {path: '/vendor'});

var libs = staticCompiler('app', {srcDir: '/vendor', destDir: '/vendor'})

var transpiled = sixToFive(app, {modules: 'amd'});

module.exports = mergeTrees([transpiled, libs]);
