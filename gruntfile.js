// **********************

// TEMP
// To do:
// 1. Make sure build script works and files upload: https://github.com/MathieuLoutre/grunt-aws-s3
// 2. Add gziping with grunt-contrib-compress: https://github.com/gruntjs/grunt-contrib-compress

// **********************





module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Copy HTML files into the build except for micro sites
        copy: {
            main: {
                files: [
                    {expand: true, src: ['*.html'], dest: 'build/'},
                    {expand: true, src: ['about/*.html'], dest: 'build/'},
                    {expand: true, src: ['library/*.html'], dest: 'build/'},
                    {expand: true, src: ['projects/*.html'], dest: 'build/'},
                ]
            }
        },

        // CSS Concatenate & Minify
        cssmin: {
            combine: {
                files: {
                    'build/css/screen.css': ['css/screen.css']
                }
            }
        },

        // JS Concatenate & Minify
        concat: {
            dist: {
                src: [
                    'js/*.js'
                ],
                dest: 'build/js/modernizr-2.6.2.js'
            }
        },
        uglify: {
            build: {
                src: 'build/js/*.js',
                dest: 'build/js/modernizr-2.6.2.js'
            }
        },

        // Image Optimization
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'img/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'build/img'
                }]
            }
        },

        // Cache Bust
        hashres: {
            options: {
                encoding: 'utf8',
                fileNameFormat: '${name}.${hash}.cache.${ext}',
                renameFiles: true
            },
            images: {
                options: {},
                src: [
                    'build/img/**/*.{png,jpg,gif}'
                ],
                dest: ['build/**/*.html', 'build/css/screen.css']
            },
            css: {
                options: {},
                src: [
                    'build/css/screen.css'
                ],
                dest: 'build/**/*.html'
            }
        },

        // Deploy to S3
        aws: grunt.file.readJSON(process.env.HOME+'/.grunt_aws'),
        aws_s3: {
            options: {
                accessKeyId: '<%= aws.key %>',
                secretAccessKey: '<%= aws.secret %>',
                region: 'us-east-1', // http://docs.aws.amazon.com/general/latest/gr/rande.html#s3_region
                uploadConcurrency: 5, // 5 simultaneous uploads
                downloadConcurrency: 5 // 5 simultaneous downloads
            },
            production: {
                options: {
                    bucket: 'www.davidedwardclark.com',
                },
                files: [
                    {expand: true, cwd: '/', src: ['*.ico'], dest: '/', params: {
                        ContentType: 'image/x-icon',
                        CacheControl: 'max-age=630720000, public'
                    }},
                    {expand: true, cwd: '/build/', src: ['*.html'], dest: '/', params: {
                        ContentType: 'text/html',
                        CacheControl: 'no-cache, no-store, max-age=0, must-revalidate'
                    }},
                    {expand: true, cwd: '/build/', src: ['*.html'], dest: '/', params: {
                        ContentType: 'text/html',
                        CacheControl: 'no-cache, no-store, max-age=0, must-revalidate'
                    }},
                    {expand: true, cwd: '/build/about/', src: ['*.html'], dest: '/about/', params: {
                        ContentType: 'text/html',
                        CacheControl: 'no-cache, no-store, max-age=0, must-revalidate'
                    }},
                    {expand: true, cwd: '/build/library/', src: ['*.html'], dest: '/library/', params: {
                        ContentType: 'text/html',
                        CacheControl: 'no-cache, no-store, max-age=0, must-revalidate'
                    }},
                    {expand: true, cwd: '/build/projects/', src: ['*.html'], dest: '/projects/', params: {
                        ContentType: 'text/html',
                        CacheControl: 'no-cache, no-store, max-age=0, must-revalidate'
                    }},
                    {expand: true, cwd: '/projects/epicureslider/', src: ['*.html'], dest: '/projects/epicureslider/', params: {
                        ContentType: 'text/html',
                        CacheControl: 'max-age=630720000, public'
                    }},
                    {expand: true, cwd: '/projects/epicureslider/css/', src: ['*.css'], dest: '/projects/epicureslider/css/', params: {
                        ContentType: 'text/html',
                        CacheControl: 'max-age=630720000, public'
                    }},
                    {expand: true, cwd: '/projects/epicureslider/img/', src: ['**/*'], dest: '/projects/epicureslider/img/', params: {
                        ContentType: 'text/html',
                        CacheControl: 'max-age=630720000, public'
                    }},
                    {expand: true, cwd: '/projects/epicureslider/js/', src: ['**/*'], dest: '/projects/epicureslider/js/', params: {
                        ContentType: 'application/javascript',
                        CacheControl: 'max-age=630720000, public'
                    }},
                    {expand: true, cwd: '/projects/thehub/', src: ['*.html'], dest: '/projects/thehub/', params: {
                        ContentType: 'text/html',
                        CacheControl: 'max-age=630720000, public'
                    }},
                    {expand: true, cwd: '/projects/thehub/css/', src: ['*.css'], dest: '/projects/thehub/css/', params: {
                        ContentType: 'text/html',
                        CacheControl: 'max-age=630720000, public'
                    }},
                    {expand: true, cwd: '/projects/thehub/img/', src: ['**/*'], dest: '/projects/thehub/img/', params: {
                        CacheControl: 'max-age=630720000, public'
                    }},
                    {expand: true, cwd: '/projects/thehub/js/', src: ['*.js'], dest: '/projects/thehub/js/', params: {
                        ContentType: 'application/javascript',
                        CacheControl: 'max-age=630720000, public'
                    }},
                    {expand: true, cwd: '/build/img/', src: ['**/*'], dest: '/img/', params: {
                        CacheControl: 'max-age=630720000, public'
                    }},
                    {expand: true, cwd: '/build/css/', src: ['*.css'], dest: '/css/', params: {
                        ContentType: 'text/html',
                        CacheControl: 'max-age=630720000, public'
                    }},
                    {expand: true, cwd: '/build/js/', src: ['*.js'], dest: '/js/', params: {
                        ContentType: 'application/javascript',
                        CacheControl: 'max-age=630720000, public'
                    }}
                ]
            }
        },
        clean: ['build']
    });

    // Plugins
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-hashres');
    grunt.loadNpmTasks('grunt-aws-s3');
    grunt.loadNpmTasks('grunt-contrib-clean');

    // On run
    grunt.registerTask('default', ['copy', 'cssmin', 'concat', 'uglify', 'imagemin', 'hashres', 'aws_s3', 'clean']);

};