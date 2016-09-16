define(function (require) {
  'use strict';

  var $ = require('jquery'),
    _ = require('underscore'),
    Backbone = require('backbone'),
    Mustache = require('mustache'),
    CalendarModel = require('models/calendar-model'),
    calTpl = require('text!templates/calendar-template.html');

  var cModel = new CalendarModel();
  var AppView = Backbone.View.extend({
    el: '#app-view',
    template: Mustache.to_html( calTpl, cModel.attributes ),
    // template: Mustache.to_html( appTpl, {message: 'Hello there Christine!'} ),
    render: function () {
      this.$el.html( this.template );
      return this;
    }
  });

  return AppView;
});