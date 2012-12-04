# Grunt Closure Tools :: Changelog

- **v.0.6.9**, *04 December 2012*
  - DepsWriter's `closureLibraryPath` and `output_file` paths now parse Grunt's directives.

- **v.0.6.8**, *03 December 2012*
  - `checkModified` option was being ignored. Fix by [izb](https://github.com/izb) [#10](https://github.com/thanpolas/grunt-closure-tools/issues/10)

- **v.0.6.7**, *30 November 2012*
  - Fixes bug in `makeParam` helper func as mentioned by @alex88 at [#9](https://github.com/thanpolas/grunt-closure-tools/issues/9)
  - Made percentage calc have a max of 2 decimals

- **v.0.6.6**, *28 November 2012*
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

