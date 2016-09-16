'use strict';

define([
  'jquery',
  'underscore',
  'backbone',
  'mustache',
  // 'text!templates/calendar-template.html',
  '../models/calendar-model'
  ], function ($, _, Backbone, Mustache, calModel) {
  var CalendarView = Backbone.View.extend({
    tagName:  'div',

    // Cache the template function for a single item.
    // calTemplate: Mustache.render('<h3>{{title}}</h3>', {title: 'More rendering stuff'}),

    // The TodoView listens for changes to its model, re-rendering. Since there's
    // a one-to-one correspondence between a **Todo** and a **TodoView** in this
    // app, we set a direct reference on the model for convenience.
    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
    },

    // Re-render the contents of the todo item.
    // render: function() {
    //   this.$el.html(Mustache.render('<h4>{{title}}</h4>', {title: 'Hello from calendar-view'}));
    //   return this;
    // }
  });

  return CalendarView;
});