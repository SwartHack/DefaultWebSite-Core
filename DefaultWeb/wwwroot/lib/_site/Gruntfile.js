'use strict';
module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*!\n' +
        ' * <%= pkg.name %> v<%= pkg.version %>\n' +
        ' * Homepage: <%= pkg.homepage %>\n' +
        ' * Copyright 2012-<%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
        ' * Licensed under <%= pkg.license %>\n' +
        ' * Based on Bootstrap\n' +
        '*/\n',
        swatch: {
            amelia: {}, cerulean: {}, cosmo: {}, cyborg: {}, darkly: {},
            flatly: {}, journal: {}, lumen: {}, paper: {}, readable: {},
            sandstone: {}, simplex: {}, slate: {}, solar: {}, spacelab: {},
            superhero: {}, united: {}, yeti: {}, custom: {}
        },
        clean: {
            bootswatch: {
                src: ['../bootswatch/*/build.scss', '!../bootswatch/global/build.scss']
            },
            distcss: {
                src: ['dist/css/*']

            }
        },
        concat: {
            options: {
                banner: '<%= banner %>',
                stripBanners: false
            },
            dist: {
                src: [],
                dest: ''
            }
        },
        jshint: {
          options: {
            jshintrc: '.jshintrc'
          },
          all: [
            'Gruntfile.js',
            'js/**/*.js'
          ]
        },
        sass: {
          dist: {
            options: {

            },
            src: [],
            dest: ''
          }
        },
        uglify: {
          dist: {
            files: {
              'assets/build/app.min.js': [
                'assets/js/**/*.js'
              ]
            },
            options: {
              sourceMap: 'assets/build/app.min.js.map',
              sourceMappingURL: '/assets/build/app.min.js.map'
            }
          }
        }
    });

       require('load-grunt-tasks')(grunt, { scope: 'devDependencies' });
      require('time-grunt')(grunt);

      // Load tasks
      //grunt.loadNpmTasks('grunt-contrib-jshint');
      //grunt.loadNpmTasks('grunt-contrib-uglify');
      //grunt.loadNpmTasks('grunt-contrib-watch');
      //grunt.loadNpmTasks('grunt-contrib-sass');

      // Register tasks
      grunt.registerTask('none', function () { });
      grunt.registerTask('default', 'build');

      //// Build project scss source, with only default theme
      grunt.registerTask('build', 'Builds complete project dist, with only default theme', function () {
          //grunt.task.run('clean');
          grunt.task.run('build-theme:default');
      });

      /// Builds default bootstrap and cerulean themes
      grunt.registerTask('build-one', 'Build default and cerulean theme', function () {
          grunt.task.run('clean');
          grunt.task.run('build-theme:default,false');
          grunt.task.run('build-theme:cerulean,false');
      });

      //// Builds project scss dist, with all themes - Long running, build manually
      grunt.registerTask('build-all', 'Builds complete project dist, with all themes', function () {
          grunt.task.run('clean');
          grunt.task.run('build-theme:default,false');
          grunt.task.run('swatch');
      });

      grunt.registerMultiTask('swatch', 'build all themes', function () {
          var t = this.target;
          grunt.task.run('build-theme:' + t + ',false');
      });

        /////////////////////////////////////////
        //
        ////////////////////////////////////////
      grunt.registerTask('build-theme', 'build a regular theme from scss', function (theme) {
          var theme = theme == undefined ? grunt.config('buildtheme') : theme;
          //var compress = compress == undefined ? true : compress;
          var themedir = '../bootswatch/' + theme;
          grunt.log.debug(themedir);

          var isValidTheme = grunt.file.exists(themedir, '_variables.scss') && grunt.file.exists(themedir, '_bootswatch.scss') || theme == 'default';
          grunt.log.debug('Is valid theme:' + theme + ' - ' + isValidTheme);

          // cancel the build (without failing) if this directory is not a valid theme
          if (!isValidTheme) {
              return;
          }
          var concatSrc;
          var concatDest;
          var scssDest;
          var scssSrc;
          var files = {};
          var dist = {};

          concatSrc = '../bootswatch/global/build.scss';
          concatDest = '../bootswatch/' + theme + '/build.scss';

          if (theme == 'default') 
              scssSrc = 'sass/defaultwebsite.scss';
          else
              scssSrc = concatDest;

          scssDest = 'dist/css/themes/' + theme + '/' + theme + '.css';
          
         


          //files = {};
          //files[scssDest] = scssSrc;
          grunt.log.debug(scssSrc + '\n' + scssDest);

          dist = { src: scssSrc, dest: scssDest };
          grunt.config('sass.dist', dist);
          grunt.config('sass.dist.options.precision', 8);
          grunt.config('sass.dist.options.unix-newlines', true);

          if (theme != 'default') {
              dist = { src: concatSrc, dest: concatDest };
              grunt.config('concat.dist', dist);
              grunt.task.run('concat');
          }

          grunt.task.run('sass');

          //grunt.task.run(['sass:dist', 'prefix:' + scssDest, 'clean:build',
          //    compress ? 'compress_scss:' + scssDest + ':' + '<%=builddir%>/' + theme + '/' + theme + '.css' : 'none']);
      });
};
