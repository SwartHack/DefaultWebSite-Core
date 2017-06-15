module.exports = function (grunt) {
    'use strict'
    
    // Force use of Unix newlines
    grunt.util.linefeed = '\n'
    RegExp.quote = function (string) {
        return string.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&')
    }

    //var path = require('path')
    //var configBridge = grunt.file.readJSON('./grunt/configBridge.json', { encoding: 'utf8' });

    require('load-grunt-tasks')(grunt, { scope: 'devDependencies' });
    require('time-grunt')(grunt);

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        builddir: '.',
        buildtheme: '',
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
        sass: {
            dist: {
                options: {
                  
                },
                files: {
                    'dist/css/defaultwebsite.css': [ 'sass/defaultwebsite.sass' ]
                }
            }
        }
    });

    grunt.registerTask('none', function () { });
    grunt.registerTask('default', 'sass');

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
        scssSrc = concatDest;
      
        if (theme == 'default') {
            scssSrc = 'scss/defaultwebsite.scss'
        }
        scssDest = '<%=cssdist%>/' + theme + '/' + theme + '.css';

        dist = { src: concatSrc, dest: concatDest };
        grunt.config('concat.dist', dist);
        files = {};
        files[scssDest] = scssSrc;
        grunt.config('sass.dist.files', files);
        grunt.config('sass.dist.options.precision', 8);
        grunt.config('sass.dist.options.unix-newlines', true);

        if (theme != 'default') {
            grunt.task.run('concat');
        }

        grunt.task.run('sass');

        //grunt.task.run(['sass:dist', 'prefix:' + scssDest, 'clean:build',
        //    compress ? 'compress_scss:' + scssDest + ':' + '<%=builddir%>/' + theme + '/' + theme + '.css' : 'none']);
    });

    grunt.registerTask('prefix', 'autoprefix a generic css', function (fileSrc) {
        grunt.config('autoprefixer.dist.src', fileSrc);
        grunt.task.run('autoprefixer');
    });

    grunt.registerTask('compress', 'compress a generic css', function (fileSrc, fileDst) {
        var files = {}; files[fileDst] = fileSrc;
        grunt.log.writeln('compressing file ' + fileSrc);

        grunt.config('less.dist.files', files);
        grunt.config('less.dist.options.compress', true);
        grunt.task.run(['less:dist']);
    });

    grunt.registerTask('compress_scss', 'compress a generic css with sass', function (fileSrc, fileDst) {
        var files = {}; files[fileDst] = fileSrc;
        grunt.log.writeln('compressing file ' + fileSrc);

        grunt.config('sass.dist.files', files);
        grunt.config('sass.dist.options.style', 'compressed');
        grunt.task.run(['sass:dist']);
    });

  

    grunt.event.on('watch', function (action, filepath) {
        var path = require('path');
        var theme = path.dirname(filepath);
        grunt.config('buildtheme', theme);
    });

    /**
    * Regex borrowed form
    * https://gist.github.com/rosskevin/ddfe895091de2ca5f931
    * */
    grunt.registerTask('convert_less', 'Convert less to scss using regular expression', function (theme) {
        var convertBaseDir = '';
        grunt.file.expand(convertBaseDir + (theme ? ('*' + theme) : '*') + '/*.less').forEach(function (lessFile) {
            if (lessFile !== "global/build.less") {
                var srcContents = grunt.file.read(lessFile);
                var out = srcContents
                    // 1.  replace @ with $
                    .replace(/@(?!import|media|keyframes|-)/g, '$')
                    // 2.  replace mixins
                    .replace(/[\.#](?![0-9])([\w\-]*)\s*\((.*)\)\s*\{/g, '@mixin $1($2){')
                    // 3.  In LESS, bootstrap namespaces mixins, in SASS they are just prefixed e.g #gradient > .vertical-three-colors becomes @include gradient-vertical-three-colors
                    .replace(/[\.#](?![0-9])([\w\-]*)\s>\s\.(.*;)/g, '@include $1-$2')
                    // 4.  replace includes
                    .replace(/[\.#](?![0-9])([\w\-].*\(.*;)/g, '@include $1')
                    // 5.  replace no param mixin includes with empty parens
                    .replace(/@include\s([\w\-]*\s*);/g, '@include $1();')
                    // 6.  replace extends .class; @extend .class;
                    .replace(/(\.(?![0-9])([\w\-]+);)/g, '@extend $1')
                    // 7.  replace string literals
                    .replace(/~"(.*)"/g, '#{"$1"}')
                    // 8.  replace interpolation  ${var} > #{$var} 
                    .replace(/\$\{(.*)\}/g, '#{$$$1}')
                    // 9.  replace spin to adjust-hue (function name diff)
                    .replace(/spin\(/g, 'adjust-hue(')
                    // 10. replace bower and imports in build.scss
                    .replace(/bootstrap\/less\//g, 'bootstrap-sass-official/assets/stylesheets/')
                    .replace(/\.less/g, '')
                    // 11. replace icon-font-path value with conditional for asset helpers
                    .replace(/(\$icon-font-path:).*;/g, '$1 if($bootstrap-sass-asset-helper, "bootstrap/", "../fonts/bootstrap/");')
                    // 12. set bootswatch's web-font-path value as !default
                    .replace(/(\$web-font-path:.*);/g, '$1 !default;')
                    // 13. Remove the web-font mixin which breaks in libsass
                    .replace(/[\s\S][\s\S]@mixin web-font.*([\s\S]*?).*;([\s\S]*?)}([\s\S]*?)/, "")
                    // 14. Replace usage of the web-font mixin with variable interpolation
                    .replace(/@include web-font/, '@import url');

                if (/\/variables.less$/.test(lessFile)) {
                    // 15. set default value of $bootstrap-sass-asset-helper to false
                    out = "$bootstrap-sass-asset-helper: false;\n" + out;
                    // 16. only assign variables if they haven't been previously set e.g. $var: #f00; > $var: #f00 !default;
                    out = out.replace(/^(\$.*);/gm, '$1 !default;');
                }

                var baseDirRegex = new RegExp("^" + convertBaseDir, "g");
                var sassFile = lessFile.replace(baseDirRegex, '').replace(/\.less$/, '.scss').replace(/(bootswatch|variables)/, '_$1');
                grunt.file.write(sassFile, out);
                grunt.log.writeln('Converted less file:  ', lessFile, Array(27 - lessFile.length).join(' '), '> ', sassFile);
            }
        });
    });

    grunt.registerTask('server', 'connect:keepalive');

    
};
