Quick test to use [Broccoli][b] and [6to5][s] with RequireJS.

The ES6 code using ES6 modules in `app/javascript` is transpiled to ES5, and ES6 modules are converted to AMD modules by 6to5. After that, add RequireJS and the resulting code can run in any decent browser.

See `Brocfile.js` for details about the setup.

### Install Deps

    $ npm install
    $ bower install

### Run

    $ broccoli serve

Note that Broccoli will watch your files, and update the served content at light speed (see the Broccoli [introductory blog post][i] for details).


[b]: https://github.com/broccolijs/broccoli
[i]: http://www.solitr.com/blog/2014/02/broccoli-first-release/
[s]: http://6to5.org
