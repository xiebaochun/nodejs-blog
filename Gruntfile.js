// Gruntfile with the configuration of grunt-express and grunt-open. No livereload yet!
module.exports = function(grunt) {
 
  // Load Grunt tasks declared in the package.json file
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  var path = require("path");
  // Configure Grunt 
  grunt.initConfig({
 
    // grunt-express will serve the files from the folders listed in `bases`
    // on specified `port` and `hostname`
    // express: {
    //   all: {
    //     options: {
    //       port: 9000,
    //       hostname: "0.0.0.0",
    //       bases: [__dirname+"/dist"], // Replace with the directory you want the files served from
    //                           // Make sure you don't use `.` or `..` in the path as Express
    //                           // is likely to return 403 Forbidden responses if you do
    //                           // http://stackoverflow.com/questions/14594121/express-res-sendfile-throwing-forbidden-error
    //       livereload: true
    //     }
    //   }
    // },

    // express: {
    //   custom: {
    //     options: {
    //       port: 3000,
    //       hostname: "0.0.0.0",
    //       bases: [__dirname],
    //       server: path.resolve('./index'),
    //       //livereload: true,
    //       //serverreload: true,
    //     }
    //   }
    // },
    concurrent: {
      task: ["nodemon","open","watch"],
      options: {
        logConcurrentOutput: true
      }
    },

    nodemon: {
      dev: {
        script: 'app.js',
        options: {
          args: [],
          ignoredFiles: ['README.md', 'node_modules/**'],
          ext: 'js',
          watch: ['./'],
          debug: true,
          delay: 1000,
          env: {
            PORT: 3000
          },
          cwd: __dirname
        }
      }
    },
    // grunt-watch will monitor the projects files
    watch: {
      all: {
        // Replace with whatever file you want to trigger the update from
        // Either as a String for a single entry 
        // or an Array of String for multiple entries
        // You can use globing patterns like `css/**/*.css`
        // See https://github.com/gruntjs/grunt-contrib-watch#files
        files: ['assets/css/**/*.css','app/views/*.html',"*.js"],
        //tasks: ["less:dev"],
        options: {
          livereload: true
        }
      }
    },
 
    // grunt-open will open your browser at the project's URL
    open: {
      all: {
        // Gets the port from the connect configuration
        path: 'http://localhost:<%= nodemon.dev.options.env.PORT%>'
      }
    },

    execute: {
      target:{
        src: ['./index.js']
      }
    },

    less: {
      dev: {
        options: {
          paths: ["assets/css"]
        },
        files: {
          "assets/css/common/header.css": "assets/css/common/header.less",
          "dist/assets/css/common/header.css": "assets/css/common/header.less",
          "assets/css/common/content.css": "assets/css/common/content.less",
          "dist/assets/css/common/content.css": "assets/css/common/content.less"
        }
      },
      production: {
        options: {
          paths: ["assets/css"],
        },
        files: {
          "path/to/result.css": "path/to/source.less"
        }
      }
    }

  });
  
  
  grunt.loadNpmTasks('grunt-express')
  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-open')
  grunt.loadNpmTasks('grunt-execute')
  grunt.loadNpmTasks('grunt-contrib-less')
  grunt.loadNpmTasks('grunt-nodemon')
  grunt.loadNpmTasks('grunt-concurrent')
  // Creates the `server` task
  grunt.registerTask('server', ['concurrent']);
};