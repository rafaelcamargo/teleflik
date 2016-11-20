var fs = require('fs');
var project = JSON.parse(fs.readFileSync('./project.json', 'utf8'));
var config = {
  'jshint': {
    source: project.paths.scripts.source.files
  },
  'concat': {
    source: {
      options: {
        sourceMap: true
      },
      src: [
        project.paths.templates.dist.bundle,
        project.paths.scripts.source.files
      ],
      dest: project.paths.scripts.dist.bundle
    },
    vendor: {
      src: project.paths.scripts.vendor.files,
      dest: project.paths.scripts.dist.vendor.bundle
    }
  },
  'stylus': {
    source: {
      files: {
        [project.paths.styles.dist.bundle]: project.paths.styles.source.files
      }
    }
  },
  'cssmin': {
    bundle: {
      files: {
        [project.paths.styles.dist.bundle]: project.paths.styles.dist.bundle
      }
    },
    vendor: {
      files: {
        [project.paths.styles.dist.vendor.bundle]: project.paths.styles.vendor.files
      }
    }
  },
  'imagemin': {
    source: {
      files: [{
        expand: true,
        cwd: project.paths.images.source.root,
        src: [project.paths.images.source.files],
        dest: project.paths.images.dist.root
      }]
    }
  },
  'copy': {
    manifest: {
      src: project.paths.manifest.source,
      dest: project.paths.manifest.dist
    },
    fonts: {
      expand: true,
      flatten: true,
      src: project.paths.fonts.source.files,
      dest: project.paths.fonts.dist.root
    },
    vendorFonts: {
      expand: true,
      flatten: true,
      src: project.paths.fonts.vendor.files,
      dest: project.paths.fonts.dist.vendor.root
    },
    worker: {
      src: project.paths.worker.source,
      dest: project.paths.worker.dist
    }
  },
  'replace': {
    appIndex: {
      options: {
        patterns: [{match: 'distFilesPath/', replacement: ''}]
      },
      files: [{
        expand: true,
        flatten: true,
        src: [project.paths.index.app.source],
        dest: project.paths.index.app.dest
      }]
    },
    webIndex: {
      options: {
        patterns: [{match: 'distFilesPath/', replacement: 'www/'}]
      },
      files: [{
        expand: true,
        flatten: true,
        src: [project.paths.index.web.source],
        dest: project.paths.index.web.dest
      }]
    }
  },
  'karma': {
    unit: {
      configFile: project.paths.scripts.spec.config
    }
  },
  'http-server': {
    dev: project.server.dev
  },
  'html2js': {
    options: {
      module: project.paths.templates.dist.moduleName,
      rename: function(pathname){
        return pathname.replace('scripts/','');
      }
    },
    source: {
      src: [project.paths.templates.source.files],
      dest: project.paths.templates.dist.bundle,
    }
  },
  'watch': {
    scripts: {
      files: project.paths.scripts.source.files,
      tasks: ['jshint', 'concat:source']
    },
    styles: {
      files: project.paths.styles.source.files,
      tasks: ['stylus']
    },
    copy: {
      files: [
        project.paths.manifest.source,
        project.paths.fonts.source.files,
        project.paths.fonts.vendor.files,
        project.paths.worker.source
      ],
      tasks: ['copy']
    },
    replace: {
      files: project.paths.index.app.source,
      tasks: ['replace']
    }
  }
};

module.exports = function(grunt){
  require('load-grunt-tasks')(grunt);
  grunt.initConfig(config);
  grunt.registerTask('build', [
    'copy',
    'replace',
    'html2js',
    'jshint',
    'concat',
    'stylus',
    'cssmin',
    'imagemin'
  ]);
  grunt.registerTask('start', [
    'build',
    'http-server',
    'watch'
  ]);
};
