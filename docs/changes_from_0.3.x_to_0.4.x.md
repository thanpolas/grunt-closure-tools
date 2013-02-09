# Migration Guide From 0.3.x Grunt's Config to 0.4.x

The following changes have been made to the three tasks provided by Grunt Closure Tools.

## Closure Builder

These configuration directives have been changed:

* **closureBuilder** moved to *options*.
* **builder** moved to *options*.
* **output_file** renamed to *dst*.
* **compiler** moved to *options*.

Here's a complete configuration sample for the `closureBuilder` task:

```js
var gruntConfig = {
  closureBuilder:  {
    options: {
      // [REQUIRED] To find the builder executable we need either the path to
      //    closure library or directly the filepath to the builder:
      closureLibraryPath: 'path/to/closure-library', // path to closure library

      // [OPTIONAL] You can define an alternative path of the builder,
      // trumps all.
      builder: 'path/to/closurebuilder.py',

      // [OPTIONAL] The location of the compiler.jar
      // This is required if you set the option "compile" to true.
      compiler: 'path/to/compiler.jar'
    },

    // any name that describes your operation
    targetName: {

      // [REQUIRED] One of the two following options is required:
      inputs: 'string|Array', // input files (can just be the entry point)
      namespaces: 'string|Array', // namespaces

      // [OPTIONAL] paths to be traversed to build the dependencies
      root: 'string|Array',

      // [OPTIONAL] if not set, will output to stdout
      dst: '',

      // [OPTIONAL] output_mode can be 'list', 'script' or 'compiled'.
      //    If compile is set to true, 'compiled' mode is enforced
      output_mode: '',

      // [OPTIONAL] if we want builder to perform compile
      compile: false, // boolean

      compiler_options: {
        /**
        * Go wild here...
        * any key will be used as an option for the compiler
        * value can be a string or an array
        * If no value is required use null
        */
      }
    }
  }
};
```

