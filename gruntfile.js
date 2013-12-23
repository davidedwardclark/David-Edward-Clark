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
            css: {
                options: {},
                src: [
                    'build/css/screen.css'
                ],
                dest: 'build/**/*.html'
            },
            images: {
                options: {},
                src: [
                    'build/img/**/*.{png,jpg,gif}'
                ],
                dest: 'build/**/*.html'
            }
        },

        // Deploy to S3
        aws: grunt.file.readJSON(process.env.HOME+'/.grunt_aws'),
        s3: {
            options: {
                key: '<%= aws.key %>',
                secret: '<%= aws.secret %>',
                bucket: 'www.davidedwardclark.com',
                access: 'public-read'
            },
            dev: {
                options: {
                    maxOperations: 20
                },
                sync: [
                    {
                        options: {
                            verify: true,
                            headers: {
                                "Content-Type": "image/x-icon",
                                "Cache-Control": "max-age=630720000, public",
                                "Expires": new Date(Date.now() + 63072000000).toUTCString()
                            }
                        },
                        src: '*.ico',
                        dest: ''
                    },
                    {
                        options: {
                            verify: true,
                            gzip: true,
                            headers: {
                                "Content-Encoding": "gzip",
                                "Content-Type": "text/html",
                                "Cache-Control": "no-cache, no-store, max-age=0, must-revalidate",
                                "Expires": "Fri, 01 Jan 1990 00:00:00 GMT"
                            }
                        },
                        src: 'build/*.html',
                        dest: ''
                    },
                    {
                        options: {
                            verify: true,
                            gzip: true,
                            headers: {
                                "Content-Encoding": "gzip",
                                "Content-Type": "text/html",
                                "Cache-Control": "no-cache, no-store, max-age=0, must-revalidate",
                                "Expires": "Fri, 01 Jan 1990 00:00:00 GMT"
                            }
                        },
                        src: 'build/about/*.html',
                        dest: 'about/'
                    },
                    {
                        options: {
                            verify: true,
                            gzip: true,
                            headers: {
                                "Content-Encoding": "gzip",
                                "Content-Type": "text/html",
                                "Cache-Control": "no-cache, no-store, max-age=0, must-revalidate",
                                "Expires": "Fri, 01 Jan 1990 00:00:00 GMT"
                            }
                        },
                        src: 'build/library/*.html',
                        dest: 'library/'
                    },
                    {
                        options: {
                            verify: true,
                            gzip: true,
                            headers: {
                                "Content-Encoding": "gzip",
                                "Content-Type": "text/html",
                                "Cache-Control": "no-cache, no-store, max-age=0, must-revalidate",
                                "Expires": "Fri, 01 Jan 1990 00:00:00 GMT"
                            }
                        },
                        src: 'build/projects/*.html',
                        dest: 'projects/'
                    },
                    {
                        options: {
                            verify: true,
                            gzip: true,
                            headers: {
                                "Content-Encoding": "gzip",
                                "Content-Type": "text/html",
                                "Cache-Control": "max-age=630720000, public",
                                "Expires": new Date(Date.now() + 63072000000).toUTCString()
                            }
                        },
                        src: 'projects/epicureslider/*.html',
                        dest: 'projects/epicureslider/'
                    },
                    {
                        options: {
                            verify: true,
                            gzip: true,
                            headers: {
                                "Content-Encoding": "gzip",
                                "Content-Type": "text/css",
                                "Cache-Control": "max-age=630720000, public",
                                "Expires": new Date(Date.now() + 63072000000).toUTCString()
                            }
                        },
                        src: 'projects/epicureslider/css/*.css',
                        dest: 'projects/epicureslider/css/'
                    },
                    {
                        options: {
                            verify: true,
                            headers: {
                                "Cache-Control": "max-age=630720000, public",
                                "Expires": new Date(Date.now() + 63072000000).toUTCString()
                            }
                        },
                        src: 'projects/epicureslider/img/**/*',
                        dest: 'projects/epicureslider/img/',
                        rel: 'projects/epicureslider/img/'
                    },
                    {
                        options: {
                            verify: true,
                            gzip: true,
                            headers: {
                                "Content-Encoding": "gzip",
                                "Content-Type": "application/javascript",
                                "Cache-Control": "max-age=630720000, public",
                                "Expires": new Date(Date.now() + 63072000000).toUTCString()
                            }
                        },
                        src: 'projects/epicureslider/js/**/*',
                        dest: 'projects/epicureslider/js/',
                        rel: 'projects/epicureslider/js/'
                    },
                    {
                        options: {
                            verify: true,
                            gzip: true,
                            headers: {
                                "Content-Encoding": "gzip",
                                "Content-Type": "text/html",
                                "Cache-Control": "max-age=630720000, public",
                                "Expires": new Date(Date.now() + 63072000000).toUTCString()
                            }
                        },
                        src: 'projects/thehub/*.html',
                        dest: 'projects/thehub/'
                    },
                    {
                        options: {
                            verify: true,
                            gzip: true,
                            headers: {
                                "Content-Encoding": "gzip",
                                "Content-Type": "text/css",
                                "Cache-Control": "max-age=630720000, public",
                                "Expires": new Date(Date.now() + 63072000000).toUTCString()
                            }
                        },
                        src: 'projects/thehub/css/*.css',
                        dest: 'projects/thehub/css/'
                    },
                    {
                        options: {
                            verify: true,
                            headers: {
                                "Cache-Control": "max-age=630720000, public",
                                "Expires": new Date(Date.now() + 63072000000).toUTCString()
                            }
                        },
                        src: 'projects/thehub/img/**/*',
                        dest: 'projects/thehub/img/',
                        rel: 'projects/thehub/img/'
                    },
                    {
                        options: {
                            verify: true,
                            gzip: true,
                            headers: {
                                "Content-Encoding": "gzip",
                                "Content-Type": "application/javascript",
                                "Cache-Control": "max-age=630720000, public",
                                "Expires": new Date(Date.now() + 63072000000).toUTCString()
                            }
                        },
                        src: 'projects/thehub/js/*.js',
                        dest: 'projects/thehub/js/'
                    },
                    {
                        options: {
                            verify: true,
                            headers: {
                                "Cache-Control": "max-age=630720000, public",
                                "Expires": new Date(Date.now() + 63072000000).toUTCString()
                            }
                        },
                        src: 'build/img/**/*',
                        dest: 'img/',
                        rel: 'build/img/'
                    },
                    {
                        options: {
                            verify: true,
                            gzip: true,
                            headers: {
                                "Content-Encoding": "gzip",
                                "Content-Type": "text/css",
                                "Cache-Control": "max-age=630720000, public",
                                "Expires": new Date(Date.now() + 63072000000).toUTCString()
                            }
                        },
                        src: 'build/css/*.css',
                        dest: 'css/'
                    },
                    {
                        options: {
                            verify: true,
                            gzip: true,
                            headers: {
                                "Content-Encoding": "gzip",
                                "Content-Type": "application/javascript",
                                "Cache-Control": "max-age=630720000, public",
                                "Expires": new Date(Date.now() + 63072000000).toUTCString()
                            }
                        },
                        src: 'build/js/*.js',
                        dest: 'js/'
                    }
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
    grunt.loadNpmTasks('grunt-s3');
    grunt.loadNpmTasks('grunt-contrib-clean');

    // On run
    grunt.registerTask('default', ['copy', 'cssmin', 'concat', 'uglify', 'imagemin', 'hashres', 's3', 'clean']);

};