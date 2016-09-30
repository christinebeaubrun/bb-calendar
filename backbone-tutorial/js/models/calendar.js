var createMonth = {

  createMonthYearLabel: function() {
    var me = this;
    // create the label that appears on top of the calendar
    var currentMonth = me.currentMonth; // the index of the current month ex. 0
    var currentMonthName = me.months[currentMonth]; // get the name of current month ex. January
    var monthYear = me.currentMonthYear = currentMonthName + " " + currentYear; // create ex. January 2016

    me.$monthYearSpan.innerHTML = monthYear;
  },

  createDaysInMonth: function() {
    var me = this;

    var currentYear = me.currentYear,
      currentMonth = me.currentMonth,
      currentDateFull = new Date(currentYear, currentMonth);

    var totalDaysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate(); // all days in a month
    var firstDay = new Date(currentYear, currentMonth, 1);
    firstDay = /[A-Za-z]{3}/.exec(firstDay)[0]; // day of the week when the month first begins ex. Tue

    var totalNumOfRows = 6; // using 6 rows to show an entire calendar month
    var dayCounter = 0;
    var daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var setFirstDayOfMonth; // to be set once to true

    for (var i = 0; i < totalNumOfRows; i++) {
      var $row = me.$monthTable.insertRow(i); // creating a row
      daysOfWeek.forEach(function(day, index) { // iterating through the days of the week
        var $cell = $row.insertCell(index); // adding a cell to a row

        if (day === firstDay && !setFirstDayOfMonth) { // if first day of month not set & day equals first day
          // happens once for setting first day of month
          dayCounter++;
          setFirstDayOfMonth = true;
          $cell.innerHTML = dayCounter;

          if (me.currentMonthYear === me.todayMonthYear) {
            if (dayCounter === me.todayDate) {
              $cell.className = 'today'; // in case the first day of the month is today
            }
          }

          return;
        }

        if (dayCounter === 0 || dayCounter === totalDaysInMonth) {
          // creating empty squares with no dates / placeholders
          $cell.innerHTML = "";
          $cell.className = 'nil';
          return; // dayCounter will not be triggered on empty days
        }

        if (dayCounter > 0) {
          dayCounter++;
          $cell.innerHTML = dayCounter;

          if (me.currentMonthYear === me.todayMonthYear) {
            if (dayCounter === me.todayDate) {
              $cell.className = 'today'; // in case the first day of the month is today
            }
          }
        }
      });
    };
  }

};

function createCalendar() {
  var me = this;

  me.prevBtn = document.getElementsByClassName('left button')[0]; // left arrow on calendar
  me.nextBtn = document.getElementsByClassName('right button')[0]; // right arrow on calendar
  me.$monthYearSpan = document.getElementsByClassName('month-year')[0]; // month-year title
  me.$monthTable = document.getElementsByClassName('current')[0]; // table

  me.months = ['January', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  me.todayDateFull = new Date();
  me.currentYear = me.todayDateFull.getFullYear();
  me.currentMonth = me.todayDateFull.getMonth();
  me.todayDate = me.todayDateFull.getDate();
  me.currentMonthName = me.months[me.currentMonth]; // get the name of current month ex. January
  me.todayMonthYear = me.currentMonthName + " " + me.currentYear;

  var createMonthYearLabel = createMonth.createMonthYearLabel,
    createDaysInMonth = createMonth.createDaysInMonth;

  createMonthYearLabel.call(me);
  createDaysInMonth.call(me);

  prevBtn.onclick = function() { // goes back in time
    var me = this;

    me.$monthYearSpan.innerHTML = "";
    me.$monthTable.innerHTML = "";

    if (me.currentMonth === 0) {
      // decrease the year
      me.currentMonth = 11;
      me.currentYear--;
    } else {
      me.currentMonth--;
    }

    createMonthYearLabel.call(me);
    createDaysInMonth.call(me);

  }.bind(me);

  nextBtn.onclick = function() { // goes forward in time
    var me = this;

    me.$monthYearSpan.innerHTML = "";
    me.$monthTable.innerHTML = "";

    if (me.currentMonth === 11) {
      // increase the year
      me.currentMonth = 0;
      me.currentYear++;
    } else {
      me.currentMonth++;
    }

    createMonthYearLabel.call(me);
    createDaysInMonth.call(me);

  }.bind(me);
}

createCalendar();
