'use strict';
module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*!\n' +
        ' * <%= pkg.name %> v<%= pkg.version %>\n' +
        ' * Homepage: <%= pkg.homepage %>\n' +
        ' * Copyright 2012-<%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
        ' * Licensed under <%= pkg.license %>\n' +
        ' * Based on...\n' +
        '*/\n',
        swatch: {
            cerulean: {}, cosmo: {}, cyborg: {}, darkly: {},
            flatly: {}, journal: {}, litera: {}, lumen: {}, lux: {}, materia: {}, minty: {},
            pulse: {}, sandstone: {}, simplex: {}, slate: {}, solar: {}, spacelab: {},
            superhero: {}, united: {}, yeti: {}
        },
        clean: {
            bootswatch: {
                src: ['../bootswatch/*/build.scss', '!../bootswatch/global/build.scss']
            },
            distcss: {
                src: ['dist/css/*']
            },
            distjs: {
                src: ['dist/js/*.*']
            },
            theme: {
                src: ''
            }
        },
        concat: {
            options: {
                banner: '<%= banner %>',
                stripBanners: false,

            },
            jcore: {
                src: ['<%= pkg.corejs %>'],
                dest: 'dist/js/jcore.js',
                nonull: true
            },
            site: {
                src: ['<%= pkg.sitejs %>'],
                dest: 'dist/js/site.js',
                nonull: true
            }
        },
        eslint: {
            src: ['dist/js/site.js']
        },
        sass: {
          dist: {
              options: {
                  sourceMap: false
            },
            src: [],
            dest: ''
          }
        },
        postcss: {
            options: {
                map: false, // inline sourcemaps
                processors: [
                    require('postcss')(), // add fallbacks for rem units
                    
                ]
            },
            dist: {
                src: ''
            }
        },
        cssmin: {
            options: {
                // TODO: disable `zeroUnits` optimization once clean-css 3.2 is released
                //    and then simplify the fix for https://github.com/twbs/bootstrap/issues/14837 accordingly
                compatibility: 'ie10',
                keepSpecialComments: '*',
                sourceMap: true,
                advanced: false
            },
            dist: {
                src: '',
                dest:''
            }
        },
        copy: {
            //css: {
            //    expand: true,
            //    cwd: 'dist/css',
            //    src: [ '*.min.css , *.min.*.map' ],
            //    dest: '../../css',
            //    filter: 'isFile'
            //},
            fonts: {
                expand: true,
                src: 'dist/fonts/*.*',
                dest: '../../fonts/',
                filter: 'isFile'
            }    
        },
        uglify: {
            wwwroot: {
                options: {
                    compress: {
                        warnings: false
                    },
                    mangle: true,
                    preserveComments: 'some',
                    sourceMap: '../../js/defaultwebsite.min.js.map',

                },
                files: {
                    '../../js/defaultwebsite.min.js': ['dist/js/jcore.js', 'dist/js/site.js']
                }
            }

        },
        exec: {
            //postcss: {
            //    command: 'npm run postcss'
            //}
        }
    });

      require('load-grunt-tasks')(grunt, { scope: 'devDependencies' });
      require('time-grunt')(grunt);

      // Register tasks
      grunt.registerTask('none', function () { });
      grunt.registerTask('default', '');

      grunt.registerTask('build-all', function () {
          grunt.task.run('themes');
          grunt.task.run('js');
          //grunt.task.run('copy:deploy');

      });

      grunt.registerTask('build', function () {
          grunt.task.run('theme');
          grunt.task.run('js');

      });

      /// Builds default bootstrap and cerulean themes
      grunt.registerTask('theme', 'Build default and cerulean theme', function () {
          //grunt.task.run('clean');
          grunt.task.run('buildtheme:default');
          //grunt.task.run('buildtheme:cerulean');
          //grunt.task.run('copy:css')
      });

      //////////////////////////////////
      //// deal with the javascript, don't use bundle-minify'
      grunt.registerTask('js', function () {
          grunt.task.run('clean:distjs');
          grunt.task.run('concat:jcore');
          grunt.task.run('concat:site');
          grunt.task.run('eslint');
          //grunt.task.run('uglify:wwwroot')
      });

      //// Build project scss source, with only default theme
      grunt.registerTask('theme-default', 'Builds dist/css, with only default theme', function () {
          //grunt.task.run('clean');
          grunt.task.run('buildtheme:default');
      });

      //// Builds project scss dist, with all themes - Long running, build manually
      grunt.registerTask('themes', 'Builds complete project dist, with all themes', function () {
          //grunt.task.run('clean');
          grunt.task.run('buildtheme:default');
          grunt.task.run('swatch');
          //grunt.task.run('copy:css')
      });

      grunt.registerMultiTask('swatch', 'build all themes', function () {
          var t = this.target;
          grunt.task.run('buildtheme:' + t);
      });

      grunt.registerTask('clean-theme', function () {
          grunt.config('clean.theme.src', 'dist/css/default.*');
          grunt.task.run('clean:theme');
      });

     

        /////////////////////////////////////////
        //
        ////////////////////////////////////////
      grunt.registerTask('buildtheme', 'build a regular theme from scss', function (theme) {
          var theme = theme == undefined ? grunt.config('buildtheme') : theme;
          //var compress = compress == undefined ? true : compress;
          var themedir = '../bootswatch/' + theme;
          console.log(themedir);

          var isValidTheme = grunt.file.exists(themedir, '_variables.scss') && grunt.file.exists(themedir, '_bootswatch.scss') || theme == 'default';
          
          console.log('Is valid theme:' + theme + ' - ' + isValidTheme);
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

          concatSrc = 'sass/global/build.scss';
          concatDest = themedir + '/build.scss';

          if (theme == 'default') 
              scssSrc = 'sass/defaultwebsite.scss';
          else
              scssSrc = concatDest;

          scssDest = 'dist/css/' + theme + '.css';
          
          console.log(scssSrc + '\n' + scssDest);

          // clean this theme
          grunt.config('clean.theme.src', 'dist/css/' + theme + '.*');
          grunt.task.run('clean:theme')

          if (theme != 'default') {
              //dist = { src: concatSrc, dest: concatDest };
              grunt.config('concat.dist', { src: concatSrc, dest: concatDest });
              grunt.task.run('concat');
          }

          //dist = { src: scssSrc, dest: scssDest };
          grunt.config('sass.dist', { src: scssSrc, dest: scssDest });
          grunt.config('sass.dist.options.precision', 10);
          grunt.config('sass.dist.options.unix-newlines', true);
          grunt.task.run('sass');

          grunt.config('postcss.dist.src', scssDest);
          grunt.task.run('postcss');

          grunt.config('cssmin.dist', {
              src: 'dist/css/' + theme + '.css',
              dest: '../../css/' + theme + '.min.css'
          });
          grunt.task.run('cssmin');

          //grunt.task.run(['sass:dist', 'prefix:' + scssDest, 'clean:build',
          //    compress ? 'compress_scss:' + scssDest + ':' + '<%=builddir%>/' + theme + '/' + theme + '.css' : 'none']);
      });
};
