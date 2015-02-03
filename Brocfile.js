var staticCompiler = require('broccoli-static-compiler');
var sixToFiveTranspiler = require('broccoli-6to5-transpiler');
var mergeTrees = require('broccoli-merge-trees');

var app = staticCompiler('app', {
    srcDir: '/',
    files: ['**/*.js', '**/*.html'],
    destDir: '/'
});

var transpiled = sixToFiveTranspiler(app, {modules: 'amd'});

var lib = staticCompiler('bower_components', {
    srcDir: '/',
    destDir: '/lib'
});

module.exports = mergeTrees([transpiled, lib]);
