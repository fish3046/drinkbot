module.exports = function (grunt)
{
    grunt.initConfig({
        // Collection of config variables to be referenced later in this script.
        config: {
            bower_directory: 'bower_components',
            unmanaged_directory: 'unmanaged_components',
            banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
        },

        // Metadata.
        pkg: grunt.file.readJSON('package.json'),

        // This does the bulk of the bower work.  This will run "bower install", and will copy all the
        // files defined as "main" in each package's json file into the target directory.  However, this
        // still fucks up some directory structures.  To disable the copying of certain files, use exportsOverride
        // in OUR bower.json
        bower: {
            install: {
                options: {
                    targetDir: 'public/js/vendor'
                }
            }
        },

        // Used to copy files from the bower directory to our public/js/vendor when the grunt-bower-task can't
        // figure it out.
        // font-awesome:  needs to preserve the dir structure between css and fonts folders
        // jquery.ui:     doesn't have a main specified in json, so need to choose which files we want
        // ng-flow:       use standalone as well
        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        cwd: '<%=  config.bower_directory %>/font-awesome',
                        src: ['css/font-awesome.css', 'fonts/*'],
                        dest: 'public/js/vendor/font-awesome'
                    },
                    // bootstrap: preserve dir structure of css an fonts folders
                    {
                        expand: true,
                        cwd: '<%=  config.bower_directory %>/bootstrap/dist',
                        src: ['**/!(*min*|npm.js)'],
                        dest: 'public/js/vendor/bootstrap'
                    },
                    // Moved to managed bower, now under angular-ui-bootstrap-bower package
                    //{
                    //      expand: true,
                    //      cwd: '<%=  config.unmanaged_directory %>/angular-ui-bootstrap',
                    //      //src: ['ui-bootstrap-tpls-0.11.0.js','ui-bootstrap-tpls-0.11.0.js'],
                    //      src: ['ui-bootstrap-tpls-0.12.0.min.js','ui-bootstrap-tpls-0.12.0.min.js'],
                    //      dest: 'public/js/vendor/angular-ui-bootstrap'
                    //}
                ]
            }
        },

        // Combine and minify javascript
        uglify: {
            options: {
                banner: '<%= config.banner %>',
                sourceMap: true,
                /*mangle: {
                 except: ['angular','jQuery','$','_']
                 }*/
                mangle: false
            },
            main: {
                files: {
                    'public/js/<%= pkg.name %>.min.js': [
                        'public/js/vendor/jquery/jquery.js',
                        'public/js/vendor/angular/angular.js',
                        //'public/js/vendor/angular-route/angular-route.js',
                        //'public/js/vendor/angular-animate/angular-animate.js',
                        'public/js/vendor/underscore/underscore.js',

                        'public/js/vendor/**/*.js',

                        'public/js/app/base/**/*.js',
                        'public/js/app/desktop/desktopApp.js',
                        'public/js/app/desktop/**/*.js',
                        'public/js/app/**/*.js',
                        'public/js/AjaxResponse.js',
                        'public/js/ValidationResponse.js'
                    ]
                }
            }
        },

        // Combine and minify CSS
        cssmin: {
            options: {
                banner: '<%= config.banner %>'
            },
            files: {
                'public/css/<%= pkg.name %>.min.css': [
                    //'public/css/slb/v3/custon.css',
                    //'public/css/slb/v3/font-awesome.css',
                    //'public/css/slb/v3/prettyPhoto.css',
                    //'public/css/slid.css',
                    //'public/css/checkout/ukcreditratings/index_slid_gen.css',
                    //'public/css/ppv.css',
                    //'public/css/slb/v3/default.css'
                ]
            }
        }

        // Updates the version_hash param using symfony's console command
        //shell: {
        //      genHash: {
        //              command: 'php app/console rate:updateversionhash'
        //      }
        //}

    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    //grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-bower-task');

    // Runs bower install and copies everything to our public/js/vendor
    grunt.registerTask('bower-install', ['bower', 'copy']);

    // Compresses all js/css and prepares for production
    grunt.registerTask('default', ['uglify']);
};