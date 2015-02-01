Quick test to use [Broccoli][b] and [6to5][s] with RequireJS.

The ES6 code using ES6 modules in `app/javascript` is transpiled to ES5, and ES6 modules are converted to AMD modules by 6to5. After that, add RequireJS and the resulting code can run in any decent browser.

See `Brocfile.js` for details about the setup.

## Small explanation

### What it does

The actual code does very little, it's just here to show that the glue is working.

In `javascript/index.js`, I use the [ES6 module syntax][m] to import a function from `javascript/tools.js`, and use it (at last, a JavaScript module standard for the browser!) :

```javascript
import inc from './tools';

console.log(inc(3));
```

In `javascript/tools.js`, I define the `inc` function imported above using the ES6 arrow notation, and export it :

```javascript
    var inc = x => x + 1;

    export default inc;
```

Then, Broccoli + 6to5 + RequireJS makes this code run in the browser.

### How it does it

It's all in `Brocfile.js`.

Tell Broccoli to exclude the `app/vendor` path (that's where bower puts its stuff, I don't want to transpile them):

```javascript
var app = fileRemover('app', {path: '/vendor'});
```

Then pass the resulting tree to 6to5:

```javascript
var transpiled = sixToFiveTranspiler(app, {modules: 'amd'});
```
Also, create a tree for `app/vendor` (bower installed libs, RequireJS in this example):
```javascript
var libs = staticCompiler('app', {srcDir: '/vendor', destDir: '/vendor'})
```

Then merge the two trees, and return it to Broccoli.
```javascript
module.exports = mergeTrees([transpiled, libs]);
```

That's it, Broccoli takes care of the file system for you.

Note that Broccoli will watch your files, and update the served content at light speed (see the Broccoli [introductory blog post][i] for details).

## Install & run

### Install Deps

If you haven't already:

    $ npm install -g broccoli
    $ npm install -g bower

Then:

    $ npm install
    $ bower install

### Run

    $ broccoli serve


[b]: https://github.com/broccolijs/broccoli
[i]: http://www.solitr.com/blog/2014/02/broccoli-first-release/
[m]: http://www.2ality.com/2014/09/es6-modules-final.html
[s]: http://6to5.org
