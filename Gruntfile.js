module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      build: {
        src: '<%= pkg.name %>.js',
        dest: '<%= pkg.name %>.min.js'
      }
    },
    mocha_phantomjs: {
      all: ['test/*.html']
    },
    jslint: {
      all: {
        src: ['backbone.router.title.helper.js'],
        directives: {
          nomen: true,
          predef: [
            'document', 'jQuery', 'Backbone', '_'
          ]
        }
      }
    }
  });

  // Load plugins that provides the "uglify", "mocha" and "jslint" tasks.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-mocha-phantomjs');
  grunt.loadNpmTasks('grunt-jslint');

  // Default task(s).
  grunt.registerTask('default', ['jslint','mocha_phantomjs','uglify']);
};