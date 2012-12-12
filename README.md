# Grunt Closure Tools

Google Closure Tools for [grunt](https://github.com/cowboy/grunt):

* **[Compiler](https://developers.google.com/closure/compiler/)** Compile your JS code using the powerfull google closure compiler
* **[Builder](https://developers.google.com/closure/library/docs/closurebuilder)** Concatenate your JS codebase to a single file, optionally also compile it
* **[DepsWriter](https://developers.google.com/closure/library/docs/depswriter)** Calculate dependencies of your JS files and generate `deps.js`

## Getting Started
Install the module with: `npm install grunt-closure-tools`

```shell
npm install grunt-closure-tools
```

Then register the task by adding the following line to your `grunt.js`:

```javascript
grunt.loadNpmTasks('grunt-closure-tools');
```

## Documentation

All three tasks (compiler, builder and depswriter) are [multitasks](https://github.com/cowboy/grunt/blob/master/docs/types_of_tasks.md), so you can specify several targets depending on the complexity of your project.

### Closure Compiler

The Closure Compiler task has two requirements.

  1. **`closureCompiler`** The location of the compiler. Find the latest compiler.jar file [here](http://closure-compiler.googlecode.com/files/compiler-latest.zip).
  2. **`js`** The js files you want to compile.

You can fully configure how the compiler will behave, by setting directives in the `options`. Every key will be used as a directive for the compiler.

You can use grunt file syntax (`<config:...>` or `path/**/*.js`) for the `js` directive and for declaring externs, set in `options.externs`.

Read more about the closure compiler [here](https://developers.google.com/closure/compiler/docs/api-tutorial3).

#### Sample Config for The Closure Compiler
```javascript
closureCompiler:  {
  // any name that describes your task
  targerName: {
    // [Required] Path to closure compiler
    closureCompiler: 'path/to/closure/compiler.jar',

    // [Required] Target files to compile. Can be a string, an array of strings
    // or grunt file syntax (<config:...>, *)
    js: 'path/to/file.js',

    // [Optional] set an output file
    output_file: 'path/to/compiled_file.js',

    // [Optional] set to true if you want to check if files were modified
    // before starting compilation (can save some time in large sourcebases)
    checkModified: true,

    // [Optional] Set Closure Compiler Directives here
    options: {
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
  }
}
```
### Closure Builder

The Closure Builder task has 2 required directives:

  1. A way to find the `closurebuilder.py` file. One of the following two directives are required:
    * **`closureLibraryPath`** A path to the Google Closure Library. From there we can infer the location of the closurebuilder.py file
    * **`builder`** Directly reference the closurebuilder.py file
  2. An input method must be defined. One of the following two directives is required:
    * **`inputs`** String, array or grunt file syntax to define build targets
    * **`namespaces`** String or array to define namespaces to build

The builder has the ability to compile *on-the-fly* the built files. To enable this option you need to set the option `compile` to boolean `true` and then set the location of the `compiler.jar` file via the `compiler` directive.

You can set all the compiler directives in the `compiler_options` object. The `js` directive is no longer required, as the builder takes care of that. The compiler directives follow the same logic as the ones in the Closure Compiler multitask described above.

Read more about the closure builder in [this link](https://developers.google.com/closure/library/docs/closurebuilder).

#### Sample Config for The Closure Builder

```javascript
closureBuilder:  {
  // any name that describes your operation
  targetName: {
    // [Required] To find the builder executable we need either the path to
    //    closure library or directly the filepath to the builder:
    closureLibraryPath: 'path/to/closure-library', // path to closure library
    builder: 'path/to/closurebuilder.py', // filepath to builder

    // [Required] One of the two following options are required:
    inputs: 'string|Array', // input files (can just be the entry point)
    namespaces: 'string|Array', // namespaces

    // [Optional] paths to be traversed to build the dependencies
    root: 'string|Array',

    // [Optional] if not set, will output to stdout
    output_file: '',

    // [Optional] output_mode can be 'list', 'script' or 'compiled'.
    //    If compile is set to true, 'compiled' mode is enforced
    output_mode: '',

    // [Optional] if we want builder to also compile
    compile: false, // boolean
    compiler: '', // the location of the compiler.jar
    compiler_options: {
      /**
       * Go wild here...
       * any key will be used as a directive for the compiler
       * value can be a string or an array
       * If no value is required use null
       */
    }
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
   // any name that describes your operation
  targetName: {
    // [Required] To find the depswriter executable we need either the path to
    //    closure library or directly the filepath to the depswriter:
    closureLibraryPath: 'path/to/closure-library', // path to closure library
    depswriter: 'path/to/depswriter.py', // filepath to depswriter

    // [Optional] Set file targets. Can be a string, array or
    //    grunt file syntax (<config:...> or *)
    files: 'path/to/awesome.js',

    // [Optional] If not set, will output to stdout
    output_file: '',

    options: {
      // [Optional] Root directory to scan. Can be string or array
      root: ['source/ss', 'source/closure-library', 'source/showcase'],

      // [Optional] Root with prefix takes a pair of strings separated with a space,
      //    so proper way to use it is to suround with quotes.
      //    can be a string or array
      root_with_prefix: '"source/ss ../../ss"',

      // [Optional] string or array
      path_with_depspath: ''
    }
  }
}
```

## Release History

- **v0.6.12**, *12 December 2012*
  - fixed issue [#14](https://github.com/thanpolas/grunt-closure-tools/issues/14), when closureBuilder run from a grunt watch task, the root param got lost.
  - Internal file/folder structure works by [scottlangendyk](https://github.com/scottlangendyk)

- **v0.6.11**, *07 December 2012*
  - Added support for symlinks in file/path parameters (for compiler, builder, and depswriter), using `stat.isFile() || stat.isSymboliclink()` [#12](https://github.com/thanpolas/grunt-closure-tools/pull/12) (by [jbenet](https://github.com/jbenet)).

- **v0.6.10**, *06 December 2012*
  - `DepsWriter` outputs to a file named `undefined` if configured `output_file` does not exist [#11](https://github.com/thanpolas/grunt-closure-tools/pull/11) (by [scottlangendyk](https://github.com/scottlangendyk)).

- **v0.6.9**, *04 December 2012*
  - DepsWriter's `closureLibraryPath` and `output_file` paths now parse Grunt's directives.

...read the full [changelog](https://github.com/thanpolas/grunt-closure-tools/blob/master/CHANGELOG.md).

## License
Copyright (c) 2012 Thanasis Polychronakis
Licensed under the [APACHE2 license](http://www.apache.org/licenses/LICENSE-2.0).

[![githalytics.com alpha](https://cruel-carlota.pagodabox.com/5eb066586b681b39b82e56719f75faaa "githalytics.com")](http://githalytics.com/thanpolas/grunt-closure-tools)
