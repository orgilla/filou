import React from 'react';
import { compose, withState } from 'recompose';
import { addMonths, startOfMonth } from 'date-fns';
import Calendar, { createCalendar as _createCalendar } from './calendar';

const enhance = compose(
  withState('date', 'setDate', ({ value, start }) => +startOfMonth(start || value || new Date()))
);

export const createCalendar = (...args) => {
  const Cal = _createCalendar(...args);
  return enhance(({ months, date, ...props }) =>
    Array.from(Array(months || 1)).map((x, y) => (
      <Cal
        key={y}
        arrows={months <= 1}
        date={+addMonths(date, y)}
        {...props}
      />
    ))
  );
}

export default enhance(({ months, date, ...props }) =>
  Array.from(Array(months || 1)).map((x, y) => (
    <Calendar
      key={y}
      arrows={months <= 1}
      date={+addMonths(date, y)}
      {...props}
    />
  ))
);
