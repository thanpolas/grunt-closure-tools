# Grunt Closure Tools

Google Closure Tools for [grunt](https://github.com/gruntjs/grunt):

* **[Compiler](https://developers.google.com/closure/compiler/)** Compile your JS code using the powerful google closure compiler
* **[Builder](https://developers.google.com/closure/library/docs/closurebuilder)** Concatenate your JS codebase to a single file, optionally also compile it
* **[DepsWriter](https://developers.google.com/closure/library/docs/depswriter)** Calculate dependencies of your JS files and generate `deps.js`

[![Build Status](https://travis-ci.org/closureplease/grunt-closure-tools.png?branch=master)](https://travis-ci.org/closureplease/grunt-closure-tools)

## Getting Started
Install the module with: `npm install grunt-closure-tools`

```shell
npm install grunt-closure-tools --save-dev
```

Then register the task by adding the following line to your `grunt.js`:

```javascript
grunt.loadNpmTasks('grunt-closure-tools');
```

#### Grunt 0.3.x compatibility

[**Migration Guide** from 0.3.x grunt config to 0.4.x](docs/changes_from_0.3.x_to_0.4.x.md)

To get a grunt 0.3.x. compatible version please install with:
```shell
npm install grunt-closure-tools@0.6.13 --save-dev
```

The Grunt 0.3.x repository can be found frozen [in this branch](https://github.com/closureplease/grunt-closure-tools/tree/grunt-0.3.x-STABLE).

## Documentation

All three tasks (compiler, builder and depswriter) are [multitasks](https://github.com/cowboy/grunt/blob/master/docs/types_of_tasks.md), so you can specify several targets depending on the complexity of your project.

### Closure Compiler

The Closure Compiler task has two requirements.

  1. **`compilerFile`** The location of the compiler. Find the latest compiler.jar file [here](http://closure-compiler.googlecode.com/files/compiler-latest.zip).
  2. **`src`** The js files you want to compile.

You can fully configure how the compiler will behave, by setting directives in the `options`. Every key will be used as a directive for the compiler.

You can use grunt file syntax (`<config:...>` or `path/**/*.js`) for the `js` directive and for declaring externs, set in `options.externs`.

Read more about the closure compiler [here](https://developers.google.com/closure/compiler/docs/api-tutorial3).

#### Sample Config for The Closure Compiler
```javascript
closureCompiler:  {

  options: {
    // [REQUIRED] Path to closure compiler
    compilerFile: 'path/to/closure/compiler.jar',

    // [OPTIONAL] set to true if you want to check if files were modified
    // before starting compilation (can save some time in large sourcebases)
    checkModified: true,

    // [OPTIONAL] Set Closure Compiler Directives here
    compilerOpts: {
      /**
       * Keys will be used as directives for the compiler
       * values can be strings or arrays.
       * If no value is required use null
       *
       * The directive 'externs' is treated as a special case
       * allowing a grunt file syntax (<config:...>, *)
       *
       * Following are some directive samples...
       */
       compilation_level: 'ADVANCED_OPTIMIZATIONS',
       externs: ['path/to/file.js', '/source/**/*.js'],
       define: ["'goog.DEBUG=false'"],
       warning_level: 'verbose',
       jscomp_off: ['checkTypes', 'fileoverviewTags'],
       summary_detail_level: 3,
       output_wrapper: '(function(){%output%}).call(this);'
    }

  },

  // any name that describes your task
  targetName: {

    // [OPTIONAL] Target files to compile. Can be a string, an array of strings
    // or grunt file syntax (<config:...>, *)
    src: 'path/to/file.js',

    // [OPTIONAL] set an output file
    dest: 'path/to/compiled_file.js'
  }
}
```
### Closure Builder

The Closure Builder task has 3 required directives:

  1. A way to find the `closurebuilder.py` file. One of the following two directives are required:
    * **`closureLibraryPath`** A path to the Google Closure Library. From there we can infer the location of the closurebuilder.py file
    * **`builder`** Directly reference the closurebuilder.py file
  2. An input method must be defined. One of the following two directives is required:
    * **`inputs`** String, array or grunt file syntax to define build targets
    * **`namespaces`** String or array to define namespaces to build
  3. The root targets of the closureBuilder. These are defined in the:
    * **`src`** option of each target. Can be string or array.

The builder has the ability to compile *on-the-fly* the built files. To enable this option you need to set the option `compile` to boolean `true` and then set the location of the `compiler.jar` file via the `compiler` directive.

You can set all the compiler directives in the `compiler_options` object. The `js` directive is no longer required, as the builder takes care of that. The compiler directives follow the same logic as the ones in the Closure Compiler multitask described above.

Read more about the closure builder in [this link](https://developers.google.com/closure/library/docs/closurebuilder).

#### Sample Config for The Closure Builder

```javascript
closureBuilder:  {
  options: {
    // [REQUIRED] To find the builder executable we need either the path to
    //    closure library or directly the filepath to the builder:
    closureLibraryPath: 'path/to/closure-library', // path to closure library
    // [OPTIONAL] You can define an alternative path of the builder.
    //    If set it trumps 'closureLibraryPath' which will not be required.
    builder: 'path/to/closurebuilder.py',

    // [REQUIRED] One of the two following options is required:
    inputs: 'string|Array', // input files (can just be the entry point)
    namespaces: 'string|Array', // namespaces

    // [OPTIONAL] The location of the compiler.jar
    // This is required if you set the option "compile" to true.
    compilerFile: 'path/to/compiler.jar',

    // [OPTIONAL] output_mode can be 'list', 'script' or 'compiled'.
    //    If compile is set to true, 'compiled' mode is enforced.
    //    Default is 'script'.
    output_mode: '',

    // [OPTIONAL] if we want builder to perform compile
    compile: false, // boolean

    compilerOpts: {
      /**
      * Go wild here...
      * any key will be used as an option for the compiler
      * value can be a string or an array
      * If no value is required use null
      */
    }

  },

  // any name that describes your operation
  targetName: {

    // [REQUIRED] paths to be traversed to build the dependencies
    src: 'string|Array',

    // [OPTIONAL] if not set, will output to stdout
    dest: ''
  }
}
```

### Closure DepsWriter

The Closure DepsWriter task has 1 required directive:

  1. A way to find the `depswriter.py` file. One of the following two directives is required:
    * **`closureLibraryPath`** A path to the Google Closure Library. From there we can infer the location of the depswriter.py file
    * **`depswriter`** Directly reference the depswriter.py file

Read more about depswriter [here](https://developers.google.com/closure/library/docs/depswriter).

#### Sample Config for The Closure DepsWriter

```javascript
closureDepsWriter: {
  options: {
    // [REQUIRED] To find the depswriter executable we need either the path to
    //    closure library or the depswriter executable full path:
    closureLibraryPath: 'path/to/closure-library',

    // [OPTIONAL] Define the full path to the executable directly.
    //    If set it trumps 'closureLibraryPath' which will not be required.
    depswriter: 'path/to/depswriter.py', // filepath to depswriter

    // [OPTIONAL] Root directory to scan. Can be string or array
    root: ['source/ss', 'source/closure-library', 'source/showcase'],

    // [OPTIONAL] Root with prefix takes a pair of strings separated with a space,
    //    so proper way to use it is to suround with quotes.
    //    can be a string or array
    root_with_prefix: '"source/ss ../../ss"',

    // [OPTIONAL] string or array
    path_with_depspath: ''


  },
   // any name that describes your operation
  targetName: {

    // [OPTIONAL] Set file targets. Can be a string, array or
    //    grunt file syntax (<config:...> or *)
    src: 'path/to/awesome.js',

    // [OPTIONAL] If not set, will output to stdout
    dest: ''

  }
}
```

## Release History

### Grunt 0.4.x Versions

- **v0.8.0**, *28 Mar 2013*
  - Changed internal API, it's a breaking change the package is required as an npm packaged.
  - Colors changed in build stats output.
- **v0.7.7**, *19 Mar 2013*
  - Removed the compiling time optimization for now, it fails the travis tests.
- **v0.7.6**, *19 Mar 2013*
  - helpers.makeParam() - if param is an array, makeParam() should return a flat array after expanding its items with grunt.file.expand and not an array of arrays. By [@centi](https://github.com/centi) [#22](https://github.com/closureplease/grunt-closure-tools/pull/22)
  - Added two options on the compile command to speed up compiling time. Tip from [@igorminar](https://github.com/IgorMinar) on [this commit](https://github.com/angular/angular.js/commit/3bd95dbb1a502575ae8250f49190f153442054eb).
  - Moved repository to the *closureplease* organization.
- **v0.7.5**, *16 Mar 2013*
  - Now works if *.py have no execution permission. By [teppeis](https://github.com/teppeis) [#21](https://github.com/closureplease/grunt-closure-tools/pull/21).
  - Minor bug fixes in tasks.

...read the full [changelog](CHANGELOG.md).

## License
Copyright (c) 2013 Thanasis Polychronakis
Licensed under the [MIT license](LICENSE-MIT).

[![githalytics.com alpha](https://cruel-carlota.pagodabox.com/5eb066586b681b39b82e56719f75faaa "githalytics.com")](http://githalytics.com/thanpolas/grunt-closure-tools)
