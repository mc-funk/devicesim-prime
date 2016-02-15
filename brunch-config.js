exports.config = {
    // See http://brunch.io/#documentation for docs.
    /*
    Brunch will ignore files starting with an underscore by default.
    But if you don't want to use that convention for your tests, then you can
    uncomment the below.
    conventions: ignored: /.+\.spec\.js/
    */
    server: {
      port: 3000
    },
    overrides: {
        production: {
            optimize: false,
            sourceMaps: false
        }
    },

    modules: {
        autoRequire: {
            'js/app.js': ['js/app.module']
        }
    },

    npm: {
        enabled: false
    },

    conventions: {
        assets: /^(app\/assets)/
    },

    paths: {
        watched: [
            'app'
        ],

        public: 'public'
    },

    // Only need to explicitly set the hint pattern if using auto-reload
    plugins: {
        jshint: {
            pattern: /^app\/js\/.*\.js$/
        },
        babel: {
            presets: ['es2015'],
            ignore: [/app\/vendor/, /node_modules/]
        },
        concatenate: {
            files: {
                'public/devices.json': {
                    type: 'json',
                    sources: [
                        'public/devices/1.json',
                        'public/devices/2.json',
                        'public/devices/3.json',
                        'public/devices/4.json',
                        'public/devices/5.json',
                        'public/devices/6.json',
                        'public/devices/7.json',
                        'public/devices/8.json',
                        'public/devices/9.json',
                        'public/devices/10.json'
                    ]
                },
                'public/rules.json': {
                    type: 'json',
                    sources: [
                        'public/rules/1.json',
                        'public/rules/2.json',
                    ]
                },
                'public/alerts.json': {
                    type: 'json',
                    sources: [
                        'public/alerts/1.json',
                        'public/alerts/2.json',
                        'public/alerts/3.json',
                        'public/alerts/4.json',
                        'public/alerts/5.json'
                    ]
                }

            }
        }
    },

    files: {
        javascripts: {
            joinTo: {
                'js/app.js': [
                    'app/vendor/**/*.js',
                    'app/js/**/*.js'
                ]
            },
            order: {
                before: [
                    "app/vendor/angular.js",
                    "app/vendor/angular-ui-router.js",
                    "app/vendor/angular-animate.js",
                    "app/vendor/angular-aria.js",
                    "app/vendor/angular-material.js",
                    "app/vendor/angular-resource.js",
                    "app/vendor/lodash.js",
                    "app/vendor/moment.min.js",
                    "app/vendor/d3.js",
                    "app/vendor/c3.js"
                ]
            }
        },
        stylesheets: {
            joinTo: {
                'css/app.css': [
                    'app/vendor/**/*.css',
                    'app/styles/*.*',
                    'app/js/**/*.{css,scss}'
                ]
            }
        },
        templates: {
            joinTo: 'js/templates.js'
        }
    }
};
