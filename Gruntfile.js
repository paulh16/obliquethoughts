module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    concat: {
      dist: {
        src: ['js/main.js', 'js/plugins/*.js'],
        dest: 'js/build/production.js'
      }
    },

    uglify: {
        build: {
            src: 'js/build/production.js',
            dest: 'js/build/production.min.js'
        }
    }, 

    imagemin: {                          // Task
      dynamic: {                         // Another target
        options: {
          cache: false
        },
        files: [{
          expand: true,                  // Enable dynamic expansion
          cwd: 'img/prebuild',                   // Src matches are relative to this path
          src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
          dest: 'img/build/'                  // Destination path prefix
        }]
      }
    },

    sass: {                              // Task
      dist: {                            // Target
        options: {                       // Target options
          style: 'compressed'
        },
        files: {                         // Dictionary of files
          'css/main_unprefixed.css': 'sass/styles.scss'      // 'destination': 'source'
        }
      }
    },

    autoprefixer: {

      single_file: {
        src: 'css/main_unprefixed.css',
        dest: 'css/build/main.css'
      },
    },

    watch: {
      scripts: {
        files: ['js/main.js', 'js/plugins/*.js'],
        tasks: ['concat','uglify'],
        options: {
          spawn: false,
        },
      },

      css: {
        files: 'sass/*.scss',
        tasks: ['sass'],
        options: {
          spawn: true,
        },
      },

      styles: {
          files: ['css/main_unprefixed.css'],
          tasks: ['autoprefixer']
      },

    }

  });

  // Load the plugin that provides the "uglify" task.
  require('load-grunt-tasks')(grunt);

  // Default task(s).
  // Need to manually run imagemin
  grunt.registerTask('default', ['concat', 'uglify', 'sass', 'autoprefixer', 'watch']);
 

};