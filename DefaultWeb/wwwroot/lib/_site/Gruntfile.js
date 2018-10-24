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
            options: {
                force: true
            },
            any: {
                src:['']
            },
            bootswatch: {
                src: ['../bootswatch/*/build.scss', '!../bootswatch/global/build.scss']
            },
            distcss: {
                src: ['dist/css/*.*', '!dist/css/images', '!dist/css/video-js.css', '!dist/css/jquery-ui.css', '!dist/css/arcgis.css']
            },
            distjs: {
                src: ['dist/js/*.*', '!dist/js/pdf.worker.js', '!dist/js/lib']
            },
            theme: {
                src: ''
            },
            wwwrootall: {
                src:['../../css/**', '../../js/**','../../fonts/**', '../../images/**']
            },
            wwwroot: {
                src: ['../../css/*.css', '../../js/**', '!../../css/images', '!../../images', '!../../fonts']
            }
        },
        concat: {
            options: {
                banner: '<%= banner %>',
                stripBanners: false,

            },
            theme: {
                src: '',
                dest: '',
                nonull: true
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
            },
            header: {
                src: ['<%= pkg.headerjs %>'],
                dest: 'dist/js/header.js',
                nonull: true
            }
        },
        eslint: {
            src: ['dist/js/site.js']
        },
        sass: {
            options: {
                
            },
            dist: {
                
                src: [''],
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
            wwwroot: {
                src: 'dist/css/*.*',
                dest: '../../css/defaultwebsite.min.css'
            }
        },
        copy: {
           fonts: {
                expand: true,
                cwd: 'fonts/',
                src: '*.*',
                dest: '../../fonts/',
                filter: 'isFile'
            },
            images: {
                expand: true,
                cwd: 'images/',
                src: '*.*',
                dest: '../../images/',
                filter: 'isFile'
            },
            pdfworker: {
                expand: true,
                cwd: 'js/pdfjs/',
                src: 'pdf.worker.js',
                dest: 'dist/js/',
                filter: 'isFile'
            },
            pdfworkerdeploy: {
                expand: true,
                cwd: 'dist/js/',
                src: 'pdf.worker.js',
                dest: '../../js/',
                filter: 'isFile'
            },
            dijit: {
                expand: true,
                cwd: 'js/lib/dijit/themes/',
                src: 'dijit.css',
                dest: 'dist/css/',
                filter: 'isFile'
            },
            jqueryuicss: {
                expand: true,
                cwd: '../jquery-ui/themes/base/',
                src: 'jquery-ui.css',
                dest: 'dist/css/',
                filter: 'isFile'
            },
            dwsjs: {
                expand: true,
                cwd: 'dist/js/lib/dws/',
                src: '*.*',
                dest: 'dist/js/dws',
                filter: 'isFile'
            },
            sitejs: {
                expand: true,
                cwd: 'dist/js/',
                src: '*.*',
                dest: '../../js/',
                filter: 'isFile'
            }
        },
        uglify: {
            header: {
                options: {
                    compress: {
                        warnings: false
                    },
                    mangle: true,
                    preserveComments: 'some',
                    sourceMap: '../../js/header.min.js.map',

                },
                files: {
                    '../../js/header.min.js': ['<%= pkg.headerjs %>']
                }
            },
            jcore: {
                options: {
                    compress: {
                        warnings: false
                    },
                    mangle: true,
                    preserveComments: 'some',
                    sourceMap: '../../js/jcore.min.js.map',

                },
                files: {
                    '../../js/jcore.min.js': ['<%= pkg.corejs %>']
                }
            }

        },
        dojo: {
            dist: {
                options: {
                    releaseDir: '../../../js'
                }
            },
            options: {
                
                profile: 'dws.profile.js',
                dojo: 'dojoconfig.js',
                load: 'build',
                cwd: './',
                basePath: './js/'
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

    //////////////////////////////////////////////////////////
    //// main build, must have dist built
    //////////////////////////////////////////////////////////
    grunt.registerTask('build', function () {
        grunt.task.run('dist');

        //grunt.task.run('clean:wwwroot');
        grunt.config('clean.any.src', ['../../css/*.css', '../../js/**', '!../../css/images', '!../../images', '!../../fonts']);
        grunt.task.run('clean:any');
        

        grunt.task.run('cssmin:wwwroot');
        grunt.task.run('uglify:header');
        grunt.task.run('uglify:jcore');
        grunt.task.run('copy:pdfworkerdeploy');
       
        grunt.task.run('dws-dojo-js');

        //// fonts and images
        //    grunt.task.run('copy:fonts');
        //    grunt.task.run('copy:images');

    });

    grunt.registerTask('dist', function () {
        grunt.task.run('dist-css');
        grunt.task.run('dist-js');
        

        //// fonts and images
        //    grunt.task.run('copy:fonts');
        //    grunt.task.run('copy:images');

    });

    grunt.registerTask('dist-css', function () {
        grunt.task.run('theme');
        grunt.task.run('videojs-css');
        grunt.task.run('esri-css');
        grunt.task.run('copy:jqueryuicss');
    });

    //////////////////////////////////////////////////////////
    //// deal with the javascript, don't use VS bundle-minify'
    //////////////////////////////////////////////////////////
    grunt.registerTask('dist-js', function () {
        grunt.task.run('clean:distjs');
        grunt.task.run('concat:header');
        grunt.task.run('concat:jcore');
        grunt.task.run('copy:pdfworker');
    });


    //////////////////////////////////////////////////////////
    //// deal with the videojs css seperately, don't build with site!
    //////////////////////////////////////////////////////////
    grunt.registerTask('videojs-css', function (files) {
        var scssSrc = './node_modules/video.js/src/css/video-js.scss';
        var scssDest = './dist/css/video-js.css';

        grunt.config('sass.dist', { src: scssSrc, dest: scssDest });
        grunt.config('sass.options.precision', 10);
        grunt.config('sass.options.unix-newlines', true);

        grunt.task.run('sass');

        grunt.config('postcss.dist.src', scssDest);
        grunt.task.run('postcss');
    });

    //////////////////////////////////////////////////////////
    //// deal with the esri  css seperately, don't build with site!
    //////////////////////////////////////////////////////////
    grunt.registerTask('esri-css', function (files) {
        var scssSrc = './node_modules/arcgis-js-api/themes/light/main.scss';
        var scssDest = './dist/css/esri.css';

        grunt.config('clean.any.src', scssDest);
        grunt.task.run('clean:any');

        grunt.config('sass.dist', { src: scssSrc, dest: scssDest });
        //grunt.config('sass.options.outputStyle:', 'compressed');
        //grunt.config('sass.options.precision', 10);
        //grunt.config('sass.options.unix-newlines', true);
        
        //grunt.config('sass.dist.files.expand', true);
        //grunt.config('sass.dist.files.src', scssSrc);
        //grunt.config('sass.dist.files.ext', '.css');
        

        
        grunt.task.run('sass');

        grunt.config('postcss.dist.src', scssDest);
        grunt.task.run('postcss');

        // copy dijit.css basic components
        grunt.task.run('copy:dijit');

    });

    //////////////////////////////////////////////////////////
    //// Build ESRI dojo loader
    //////////////////////////////////////////////////////////
    grunt.registerTask('dws-dojo-js', function () {
        grunt.config('clean.any.src', ['../../js/*']);
        grunt.task.run('clean:any');
        grunt.task.run('dojo');
        grunt.config('clean.any.src', ['../../js/**/*.uncompressed.js']);
        grunt.task.run('clean:any');

        //grunt.task.run('copy:dwsjs');
    });


    //////////////////////////////////////////////////////////
    //// builds ALL themes and js, long running
    //////////////////////////////////////////////////////////
    //grunt.registerTask('dist-all', function () {
    //    grunt.task.run('theme');     
    //    
    //    grunt.task.run('js');
    //});

    //////////////////////////////////////////////////////////
    /// Builds default bootstrap and cerulean themes
    /////////////////////////////////////////////////////////
    grunt.registerTask('theme', 'Build default and cerulean theme', function () {
        grunt.task.run('buildtheme:default');
        //grunt.task.run('buildtheme:cerulean');
    });

    //////////////////////////////////////////////////////////////////////////////////////////
    //// Builds project scss dist, with all themes - Long running, only build manually
    /////////////////////////////////////////////////////////////////////////////////////////
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

    ////////////////////////////////////////////////////////////////////////////////////////
    // Main build process for each theme.
    ///////////////////////////////////////////////////////////////////////////////////////
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
            grunt.config('concat.theme', { src: concatSrc, dest: concatDest });
            grunt.task.run('concat:theme');
        }

        //dist = { src: scssSrc, dest: scssDest };
        grunt.config('sass.options.precision', 10);
        grunt.config('sass.options.unix-newlines', true);
        grunt.config('sass.dist', { src: scssSrc, dest: scssDest });
        grunt.task.run('sass');

        grunt.config('postcss.dist.src', scssDest);
        grunt.task.run('postcss');

        //grunt.config('cssmin.dist', {
        //    src: 'dist/css/' + theme + '.css',
        //    dest: '../../css/' + theme + '.min.css'
        //});
        //grunt.task.run('cssmin');

        //grunt.task.run(['sass:dist', 'prefix:' + scssDest, 'clean:build',
        //    compress ? 'compress_scss:' + scssDest + ':' + '<%=builddir%>/' + theme + '/' + theme + '.css' : 'none']);
    });
};
