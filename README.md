Quick test to use ES6 code in browsers today, with [Broccoli][b] + [Babel][s] +
[Browserify][r].

The ES6 code using ES6 modules in `app/javascript` is transpiled to ES5, and
ES6 modules are converted to CommonJS modules by Babel. Pass the result to
Browserify and the resulting code can run in any decent browser.

See `Brocfile.js` for details about the setup.

## Small explanation

### What it does

The actual code does very little, it's just here to show that the glue is working.

In `javascript/index.js`, I use the [ES6 module syntax][m] to import
`javascript/tools.js`, and use it to update a span in the document:

```javascript
import * as tools from 'tools';

document.getElementById('es6Status').innerHTML = tools.getStatus();
```

Note: at last, a JavaScript module standard for the browser!

And in `javascript/tools.js`, I define the `getStatus()` function imported
above using the ES6 arrow notation, and export it:

```javascript
export var getStatus = () => "working!";
```

Then, Broccoli + Babel + Browserify makes this code run in the browser.

### How it does it

It's all in `Brocfile.js`.

Tell Broccoli to create a tree from the ES6 JavaScript sources:

```javascript
var jsSrc = staticCompiler('app', {
    srcDir: '/javascript',
    files: ['**/*.js'],
    destDir: '/javascript'
});
```

Then pass the resulting tree to Babel:

```javascript
var transpiled = babelTranspiler(jsSrc);
```

Now `transpiled` is a tree containing ES5 code using CommonJS modules. We just
need to pass it through Browserify:

```javascript
var browserified = browserify(transpiled, {entries: ['./javascript/index.js']});
```

This will generate a `browserify.js` bundle file containing ES5 code working in
most browsers.

Also, create a tree from HTML sources:

```javascript
var htmlSrc = staticCompiler('app', {
    srcDir: '/',
    files: ['**/*.html'],
    destDir: '/'
});
```

Then merge the browserified and HTML trees, and export the result to Broccoli.

```javascript
module.exports = mergeTrees([browserified, htmlSrc]);
```

That's it, Broccoli takes care of the file system for you.

Note that Broccoli will watch your files, and update the served content at
light speed (see the Broccoli [introductory blog post][i] for details).

## Install & run

### Install Deps

If you haven't already:

    $ npm install -g broccoli-cli

Then:

    $ npm install

### Run

    $ broccoli serve


[b]: https://github.com/broccolijs/broccoli
[i]: http://www.solitr.com/blog/2014/02/broccoli-first-release/
[m]: http://www.2ality.com/2014/09/es6-modules-final.html
[r]: http://browserify.org/
[s]: http://babeljs.io
