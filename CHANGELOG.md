# Grunt Closure Tools :: Changelog

### v0.6.4 :: 2012/10/03
 * Fixed crashing bug with grunt.info() call in 2 `tasks/closureCompiler.js` (by [nicolacity](https://github.com/nicolacity))
 * Upgraded grunt dependency to `0.3.16`
### v0.6.3 :: 2012/08/06

 * Converted the compiler core functionality from a multitask to a helper (by [izb](https://github.com/izb))
 * Added check on modified dates so that compiler skips files it doesn't need to compile (by [izb](https://github.com/izb))
 * If defined output directory for compiler does not exist, we now create it (by [izb](https://github.com/izb))
 * Compiled output file can now use dynamic file names (by  [donaldpipowitch](https://github.com/donaldpipowitch))