module.exports = function(grunt) {
  // Permet de configurer les plugins et tâches
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    src: {
      path: 'src',
      assets: '<%= src.path %>/assets',
      js : '<%= src.assets %>/js',
      css: '<%= src.assets %>/styles',
      fonts: '<%= src.assets %>/fonts',
      images: '<%= src.assets %>/images',
      videos: '<%= src.assets %>/videos',
    },

    components: {
      path: 'bower_components',
      bootstrap: '<%= components.path %>/bootstrap',
      videojs: '<%= components.path %>/video.js'
    },

      jshint: {
        all: ['Gruntfile.js', '/src/assets/js/*.js', '/src/assets/js/*.js']
      },

      cssmin: {
        minify: {
          expand: true,
          cwd: '<%= distDir.css %>',
          src: ['*.css', '!*.min.css'],
          dest: '<%= distDir.css %>',
          ext: '.min.css'
        }
      },

      uglify: {
        minify: {
          expand: true,
          cwd: '<%= distDir.js %>',
          src: ['main.js'],
          dest: '<%= distDir.js %>',
          ext: '.min.js'
        }
      },

      distDir: {
        path: 'dist',
        tmp: '<%= distDir.path %>/tmp',
        assets: '<%= distDir.path %>/assets',
        vendor: '<%= distDir.assets %>/vendor',
        fonts: '<%= distDir.assets %>/fonts',
        images: '<%= distDir.assets %>/images',
        videos: '<%= distDir.assets %>/videos',
        css: '<%= distDir.assets %>/css',
        js: '<%= distDir.assets %>/js'
      },

      clean: {
        defaults: ['<%= distDir.path %>'],
        postBuild: ['<%= distDir.path %>/tmp'],
        js : ['<%= distDir.js %>/main.js']
      },


      copy: {
        // main: {
        //   src: '<%= src.path %>/index.html',
        //   dest: '<%= distDir.path %>/index.html',
        // },
        fontVideojs: {
          expand: true,
          cwd: '<%= components.videojs %>/font',
          src: ['*.*'],
          dest: '<%= distDir.fonts %>'
        },
        cssVideojs: {
          src: '<%= components.videojs %>/video-js.css',
          dest: '<%= distDir.css %>/video-js.css',
        },
        css: {
          src: '<%= components.bootstrap %>/dist/css/bootstrap.min.css',
          dest: '<%= distDir.css %>/bootstrap.min.css',
        },
        bootstrap:{
          src: '<%= components.bootstrap %>/dist/js/bootstrap.min.js',
          dest: '<%= distDir.vendor %>/bootstrap.min.js',
        },
        fonts: {
          expand: true,
          cwd: '<%= src.fonts %>',
          src: ['*.*'],
          dest: '<%= distDir.fonts %>'
        },
        img: {
          expand: true,
          cwd: '<%= src.images %>',
          src: ['*.*'],
          dest: '<%= distDir.images %>'
        },
        video: {
          expand: true,
          cwd: '<%= src.videos %>',
          src: ['*.*'],
          dest: '<%= distDir.videos %>'
        },
        imgUpload: {
          expand: true,
          cwd: '<%= src.images %>/uploads',
          src: ['*.*'],
          dest: '<%= distDir.images %>/uploads'
        },
        cssDev: {
          expand: true,
          cwd: '<%= src.css %>',
          src: ['*.css'],
          dest: '<%= distDir.css %>',
          ext: '.css'
        },
        html: {
          expand: true,
          cwd: '<%= src.path %>',
          src: ['*.html'],
          dest: '<%= distDir.path %>',
          ext: '.html'
        }
        // },
        // jsDev: {
        //   expand: true,
        //   cwd: '<%= src.js %>',
        //   src: ['*.js'],
        //   dest: '<%= distDir.js %>',
        //   ext: '.js'
        // }
      },

      bower: {
          dev: {
            dest: '<%= distDir.vendor %>'
          }
      },

      watch: {
          dist: {
            options: { livereload: true },
            files: ['<%= distDir.path %>/**']
          },
          html: {
            files: ['<%= src.path %>/*.html'],
            tasks: ['copy:html']
          },
          index: {
            files: ['<%= src.path %>/index.html'],
            tasks: ['devFlag','index']
          },
          css: {
            files: ['<%= src.path %>/assets/styles/*.scss'],
            tasks: ['sass','copy:cssDev']
          },
          js: {
            files: ['<%= src.path %>/assets/js/*.js'],
            tasks: ['clean:js', 'concat:js']
          }
      },

      concat: {
        options: {
          separator: ';'
        },
        js: {
          src: ['<%= src.js %>/*.js','<%= distDir.vendor %>/*.*'],
          dest: '<%= distDir.js %>/main.js'
        }
      },


      sass: {
        dist: {
          files: {
            '<%= distDir.css %>/main.css': '<%= src.css %>/main.scss'
          }
        }
      },

      imagemin: {                          // Task
        // static: {                          // Target
        //   options: {                       // Target options
        //     optimizationLevel: 3
        //   },
        //   files: {                         // Dictionary of files
        //     'dist/img.png': 'src/img.png', // 'destination': 'source'
        //     'dist/img.jpg': 'src/img.jpg',
        //     'dist/img.gif': 'src/img.gif'
        //   }
        // },
        dynamic: {                         // Another target
          files: [{
            expand: true,                  // Enable dynamic expansion
            cwd: '<%= src.images %>/',                   // Src matches are relative to this path
            src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
            dest: '<%= distDir.images %>/'                  // Destination path prefix
          }]
        }
      }

  });

// task to process src/index.html
      grunt.registerTask('index', 'Process index.html template', function () {
      grunt.file.copy('src/index.html', 'dist/index.html', { process: grunt.template.process });
      });
      // tasks to set dev/prod flag
      grunt.registerTask('devFlag', 'dev flag', function () {
      grunt.config.set('dev', true);
      grunt.config.set('prod', false);

      });
      grunt.registerTask('prodFlag', 'prod flag', function () {
      grunt.config.set('prod', true);
      grunt.config.set('dev', false);
      });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-bower');
  grunt.loadNpmTasks('grunt-contrib-imagemin');


  grunt.registerTask('build', ['clean:defaults', 'sass', 'concat', 'jshint', 'cssmin', 'copy', 'bower', 'index', 'uglify']);
  grunt.registerTask('build-dev', ['devFlag','build']);
  grunt.registerTask('build-prod', ['prodFlag','build','imagemin']);
};