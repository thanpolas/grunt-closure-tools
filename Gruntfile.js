module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    closureDepsWriter: {
      deppy: {
        closureLibraryPath: 'closure-library',
        output_file: 'lib/deps.js',
        options: {
          root_with_prefix: ['"lib ../../../lib"']
        }
      },
      todoApp: {
        closureLibraryPath: 'closure-library',
        output_file: 'test/todoApp/deps.js',
        options: {
          root_with_prefix: ['"test/todoApp/ ./"']
        }
      }

    },

    watch: {
      autoBuild: {
        files: 'lib/**/*.js',
        tasks: ['build', 'test']
      },
      gruntFile: {
        files: ['Gruntfile.js', 'tasks/*.js'],
        tasks: ['deppyRun']
      }
    },
  });
};
