import React from 'react';
import { compose, withState } from 'recompose';
import { addMonths, startOfMonth } from 'date-fns';
import Calendar, { createCalendar as _createCalendar } from './calendar';
import _Year, { createYear as _createYear } from './year';

const enhance = compose(
  withState(
    'date',
    'setDate',
    ({ value, start }) => +startOfMonth(start || value || new Date())
  )
);

export const createYear = (...args) => enhance(_createYear(...args));
export const Year = enhance(_Year);

export const createCalendar = (...args) => {
  const Cal = _createCalendar(...args);

  return enhance(({ months = 1, date, ...props }) =>
    Array.from(Array(months)).map((x, y) => (
      <Cal key={y} arrows={months <= 1} date={+addMonths(date, y)} {...props} />
    ))
  );
};

export default enhance(({ months = 1, date, ...props }) =>
  Array.from(Array(months)).map((x, y) => (
    <Calendar
      key={y}
      arrows={months <= 1}
      date={+addMonths(date, y)}
      {...props}
    />
  ))
);
