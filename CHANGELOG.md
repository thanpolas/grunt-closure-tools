# Grunt Closure Tools :: Changelog

## Grunt 0.4.x Versions

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
  - Now works if *.py have no execution permission. By [teppeis](https://github.com/teppeis) [#21](https://github.com/thanpolas/grunt-closure-tools/pull/21).
  - Minor bug fixes in tasks.
- **v0.7.3**, *16 February 2013*
  - Lots of bug fixes on compiler task, it was broken. Thanks [@hallettj](https://github.com/hallettj)
  - Made a closure mock, the closure compiler and closure tools (bin file), npm development dependencies.
  - Added integration tests and travis CI
- **v0.7.2**, *11 February 2013*
  - Created infra for tests.
  - Extended the command runner helpers API to support silence execution.
  - Created the closure options library which contains options from the actual python and java google closure tools.
- **v0.7.1**, *10 February 2013*
  - Exposed the internal API for use with node.
- **v0.7.0**, *10 February 2013*
  - Complete refactoring. New API. Grunt 0.4.x compatible.

## Grunt 0.3.x Versions

- **v0.6.13**, *09 February 2013*
  - Plain version bump. Last version to support Grunt 0.3.x
- **v0.6.12**, *12 December 2012*
  - fixed issue [#14](https://github.com/closureplease/grunt-closure-tools/issues/14), when closureBuilder run from a grunt watch task, the root param got lost.
  - Internal file/folder structure works by [scottlangendyk](https://github.com/scottlangendyk)
- **v0.6.11**, *07 December 2012*
  - Added support for symlinks in file/path parameters (for compiler, builder, and depswriter), using `stat.isFile() || stat.isSymboliclink()` [#12](https://github.com/thanpolas/grunt-closure-tools/pull/12) (by [jbenet](https://github.com/jbenet)).
- **v0.6.10**, *06 December 2012*
  - `DepsWriter` outputs to a file named `undefined` if configured `output_file` does not exist [#11](https://github.com/thanpolas/grunt-closure-tools/pull/11) (by [scottlangendyk](https://github.com/scottlangendyk)).
- **v0.6.9**, *04 December 2012*
  - DepsWriter's `closureLibraryPath` and `output_file` paths now parse Grunt's directives.
- **v0.6.8**, *03 December 2012*
  - `checkModified` option was being ignored. Fix by [izb](https://github.com/izb) [#10](https://github.com/thanpolas/grunt-closure-tools/issues/10)
- **v0.6.7**, *30 November 2012*
  - Fixes bug in `makeParam` helper func as mentioned by @alex88 at [#9](https://github.com/thanpolas/grunt-closure-tools/issues/9)
  - Made percentage calc have a max of 2 decimals
- **v0.6.6**, *28 November 2012*
  - Compiler: Made the built in 'data checking' feature optional, added the `checkModified` option as per [nicolacity's](https://github.com/nicolacity) suggestion on [issue #8](https://github.com/thanpolas/grunt-closure-tools/issues/8).
- **v0.6.5**, *27 November 2012*
  - Builder: `closureLibraryPath`, `inputs`, `root` directives now parse grunt directives.
  - Compiler: Fixed percentage, now shows how much the compile file gets reduced.
- **v0.6.4** :: *03 October 2012*
  - Fixed crashing bug with grunt.info() call in 2 `tasks/closureCompiler.js` (by [nicolacity](https://github.com/nicolacity))
  - Upgraded grunt dependency to `0.3.16`
- **v0.6.3**, *06 August 2012*
  - Converted the compiler core functionality from a multitask to a helper (by [izb](https://github.com/izb))
  - Added check on modified dates so that compiler skips files it doesn't need to compile (by [izb](https://github.com/izb))
  - If defined output directory for compiler does not exist, we now create it (by [izb](https://github.com/izb))
  - Compiled output file can now use dynamic file names (by  [donaldpipowitch](https://github.com/donaldpipowitch))

