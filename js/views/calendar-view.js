define([
  'jquery',
  'underscore',
  'backbone',
  'handlebars',
  'text!templates/header-partial-tpl.html',
  'text!templates/body-partial-tpl.html'
  ], function ($, _, Backbone, Handlebars, headerPartial, bodyPartial) {
  'use strict';

  var CalendarView = Backbone.View.extend({
    tagName: 'div',
    id: 'calendar-view',

    // Cache the template function for a single item.
    calTemplate: headerPartial,

    // The TodoView listens for changes to its model, re-rendering. Since there's
    // a one-to-one correspondence between a **Todo** and a **TodoView** in this
    // app, we set a direct reference on the model for convenience.
    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
    },

    events: {
      'click .right-btn': 'onRightBtnClick',
      'click .left-btn': 'onLeftBtnClick'
    },

    onLeftBtnClick: function (argument) {
      this.model.getPreviousMonth();
      console.log( 'left btn clicked');
    },

    onRightBtnClick: function (argument) {
      this.model.getNextMonth();
      console.log( 'right btn clicked');
    },

    isFirstDayOfMonthSet: false,

    createCalendarTable: function (model) {
      // using 6 rows to show an entire calendar month
      var me = this;

      var rowsInCalendarView = 6,
        daysOfWeek = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],
        dayCounter = 0,
        calDataObj = {tableRows: []};

      for( var index = 0; index < rowsInCalendarView; index++) {
        calDataObj.tableRows[ index ] = [];

        daysOfWeek.forEach(function (day) {
          var cellDay = {},
            firstDayOfMonth = model.attributes.firstDayNameInCurrentMonth,
            totalDaysInCurrentMonth = model.attributes.totalDaysInCurrentMonth,
            todayDateNum = model.attributes.todayDateNumber;

          if ( day === firstDayOfMonth && !me.isFirstDayOfMonthSet) {
            // first day of the month matches day reference in array
            // and isFirstDayOfMonthSet flag is still undefined
            // start dayCounter at 1
            dayCounter++;
            cellDay[ 'dateValue' ] = dayCounter;
            me.isFirstDayOfMonthSet = true;

            if ( dayCounter === todayDateNum ) {
              cellDay.isToday = true;
            }

            calDataObj.tableRows[ index ].push( cellDay );
            return;
          }

          if (dayCounter === 0 || dayCounter === totalDaysInCurrentMonth) {
            // filler cells in table
            cellDay[ 'dateValue' ] = undefined;
            calDataObj.tableRows[ index ].push( cellDay );
            return;
          }

          if (dayCounter > 0) {
            dayCounter++;
            cellDay[ 'dateValue' ] = dayCounter;

            if ( dayCounter === todayDateNum ) {
              cellDay[ 'isToday' ] = true;
            }

            calDataObj.tableRows[ index ].push( cellDay );
            return;
          }
        });
      }

      return calDataObj;
    },
    // Re-render the contents of the todo item.
    render: function() {
      var bodyData = this.createCalendarTable(this.model);
      Handlebars.registerPartial('tableRows', bodyPartial );

      // combine header and body partial
      var tpl = Handlebars.compile(headerPartial);
      this.$el.html( tpl({
        currentMonthName: this.model.attributes.currentMonthName,
        currentYear: this.model.attributes.currentYear,
        tableRows: bodyData.tableRows
      }) );
      return this;
    }
  });

  return CalendarView;
});