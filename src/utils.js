import {
  startOfMonth,
  startOfWeek,
  endOfMonth,
  endOfWeek,
  startOfDay,
  addDays,
} from "date-fns";

function takeWeek(start = new Date()) {
  let date = startOfWeek(startOfDay(start));

  return function () {
    const week = [...Array(7)].map((_, i) => addDays(date, i));
    date = addDays(week[6], 1);
    return week;
  };
}

function takeMonth(start = new Date()) {
  let month: any = [];
  let date = start;

  function lastDayOfRange(range: any) {
    return range[range.length - 1][6];
  }

  return function () {
    const weekGen = takeWeek(startOfMonth(date));

    const endDate = startOfDay(endOfWeek(endOfMonth(date)));
    month.push(weekGen());

    while (lastDayOfRange(month) < endDate) {
      month.push(weekGen());
    }

    const range = month;
    month = [];
    date = addDays(lastDayOfRange(range), 1);

    return range;
  };
}

function oldMonth(date: Date) {
  const month = date.getMonth();
  const year = date.getFullYear();
  const newDate = new Date(year, month - 1, 1);
  return new Date(newDate);
}

function nextMonth(date: Date) {
  const month = date.getMonth();
  const year = date.getFullYear();
  const newDate = new Date(year, month + 1, 1);
  return new Date(newDate);
}

export { takeMonth, takeWeek, oldMonth, nextMonth };
