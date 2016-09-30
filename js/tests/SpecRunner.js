require.config({
  baseUrl: "../libs/",
  paths: {
    jquery: 'jquery',
    underscore: 'underscore',
    backbone: 'backbone',
    jasmine: '../tests/jasmine/jasmine',
    'jasmine-html': '../tests/jasmine/jasmine-html',
    'jasmine-boot': '../tests/jasmine/boot',
    spec: '../tests/spec'
  },
  shim: {
    underscore: {
      exports: "_"
    },
    backbone: {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    'jasmine-html': {
      deps: [ 'jasmine' ],
    },
    'jasmine-boot': {
      deps: ['jasmine','jasmine-html']
    }
  }
});

require(['jasmine-boot'],function () {
  require(['spec/calendar-model.spec.js'], function () {
    window.onload();
  })
})