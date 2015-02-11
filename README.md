Quick test to use ES6 code in browsers today, with [Broccoli][b] + [6to5][s] +
[RequireJS][r].

The ES6 code using ES6 modules in `app/javascript` is transpiled to ES5, and
ES6 modules are converted to AMD modules by 6to5. After that, add RequireJS and
the resulting code can run in any decent browser.

See `Brocfile.js` for details about the setup.

## Small explanation

### What it does

The actual code does very little, it's just here to show that the glue is working.

In `javascript/index.js`, I use the [ES6 module syntax][m] to import a function
from `javascript/tools.js`, and use it to update a span in the document:

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

Then, Broccoli + 6to5 + RequireJS makes this code run in the browser.

### How it does it

It's all in `Brocfile.js`.

Tell Broccoli to create a tree from the `app` dir:

```javascript
var app = staticCompiler('app', {
    srcDir: '/',
    files: ['**/*.js', '**/*.html'],
    destDir: '/'
});
```

Then pass the resulting tree to 6to5:

```javascript
var transpiled = sixToFiveTranspiler(app, {modules: 'amd'});
```

Also, create a tree from Bower components (RequireJS in this example):

```javascript
var lib = staticCompiler('bower_components', {
    srcDir: '/',
    destDir: '/lib'
});
```

Then merge the two trees, and return it to Broccoli.

```javascript
module.exports = mergeTrees([transpiled, lib]);
```

That's it, Broccoli takes care of the file system for you.

Note that Broccoli will watch your files, and update the served content at
light speed (see the Broccoli [introductory blog post][i] for details).

## Install & run

### Install Deps

If you haven't already:

    $ npm install -g broccoli-cli
    $ npm install -g bower

Then:

    $ npm install
    $ bower install

### Run

    $ broccoli serve


[b]: https://github.com/broccolijs/broccoli
[i]: http://www.solitr.com/blog/2014/02/broccoli-first-release/
[m]: http://www.2ality.com/2014/09/es6-modules-final.html
[r]: http://requirejs.org/
[s]: http://6to5.org
