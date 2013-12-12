module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Concatenate
        concat: {
            dist: {
                src: [
                    'js/*.js'
                ],
                dest: 'build/js/production.js'
            }
        },

        // Minify
        uglify: {
            build: {
                src: 'build/js/production.js',
                dest: 'build/js/production.min.js'
            }
        }

    });

    // Plugins
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // On run
    grunt.registerTask('default', ['concat', 'uglify']);

};