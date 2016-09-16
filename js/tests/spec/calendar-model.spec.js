define(['../../models/calendar-model'], function ( CalendarModel ) {

  describe("Calendar", function () {
    var calendar;

    beforeEach(function () {
      calendar = new CalendarModel();
    });

    it('should have a name', function () {
      var attr = calendar.attributes;
      expect( attr.monthName ).toEqual('September');
    });
  });
});