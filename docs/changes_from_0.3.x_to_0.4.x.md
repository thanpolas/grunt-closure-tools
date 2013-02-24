# Migration Guide From 0.3.x Grunt's Config to 0.4.x

The following changes have been made to the three tasks provided by Grunt Closure Tools.

## Closure Builder

These configuration directives have been changed:

* **root** renamed to *src*.
* **output_file** renamed to *dest*.
* Everything else has been moved into the `options` Object as per [Grunt's config guidelines][gruntConfig]
* **output_mode** changed the default value from '*list*' to '*script*'.
* **compiler** renamed to **compilerFile**.
* **compiler_options** renamed to *compilerOpts*.



Here's a complete configuration sample for the `closureBuilder` task:

```js
closureBuilder:  {
  options: {
    // [REQUIRED] To find the builder executable we need either the path to
    //    closure library or directly the filepath to the builder:
    closureLibraryPath: 'path/to/closure-library', // path to closure library

    // [REQUIRED] One of the two following options is required:
    inputs: 'string|Array', // input files (can just be the entry point)
    namespaces: 'string|Array', // namespaces

    // [OPTIONAL] You can define an alternative path of the builder.
    //    If set it trumps 'closureLibraryPath' which will not be required.
    builder: 'path/to/closurebuilder.py',

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

## Closure Compiler

These configuration directives have been changed:

* **output_file** renamed to *dest*.
* **js** renamed to *src*.
* Everything else has been moved into the `options` Object as per [Grunt's config guidelines][gruntConfig]
* **closureCompiler** renamed to **compilerFile**.
* **options** renamed to *compilerOpts*.

Here's a complete configuration sample for the `closureCompiler` task:

```js
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

## Closure DepsWriter

These configuration directives have been changed:

* **files** renamed to *src*.
* **output_file** renamed to *dest*.
* Everything else has been moved into the `options` Object as per [Grunt's config guidelines][gruntConfig]
* **options** Object is now merged with Grunt's `options` Object.
Here's a complete configuration sample for the `closureDepsWriter` task:

```js
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


[gruntConfig]: https://github.com/gruntjs/grunt/wiki/Configuring-tasks "Grunt Configuring Tasks"
