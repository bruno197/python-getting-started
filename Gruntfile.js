module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
        // Task configuration goes here.
        sass: {
          dev: {
            options: {
                style: 'expanded',
                loadPath: 'node_modules'
            },
            files: {
              'export_metrics_jira/static/css/style.css': 'export_metrics_jira/src/stylesheets/app.scss'
            }
          }
        },
        browserify: {
            app: {
                dest: 'export_metrics_jira/static/js/app.js',
                src: ['export_metrics_jira/src/app/app.js']
            },
            gadget: {
                dest: 'export_metrics_jira/static/js/gadget.js',
                src: ['export_metrics_jira/src/gadget/app.js']
            }
        },
        watch: {
            options: {livereload: true},
            js: {
                files: 'export_metrics_jira/src/**/**/*.js',
                tasks: ['browserify']
            },
            sass: {
                files: 'export_metrics_jira/src/stylesheets/**/*.scss',
                tasks: ['sass:dev']
            }
        },
        uglify: {
            options: {
                mangle: false
            },
            app: {
                files: {
                    'export_metrics_jira/static/js/app.min.js': ['export_metrics_jira/static/js/app.js']
                }
            },
            gadget: {
                files: {
                    'export_metrics_jira/static/js/gadget.min.js': ['export_metrics_jira/static/js/gadget.js']
                }
            }
        },
        cssmin: {
          options: {
            shorthandCompacting: false,
            roundingPrecision: -1
          },
          target: {
            files: {
              'export_metrics_jira/static/css/style.min.css': ['static/css/style.css']
            }
          }
        }
    });

  // Load plugins here.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  // Register tasks here.
  grunt.registerTask('default', ['sass:dev', 'browserify', 'watch']);

};