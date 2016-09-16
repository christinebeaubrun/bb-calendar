define(function(require) {
  'use strict';
  var Backbone = require('backbone');
  
  var CalendarModel = Backbone.Model.extend({

    // Default attributes for the todo.
    defaults: {
      // Ensure that each todo created has `content`.
      monthName: 'September',
      year: 2016
    }

  });
  return CalendarModel;
});