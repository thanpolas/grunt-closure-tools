module.exports = function(grunt) 
{
  grunt.loadTasks('tasks');
  
  // Project configuration.
  grunt.initConfig({
    pkg: '<json:package.json>',
    test: {
      files: ['test/*.js']
    },
    lint: {
      files: ['grunt.js', 'tasks/*.js', 'test/*.js']
    },
    watch: {
      files: '<config:lint.files>',
      tasks: 'default'
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: false,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: false,
        undef: true,
        boss: true,
        eqnull: true,
        node: true
      },
      globals: {
        exports: true
      }
    },
    
    testTask: {
      opt: {
        and: 'run',
        ore: 2,
        zit: {
          go: 'before',
          lol: [1, 2, 3]
        }
      }
    }
  });

  // Default task.
  grunt.registerTask('default', 'testTask');
};