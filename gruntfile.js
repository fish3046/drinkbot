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
                    targetDir: 'public/vendor'
                }
            }
        },

        // Used to copy files from the bower directory to our public/vendor when the grunt-bower-task can't
        // figure it out.
        // font-awesome:  needs to preserve the dir structure between css and fonts folders
        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        cwd: '<%=  config.bower_directory %>/font-awesome',
                        src: ['css/font-awesome.css', 'fonts/*'],
                        dest: 'public/vendor/font-awesome'
                    },
                    // bootstrap: preserve dir structure of css an fonts folders
                    {
                        expand: true,
                        cwd: '<%=  config.bower_directory %>/bootstrap/dist',
                        src: ['**/!(*min*|npm.js)'],
                        dest: 'public/vendor/bootstrap'
                    }
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
                        'public/vendor/jquery/jquery.js',
                        'public/vendor/angular/angular.js',
                        'public/vendor/**/*.js',

                        'public/app/js/app.js',
                        'public/app/js/**/*.js'
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

    // Runs bower install and copies everything to our public/vendor
    grunt.registerTask('bower-install', ['bower', 'copy']);

    // Compresses all js/css and prepares for production
    grunt.registerTask('default', ['uglify']);
};