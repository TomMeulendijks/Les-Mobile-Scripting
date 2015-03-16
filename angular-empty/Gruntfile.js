module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    var config = {
        app: 'app',
        dist: 'dist'
    };
    grunt.loadNpmTasks('grunt-serve');
    grunt.loadNpmTasks('grunt-contrib-connect');
     grunt.loadNpmTasks('grunt-contrib-watch');
    
    grunt.initConfig({
        config: config,

        pkg: grunt.file.readJSON('package.json'),

        // Watch configuration
        // Define all the files that you need watched and which tasks to run on it
        watch: {
            sass: {
               files: ['<%= config.app %>/sass/{,*/}*.{scss,sass}'],
               tasks: 'compass:dev'
            },  
            livereload: {
                // Browser live reloading
                // https://github.com/gruntjs/grunt-contrib-watch#live-reloading
                options: {
                    livereload: true
                },
                files: [
                    'app/**'
                ]
            },
            options: {
                reload: true,
                livereload : true
            }
        },

        // Compiling sass. Different tasks for dist and dev.
        compass: {
            dev: {
                options: {
                   sassDir: '<%= config.app %>/sass/',
                   cssDir: '<%= config.app %>/css/',
                },
            },
            dist: {
                options: {
                   sassDir: '<%= config.app %>/sass/',
                   cssDir: '<%= config.dist %>/css/'
                },
            },
        },

        connect: {
             server: {
                    options:{
                    livereload: true,
                    port: 8000,
                    hostname: '*',
                    base: 'app/'
                    }
            }
        }
    });
  
    grunt.registerTask('serve', [
    'connect',
    'watch'
    ]);

    // grunt.registerTask('test', function (target){
    //     console.log('testing')
    //     if(target !== 'watch'){

    //     }
    //     grunt.task.run([
    //         'watch:sass'
    //     ]);
    //      grunt.task.run(['connect:server']);
    // });
    
    // grunt.registerTask('build',[
    //     'clean:dist',
    //     'compass:dist',
    //     'cssmin',
    //     'copy'
    // ]);
    // grunt.registerTask('default', [
    //     'test',
    //     'build'
    // ]);
};