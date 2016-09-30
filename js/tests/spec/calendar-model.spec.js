define(['../../models/calendar-model'], function ( CalendarModel ) {

  describe("Calendar", function () {
    var calendar,
      TODAY_DATE_FULL = new Date(),
      getCurrentMonthNumber,
      getCurrentYear,
      getTotalDaysInMonth,
      getTodayDateNum,
      getFirstDayNameOfMonth;

    beforeEach(function () {
      calendar = new CalendarModel();

      getCurrentMonthNumber = function () {
        return TODAY_DATE_FULL.getMonth();
      };

      getCurrentYear = function () {
        return TODAY_DATE_FULL.getFullYear();
      }

      getTotalDaysInMonth = function (year, monthNumber) {
        // The month passed in is 1 for January,
        // 2 for February and so on through to 12 for December.
        var actualMonth = monthNumber + 1,

         // day 0 equates to the last day of the previous month
          lastDayOfPrevMonth = 0;

        return new Date(year, actualMonth, lastDayOfPrevMonth).getDate();
      }

      getTodayDateNum = function () {
        return TODAY_DATE_FULL.getDate();
      }

      getFirstDayNameOfMonth = function (year, monthNumber) {
        var firstDayNum = 1,
          firstDayObj = new Date(year, monthNumber, firstDayNum),
          firstDayPattern = /[A-Za-z]{3}/;

        return firstDayPattern.exec(firstDayObj)[ 0 ];
      }

    });

    it('should have current month', function () {
      var months = ['January','Feburary','March', 
        'April','May','June','July', 
        'August','September','October', 
        'November','December'
      ];
      var monthName = calendar.defaults.currentMonthName,
        testMonthNum = getCurrentMonthNumber();

      var testMonthName = months[ testMonthNum ];
      expect( monthName ).toEqual( testMonthName );
    });

    it('should have current year', function () {
      var year = calendar.defaults.currentYear,
        testYear = getCurrentYear();

      expect( year ).toEqual( testYear );
    });

    it('should have total days in month', function () {
      var totalDaysInMonth = calendar.defaults.totalDaysInCurrentMonth,
        testMonthNumber = getCurrentMonthNumber(),
        testYear = getCurrentYear(),
        testTotalDaysInMonth = getTotalDaysInMonth(testYear,testMonthNumber);

      expect( totalDaysInMonth ).toEqual( testTotalDaysInMonth );
    });

    it('should have the date for today', function () {
      var todayDateNumber = calendar.defaults.todayDateNumber,
        testTodayNumber = getTodayDateNum();

      expect( todayDateNumber ).toEqual( testTodayNumber );
    });

    it('should have the name of the first day of the month', function () {
      var firstDayNameInCurrentMonth = calendar.defaults.firstDayNameInCurrentMonth,
        testYear = getCurrentYear(),
        testMonthNumber = getCurrentMonthNumber(),
        testFirstDayNameInMonth = getFirstDayNameOfMonth(testYear,testMonthNumber);

      expect( firstDayNameInCurrentMonth ).toEqual( testFirstDayNameInMonth );
    });

  });
});