define(function(require) {
  'use strict';

  var Backbone = require('backbone');
  var TODAY_DATE_FULL = new Date();

  function getCurrentMonthNumber() {
    return TODAY_DATE_FULL.getMonth();
  }

  function getMonthName(monthNumber) {
    var months = [
      'January', 
      'Feburary', 
      'March', 
      'April', 
      'May', 
      'June', 
      'July', 
      'August', 
      'September', 
      'October', 
      'November', 
      'December'
    ];

    return months[ monthNumber ];
  }
  
  function getCurrentYear() {
    return TODAY_DATE_FULL.getFullYear();
  }

  function getTotalDaysInMonth(year, monthNumber) {
    // The month passed in is 1 for January,
    // 2 for February and so on through to 12 for December.
    var actualMonth = monthNumber + 1,

     // day 0 equates to the last day of the previous month
      lastDayOfPrevMonth = 0;

    return new Date(year, actualMonth, lastDayOfPrevMonth).getDate();
  }

  function getFirstDayNameOfMonth(year, monthNumber) {
    var firstDayNum = 1,
      firstDayObj = new Date(year, monthNumber, firstDayNum),
      firstDayPattern = /[A-Za-z]{3}/;

    return firstDayPattern.exec(firstDayObj)[ 0 ];
  }

  var currentMonthNumber = getCurrentMonthNumber(),
    currentMonthName = getMonthName(currentMonthNumber ),
    currentYear = getCurrentYear(),
    // all the days in a month
    totalDaysInCurrentMonth = getTotalDaysInMonth(currentYear, currentMonthNumber),
    firstDayNameInCurrentMonth = getFirstDayNameOfMonth(currentYear, currentMonthNumber),
    todayDateNumber = TODAY_DATE_FULL.getDate();


  var CalendarModel = Backbone.Model.extend({

    // Default attributes for the calendar,
    // starts with current month and year
    defaults: {
      currentMonthName: currentMonthName,
      currentYear: currentYear,
      totalDaysInCurrentMonth: totalDaysInCurrentMonth,
      firstDayNameInCurrentMonth: firstDayNameInCurrentMonth,
      todayDateNumber: todayDateNumber
    },

    getNextMonth: function () {
      // if(currentMonthNumber){

      // }
      // this.set({});
    },

    getPreviousMonth: function () {
      // if(currentMonthName){
        
      // }
      // this.set({});
    }

  });
  return CalendarModel;
});