var staticCompiler = require('broccoli-static-compiler');
var babelTranspiler = require('broccoli-babel-transpiler');
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

var transpiled = babelTranspiler(jsSrc);
var browserified = browserify(transpiled, {entries: ['./javascript/index.js']});

module.exports = mergeTrees([browserified, htmlSrc]);
