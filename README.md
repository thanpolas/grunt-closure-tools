# grunt-closure-tools

Google Closure Tools for grunt:

* **[Compiler](https://developers.google.com/closure/compiler/)** Compile your JS code using the powerfull google closure compiler
* **[Builder](https://developers.google.com/closure/library/docs/closurebuilder)** Concatenate your JS codebase to a single file, optionally also compile it
* **[DepsWriter](https://developers.google.com/closure/library/docs/depswriter)** Calculate dependencies of your JS files and generate `deps.js`

## WORK IN PROGRESS...


## Getting Started
Install the module with: `npm install grunt-closure-tools`

```shell
npm install grunt-closure-tools
```

Then register the task by adding the following line to your `grunt.js` gruntfile:

```javascript
grunt.loadNpmTasks('grunt-closure-compiler');
```

## Documentation
All three tasks (compiler, builder and calcdeps) are [multitasks](https://github.com/cowboy/grunt/blob/master/docs/types_of_tasks.md), you can specify several targets depending on the complexity of your project.

### Closure Compiler


## Examples
_(Coming soon)_

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt](https://github.com/cowboy/grunt).

## Release History
_(Nothing yet)_

## License
Copyright (c) 2012 Thanasis Polychronakis  
Licensed under the APACHE2 license.
