define(function (require) {
  'use strict';

  var $ = require('jquery'),
    _ = require('underscore'),
    Backbone = require('backbone'),
    Mustache = require('mustache'),
    CalendarView = require('views/calendar-view'),
    CalendarModel = require( 'models/calendar-model'),
    AppTpl = require('text!templates/app-template.html');

  var cModel = new CalendarModel(),
    cView = new CalendarView( {model: cModel} );

  var AppView = Backbone.View.extend({
    el: '#app-view',
    template: Mustache.render( AppTpl ),
    render: function () {
      this.$el.html( this.template );
      this.$el.append( cView.render().el )

      return this;
    }
  });

  return AppView;
});