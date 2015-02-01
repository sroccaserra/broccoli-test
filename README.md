Quick test to use [Broccoli][b] and [6to5][s] with RequireJS.

The ES6 code using ES6 modules in `app/javascript` is transpiled to ES5, and ES6 modules are converted to AMD modules by 6to5. After that, add RequireJS and the resulting code can run in any decent browser.

See `Brocfile.js` for details about the setup.

### What it does

The actual code does very little, it's just here to show that the glue is working.

In `javascript/index.js`, I use the ES6 module syntax (at last, a JavaScript module standard for the browser!) :

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

### Install Deps

    $ npm install
    $ bower install

### Run

    $ broccoli serve

Note that Broccoli will watch your files, and update the served content at light speed (see the Broccoli [introductory blog post][i] for details).


[b]: https://github.com/broccolijs/broccoli
[i]: http://www.solitr.com/blog/2014/02/broccoli-first-release/
[s]: http://6to5.org
