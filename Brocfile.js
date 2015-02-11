var staticCompiler = require('broccoli-static-compiler');
var sixToFiveTranspiler = require('broccoli-6to5-transpiler');
var browserify = require('broccoli-browserify');
var mergeTrees = require('broccoli-merge-trees');

var jsSrc = staticCompiler('app', {
    srcDir: '/javascript',
    files: ['**/*.js'],
    destDir: '/javascript'
});
var htmlSrc = staticCompiler('app', {
    srcDir: '/',
    files: ['**/*.html'],
    destDir: '/'
});

var transpiled = sixToFiveTranspiler(jsSrc);
var browserified = browserify(transpiled, {entries: ['./javascript/index.js']});

module.exports = mergeTrees([browserified, htmlSrc]);
